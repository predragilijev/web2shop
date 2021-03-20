function proveriPodatke() {
    let fname = document.getElementById("tbName").value;
    let lname = document.getElementById("tbLName").value;
    let email = document.getElementById("tbEmail").value;
    let message = document.getElementById("taMessage").value;
    let regFname = /^[A-Z][a-z]{2,19}$/;
    let nameFlag = ispravno(fname, regFname, document.getElementById("fnameError"), "First name must start with a capital and must be to 20 characters long.");
    let regLname = /^[A-Z][a-z]{2,19}(\s[A-Z][a-z]{2,19})*$/;
    let lNameFlag = ispravno(lname, regLname, document.getElementById("lnameError"), "Last name must start with a capital and must be to 20 characters long.");
    let regEmail = /^[a-z-0-9]+@[a-z]{3,8}\.[a-z]{2,4}$/;
    let emailFlag = ispravno(email, regEmail, document.getElementById("emailError"), "Email must be in correct format:john.doe@example.com");
    let regMessage = /^[A-Z][\w\s\.\/]{4,200}$/;
    let messageFlag = ispravno(message, regMessage, document.getElementById("messageError"),"Message must start with a capital, and must be between 5 and 200 characters.");
    if (nameFlag && lNameFlag && emailFlag && messageFlag) {
        window.open('mailto:apple@info.com');
    }
}

function ispravno(podatak, regularniIzraz, greskaPolje, greskaTekst) {
    if (!regularniIzraz.test(podatak)) {
        greskaPolje.innerHTML = greskaTekst;
        return false;
    } else {
        greskaPolje.innerHTML = "";
        return true;
    }
}
   