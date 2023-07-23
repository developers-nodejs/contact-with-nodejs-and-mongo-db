//submit button
let submit_button = document.getElementById("submit");

//name
let name_error = document.getElementById("name-error");
//  name_error.style.display = "inline-block";
let name_feild = document.getElementById("name");
//
//email
let email_error = document.getElementById("email-error");
let email_feild = document.getElementById("email");
//phone
let phone_error = document.getElementById("phone-error");
let phone_feild = document.getElementById("phno");
//comment
let comment_error = document.getElementById("comment-error");
let comment_feild = document.getElementById("comment");

//on load
//check all  feilds are empty then disable submit btn
/*
window.onload = function () {
  let inputFeilsArr = document.getElementsByClassName("box");
  let spans = document.getElementsByTagName("span");
  if (
    name_feild.value === "" &&
    email_feild.value === "" &&
    phone_feild.value === "" &&
    comment_feild.value === ""
  ) {
    // set red border AND error message to all input feilds ans spans
    for (let i = 0; i < inputFeilsArr.length; i++) {
    //inputFeilsArr[i].style.border = "thin solid red";
      spans[i].innerText = "* Required!!";
      spans[i].style.display = "inline-block";
      spans[i].style.margin = "0";
    }
    // submit_button.disabled = true;
  }else// check if one of the feild is empty
  if (
    name_feild.value === "" ||
    email_feild.value === "" ||
    phone_feild.value === "" ||
    comment_feild.value === ""
  ) {
    // submit_button.disabled = true;
  }else{
    submit_button.disabled = false;
}

}
*/

//name vaidation
function validate(feild) {
  //check all  feilds are empty then disable submit btn

  // name feild
  if (name_feild.value.length < 6) {
    let errMsg = "Name Must be grater than 5 letters";
    name_error.style.display = "inline-block";
    name_error.innerText = errMsg;
    // submit_button.disabled = true;
    fillBorder("name-feild");
  } else {
    name_error.style.display = "none";
    name_feild.style.border = "none";
  }
}

// email validation function
function validateEmail() {
  var mailformat =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (email_feild.value.match(mailformat)) {
    email_feild.style.border = "none";
    email_error.style.display = "none";
    submit_button.disabled = false;
  } else {
    email_feild.style.border = "thin solid red";
    email_error.style.display = "inline-block";
    email_error.innerText = "Enter Valid Email";
    submit_button.disabled = true;
  }
}

//phone number validation
function validatePhone() {
  const msg = "Phone Must Be Of 10 or 5 digits";
  if (phone_feild.value.length < 10) {
    phone_error.style.display = "inline-block";
    phone_error.innerText = msg;
    phone_feild.style.border = "thin solid red";
   submit_button.disabled = true;
  } else if (phone_feild.value.length === 10) {
    phone_error.style.display = "none";
    phone_feild.style.border = "none";
    submit_button.disabled = false;
    phone_feild.addEventListener("keypress", (e) => {
      e.preventDefault();
    });
  }else{
    submit_button.disabled = false;
  }
}



//fucntion to fill borders
function fillBorder(feild_name) {
  switch (feild_name) {
    case "name-feild":
      name_feild.style.border = "thin solid red";
      break;
    case "email-feild":
      email_feild.style.border = "thin solid red";
      break;
    case "phone-feild":
      phone_feild.style.border = "thin solid red";
      break;
    case "comment-feild":
      comment_feild.style.border = "thin solid red";
  }
}

function allFeildsRequired() {
  let feildsRequired = "Feild Required";
  if (
    email_feild.value === "" ||
    name_feild.value === "" ||
    phone_feild.value === "" ||
    comment_feild.value === ""
  ) {
    fillBorder("email-feild");
    fillBorder("name-feild");
    email_error.innerText = feildsRequired;
    email_error.style.display = "inline-block";
    name_error.innerText = feildsRequired;
    name_error.style.display = "inline-block";
    // submit_button.disabled = true;
  }
}
