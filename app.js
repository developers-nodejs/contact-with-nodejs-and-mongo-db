const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const contact = require("./model.js");

require("dotenv").config();

const app = express();
//setting view engine
app.set("view engine", "ejs");
//enable access to static files stored inside public folder
app.use(express.static("public"));
//enabled to get data from user form data
app.use(body_parser.urlencoded({ extended: true }));

//database connectivity
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("DB CONNECTED SUCCESSFULLY");
    }
  }
);

//home route
app.get("/", (req, res) => {
  // Use path.join to construct the absolute file path
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

//signup form
app.post("/contactForm", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phno;
  const comment = req.body.comment;

  //new data obj
  const contactData = new contact({
    name: name,
    email: email,
    phone: phone,
    comment: comment,
  });

  //insert new data and checking for alredy exists by email
  contact.findOne({ email: email }, (err, foundList) => {
    if (!foundList) {
      contactData.save((err) => {
        if (err) {
          console.log("Error while putting new data", +err);
        } else {
          res.json([
            {
              doesExist: false,
            },
          ]);
          console.log("new data saved");
        }
      });
    } else {
      res.json([
        {
          doesExist: true,
        },
      ]);
      console.log("email id [" + email + "] alredy exists");
    }
  });
});

// get list of users from mongodb and sent to client
app.get("/contacts", (req, res) => {
  contact.find({}, (err, contacts) => {
    if (err) {
      console.log("error while getting users");
    } else {
      if (!contacts) {
        console.log("no contact in the DB ");
      } else {
        res.render("contact", { contactList: contacts });
      }
    }
  });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("server is running on port " + port);
});
