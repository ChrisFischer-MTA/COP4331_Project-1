import API from './api.js';
import { createErrorAlert, createInfoAlert, dismissAlerts }  from './alert.js';


/* Methods */

function showLoginForm() {
	option_login_button.classList.remove('disabled');
	option_login_button.className += " selected";

	option_signup_button.className += " disabled";

	login_form.style.display = "block"
	signup_form.style.display = "none"
	signup_form.reset();
}

function showSignupForm() {
	option_signup_button.classList.remove('disabled');
	option_signup_button.className += " selected";

	option_login_button.className += " disabled";

	login_form.style.display = "none"
	login_form.reset();
	signup_form.style.display = "block"
}

function validateLoginCredentials(creds) {
	return creds.login != "" && creds.password != "";
}

function passwordsEqual(password, confirmedPassword) {
	//return password == confirmedPassword;
	return true;
}

function tryLogin() {
	const myForm = login_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((value, key) =>  {
		object[key] = value;
	});

	console.log("Login object " + object);

	if (validateLoginCredentials(object)) {
		API.login(object['login'], object['password'])
		.then((res) => {
			console.log(createInfoAlert("Signed in", alertPositionElement, timeout);
			window.location.replace(`https://webapp.thegentlemengaming.com/frontend/manager.html?id=${res.userId}`);
		})
		.catch((err) => {createErrorAlert(err, alertPositionElement, timeout)});
	}
}

function trySignup() {
	const myForm = signup_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((value, key) =>  {
		object[key] = value;
	});

	console.log("Signup object: " + object);

	if (passwordsEqual(object['password'], object['confirmedPassword'])) {
		if (validateLoginCredentials(object)) {
			API.register(object['firstname'], object['lastname'], object['password'], object['login'], object['hint'])
			.then((res) =>{
				console.log(createInfoAlert("Signed in", alertPositionElement, timeout);
				window.location.replace(`https://webapp.thegentlemengaming.com/frontend/manager.html?id=${res.userId}`);
			})
			.catch((err) => {createErrorAlert(err, alertPositionElement, timeout)});
		}
	}
}

/* Main */
const option_login_button = document.getElementById("option-button-login");
const option_signup_button = document.getElementById("option-button-signup");

option_login_button.addEventListener("click", showLoginForm);
option_signup_button.addEventListener("click", showSignupForm);
////////////////////////////////////////////////////////////

const login_button = document.getElementById("login-button");
const signup_button = document.getElementById("signup-button");

login_button.addEventListener("click", tryLogin);
signup_button.addEventListener("click", trySignup);

////////////////////////////////////////////////////////////
const login_form  = document.getElementById("login-form");
const signup_form  = document.getElementById("signup-form");

const timeout = 5000;
const alertPositionElement = parent=document.getElementById('alert-position');

console.log("The script has been loaded.");
showLoginForm();

