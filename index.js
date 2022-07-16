// modal 
var login_modal = document.getElementById("login-Modal");
var signup_modal = document.getElementById("signup-Modal");


// link on which modal will be called
var login_link = document.getElementById("login");
var signup_link = document.getElementById("signup");

// close btn
var close_btn = document.getElementsByClassName("close")[0];
var signup_close = document.getElementsByClassName("signup-close")[0];

// js for open login-modal 
login_link.onclick = function () {
    login_modal.style.display = "block";

}
//js for close the login-modal 
close_btn.onclick = function () {
    login_modal.style.display = "none";

}


//js for open signup-modal
signup_link.onclick = function () {
    signup_modal.style.display = "block";

}
//js for close the sign-modal 
signup_close.onclick = function () {
    signup_modal.style.display = "none";

}




/**
 * signUp function  
 */


function signUp() {
    var username = document.getElementById("signup_uname").value;
    var useremail = document.getElementById("signup_email").value;
    var password = document.getElementById("signup_pwd").value;
    
    const user = {
        uname: username,
        uemail: useremail,
        pwd: password
    }
    localStorage.setItem(`${useremail}`, JSON.stringify(user));
    window.location.href = "homepage.html?email=" + useremail;
//    if (pwd_validation() == false){
//        document.getElementById("invalid_signup").innerHTML = " invalid password!";
//        document.getElementById("signup-btn").disabled = true;
//    }
//    else
//    {
//     document.getElementById("signup-btn").disabled = false;
//     localStorage.setItem(`${useremail}`, JSON.stringify(user));
//     window.location.href = "homepage.html?email=" + useremail;
//    }
    
}


/**
 * login function 
 */
function logIn() {
    console.log("login called")
    var useremail = document.getElementById("login_uemail").value;
    var password = document.getElementById("login_pwd").value;
    var array = [];
    var exist_user = 0;
    var keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
        array.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    for (let j = 0; j < array.length; j++) {
        if (useremail == array[j].uemail && password == array[j].pwd) {
            exist_user = 1;
            break;
        }
        else {
            exist_user = 0;
        }
    }
    if (exist_user == 1) {
        window.location.href = "homepage.html?email=" + useremail;
    }
    else {
        document.getElementById("invalid_user").style.visibility = "visible";
    }

}



/**
 * modal hide show
 */

function hide_show() {
    signup_modal.style.display = "block";
}




/**
 * username-validation function
 */
function username_validation() {
    let valid_user = document.getElementById('signup_uname').value;
    if (valid_user.length < 1) {
        console.log(document.getElementById('validate_username'));
        document.getElementById('validate_username').innerHTML = "This field is mandatory"
    }
}


/**
 * email-validation function 
 */
function email_validation() {
    const emailRegx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    let valid_email = document.getElementById('signup_email').value;
    if (valid_email.length == null) {
        document.getElementById('validate_email').innerHTML = "Please fill this feild"
        document.getElementById('validate_email').style.fontSize = "12px";
    }
    if (!valid_email.match(emailRegx)) {
        document.getElementById('validate_email').innerHTML = "In email @ or . is missing please enter email with @."
        document.getElementById('validate_email').style.fontSize = "12px";
    }
    else
        document.getElementById('validate_email').style.visibility = "hidden"
}


/**
 * password validation function
 */
function pwd_validation() {
    let valid_password = document.getElementById('signup_pwd').value;
    if (valid_password.length < 8) {
        document.getElementById('validate_password').innerHTML = "password must be 8 char long"
        document.getElementById('validate_password').style.fontSize = "12px";
        //return false;
    }
    if (valid_password.search(/[a-z]/i) < 0) {
        document.getElementById('validate_password').innerHTML = "password must contain alphabets"
        document.getElementById('validate_password').style.fontSize = "12px";
        //return false;
    }
    if (valid_password.search(/[0-9]/) < 0) {
        document.getElementById('validate_password').innerHTML = "password must contain atleast one digit"
        document.getElementById('validate_password').style.fontSize = "12px";
        //return false;
    }
    else
        document.getElementById('validate_password').style.visibility = "hidden";
        document.getElementById("invalid_signup").innerHTML = "";
        //return true;
}



/**
 * login email validation
 */
function loginemail_validation() {
    const emailRegx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    let loginvalidate_email = document.getElementById('login_uemail').value;
    if(!loginvalidate_email.match(emailRegx)){
      document.getElementById('loginemail_validation').innerHTML = "In email @ or . is missing please enter email with @.";
      document.getElementById('loginemail_validation').style.fontSize = "12px";
    }
    else 
       document.getElementById('loginemail_validation').style.display = "none";

}



