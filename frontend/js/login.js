const login = document.getElementById("option-button-login");
const signup = document.getElementById("option-button-signup");

showLoginForm();

function showLoginForm() {
  login.classList.remove('disabled');
  login.className += " active";

  signup.className += " disabled";

  document.getElementById("login-section").style.display = "block"
  document.getElementById("signup-section").style.display = "none"
}

function showSignupForm() {
  signup.classList.remove('disabled');
  signup.className += " active";

  login.className += " disabled";

  document.getElementById("login-section").style.display = "none"
  document.getElementById("signup-section").style.display = "block"
}

function validateLoginCredentials(creds) {
  return creds.username != "" && creds.password != "";
}

