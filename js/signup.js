/* Alert initial questions */

alert("Bem vindo ao PortMar!");

alert("Você acessou a página de cadastro");
let cnfmCnte = confirm("Deseja continuar?");

if (cnfmCnte == true) {
  alert("Você está sendo direcionado para a página de cadastro.");
} else if (cnfmCnte == false) {
  alert("Você selecionou a opção 'NÃO'");
  location.href = "../html/login.html";
} else {
  alert("Você está sendo direcionado para a página de login, aguarde.");
  location.href = "../html/login.html";
}

// COMMANDS FOR VERIFICATION OF CREATE PASSWORD

// Show Password and Hide Password variables
let pswdIns = document.getElementById("pswd");
let buttonEye = document.getElementById("eyeBtn");
let confPswd = document.getElementById("cnfmPswd");
let buttonEye2 = document.getElementById("eyeBtn2");

// Validation Check variables
let upperCase = document.getElementById("upper");
let lowerCase = document.getElementById("lower");
let digit = document.getElementById("number");
let specialChar = document.getElementById("special");
let minLength = document.getElementById("length");

eyeBtn.onclick = function () {
  if (pswdIns.type === "password") {
    pswdIns.setAttribute("type", "text");
    buttonEye.classList.add("hide");
  } else {
    pswdIns.setAttribute("type", "password");
    buttonEye.classList.remove("hide");
  }
};

eyeBtn2.onclick = function () {
  if (confPswd.type === "password") {
    confPswd.setAttribute("type", "text");
    buttonEye2.classList.add("hide");
  } else {
    confPswd.setAttribute("type", "password");
    buttonEye2.classList.remove("hide");
  }
};

// Validation Check

function checkPswd(data) {
  const upper = new RegExp("(?=.*[A-Z])");
  const lower = new RegExp("(?=.*[a-z])");
  const number = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%&*/|])");
  const length = new RegExp("(?=.{8})");

  // LowerCase validation check
  if (lower.test(data)) {
    lowerCase.classList.add("valid");
  } else {
    lowerCase.classList.remove("valid");
  }

  // UpperCase validation check
  if (upper.test(data)) {
    upperCase.classList.add("valid");
  } else {
    upperCase.classList.remove("valid");
  }

  // Number validation check
  if (number.test(data)) {
    digit.classList.add("valid");
  } else {
    digit.classList.remove("valid");
  }

  // Special Characters validation check
  if (special.test(data)) {
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
  }

  // Length validation check
  if (length.test(data)) {
    minLength.classList.add("valid");
  } else {
    minLength.classList.remove("valid");
  }
}

// Verification Password match or not match

function verifyPswd() {
  // Confirm Password variables
  let pswdIns = document.getElementById("pswd").value;
  let confPswd = document.getElementById("cnfmPswd").value;
  let message = document.getElementById("messageText");

  if (pswdIns.length != 6) {
    if (pswdIns == confPswd) {
      message.textContent = "As senhas correspondem com sucesso!";
      message.style.backgroundColor = "#3ae374"; // Green color stylesheet
      message.style.color = "black";
      message.style.fontWeight = "bold";
      message.style.borderRadius = "5px";
    } else {
      message.textContent = "As senhas não coincidem, tente novamente.";
      message.style.backgroundColor = "#ff4d4d"; // Red color stylesheet
      message.style.fontWeight = "bold";
      message.style.borderRadius = "5px";
    }
  } else {
    alert("Campo senha não pode estar vazia, favor crie ou coloque o mesmo.");
  }
}

signUp.addEventListener("click", function () {
  nome = document.getElementById("nome").value;
  sobrenome = document.getElementById("sobrenome").value;
  emlLgn = document.getElementById("email").value;
  confPswd = document.getElementById("cnfmPswd").value;
  create(nome, sobrenome, emlLgn, confPswd);
});

// Register a new users account
function rgsUsrVrfPswd() {
  // Variables declarations firebase
  const auth = firebase.auth();
  const database = firebase.database();
  nome = document.getElementById("nome").value;
  sobrenome = document.getElementById("sobrenome").value;
  emlLgn = document.getElementById("email").value;
  confPswd = document.getElementById("cnfmPswd").value;

  // Validate input fields
  if (vldEml(emlLgn) == false || vldPswd(confPswd) == false) {
    alert("Campo E-mail ou senha está invalido ou não foram preenchidos.");
    return; // Don't continue running code
  }
  if (vldFld(nome) == false || vldFld(sobrenome) == false) {
    alert("Um ou mais campos não estão preenchidos.");
    return; // Don't continue running code
  }

  // Authentication Create
  auth
    .createUserWithEmailAndPassword(emlLgn, confPswd)
    .then(function () {
      // Declare user variable
      let user = auth.currentUser;

      // Add this user to Firebase Database
      let dbRf = database.ref();

      // Create User Data
      let usrDt = {
        nome: nome,
        sobrenome: sobrenome,
        emlLgn: email,
        confPswd: password,
        lastLgn: Date.now()
      };

      dbRf.child("users/" + user.uid).set(usrDt);

      alert("User Created successfully");
    })
    .catch(function (error) {
      // Firebase will use this to alert of it's errors
      let errorCode = error.code;
      let errorMessage = error.message;

      alert(errorMessage);
    });
}

function vldEml(emlVld) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/; // Validate the email address
  if (expression.test(emlVld) == true) {
    return true;
  } else {
    return false;
  }
}

function vldPswd(pswdVld) {
  // Validate password
  if (pswdVld < 6) {
    return false;
  } else {
    return true;
  }
}

function vldFld(fldVld) {
  // Validate the fields
  if (fldVld == null) {
    return false;
  }
  if (fldVld.length < 0) {
    return false;
  } else {
    return true;
  }
}
