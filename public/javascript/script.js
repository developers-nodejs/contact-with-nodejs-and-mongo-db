$(document).ready(function () {
  $("#submit").click(function () {
    //showing the button loader while submitting data
    var element = document.getElementById("loader");
    element.classList.remove("visible");

    const name1 = document.getElementById("name").value;
    const email1 = document.getElementById("email").value;
    const phoneno1 = document.getElementById("phno").value;
    const comment1 = document.getElementById("comment").value;

    if (name1 === "" || email1 === "" || phoneno1 == "" || comment1 == "") {
      alert("All Feilds Are Required");
      element.classList.add("visible");
    } else {
      // making dynamic post request to server to submit data there
      $.post(
        "/contactForm",
        {
          name: name1,
          email: email1,
          phoneno: phoneno1,
          comment: comment1,
        },
        function (data, status) {
          console.log(data);

          if (data[0].doesExist === true) {
            document.getElementById("email").style.border = "thin solid red";
            document.getElementById("email-error").innerText =
              "Email Alredy In Use";
            document.getElementById("email-error").style.display =
              "inline-block";
            //   document.getElementById("email").value = "email Alredy In Use";
            emailAlredyExist();
            element.classList.add("visible");
          } else {
            element.classList.add("visible");
            document.getElementById("email").style.border = "none";
            successToast();

            // clearInputFeilds();
          }
        }
      );
    }
  });
});


function successToast() {
  Toastify({
    text: "Data inserted successfully",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    position: "center",
  }).showToast();
}

// email alredy exists
function emailAlredyExist() {
  document.getElementById("email-error").innerText =
    "Email Alredy In Use, Use another One";
  Toastify({
    text: "Email Alredy In Use, Use another One",
    className: "info",
    style: {
      background: "linear-gradient(to right, tomato, red)",
    },
    position: "center",
  }).showToast();
}
