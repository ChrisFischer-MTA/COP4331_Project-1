function showLoginForm() {
  const login = document.getElementById("option-button-login");
  document.getElementById("login-section").style.display = "block"
  document.getElementById("signup-section").style.display = "none"
}

function showSignupForm() {
  const login = document.getElementById("option-button-signup");
  document.getElementById("login-section").style.display = "none"
  document.getElementById("signup-section").style.display = "block"
}

function validateLoginCredentials(creds) {
  return creds.username != "" && creds.password != "";
}

