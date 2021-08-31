function showLoginForm() {
  document.getElementById("login-section").style.display = "block"
  document.getElementById("signup-section").style.display = "none"
}

function showSignupForm() {
  document.getElementById("login-section").style.display = "none"
  document.getElementById("signup-section").style.display = "block"
}

function validateLoginCredentials(creds) {
  return creds.username != "" && creds.password != "";
}

function tryLogin() {
  const form = new FormData(document.getElementById("login-form"));
  const formJson = Object.fromEntries(form.entries());
  console.log("Attempting login: " + JSON.stringify(formJson, null, 2));

  if (validateLoginCredentials(formJson)) {
    console.log("Logging in...");
    // TODO: Do login
  }
  else
    console.log("Failed to login!");
}

function validateSignupCredentials(creds) {
  return creds.username != "" && creds.password != "" && creds.password == creds.confirmedPassword;
}

function trySignup() {
  const form = new FormData(document.getElementById("signup-form"));
  const formJson = Object.fromEntries(form.entries());
  console.log("Attempting signup: " + JSON.stringify(formJson, null, 2));

  if (validateSignupCredentials(formJson)) {
    console.log("Signing up...");
    // TODO: Do signup
  }
  else
    console.log("Failed to signup!");
}

