window.onload = function() {
    document.getElementById("btnSend").addEventListener("click", checkData);
}

function checkData() {
    let fname = document.getElementById("first_name").value;
    let lname = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let regFname = /^[A-Z][a-z]{2,19}$/;
    check(fname, regFname, document.getElementById("fnameError"), "First name must start with a capital and must be to 20 characters long.");
    
    let regLname = /^[A-Z][a-z]{2,19}(\s[A-Z][a-z]{2,19})*$/;
    check(lname, regLname, document.getElementById("lnameError"), "Last name must start with a capital and must be to 20 characters long.");
    
    let regEmail = /^[a-z-0-9]+@[a-z]{3,8}\.[a-z]{2,4}$/;
    check(email, regEmail, document.getElementById("emailError"), "Email must be in correct format: john.doe @example.com ");
    
    let regMessage = /^[A-Z][\w\s\.\/]{4,100}$/;
    check(message, regMessage, document.getElementById("messageError"),"Message must start with a capital, and must be between 5 and 100 characters.");
}

function check(data, regExp, errorPlace, errorText) {
    if (!regExp.test(data)) {
        errorPlace.innerHTML = errorText;
        errorPlace.classList.add("text-danger");
        return false;
    } else {
        $("#confirmation").html("<p class='alert alert-success text-center'>You have successfully sent a message!</p>");
        errorPlace.innerHTML = "";
        setItem('nameForm', data);
        return true;
    }
}