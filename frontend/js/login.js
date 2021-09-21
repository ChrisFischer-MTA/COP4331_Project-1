import API from './api.js';


/* Methods */

function showLoginForm() {
	option_login_button.classList.remove('disabled');
	option_login_button.className += " active";

	option_signup_button.className += " disabled";

	login_form.style.display = "block"
	signup_form.style.display = "none"
	signup_form.reset();
}

function showSignupForm() {
	option_signup_button.classList.remove('disabled');
	option_signup_button.className += " active";

	option_login_button.className += " disabled";

	login_form.style.display = "none"
	login_form.reset();
	signup_form.style.display = "block"
}

function validateLoginCredentials(creds) {
	return creds.username != "" && creds.password != "";
}

function tryLogin() {
	alert('hello');
	const myForm = login_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((value, key) =>  {
		object[key] = value;
	});
	console.log(object);
	if (validateLoginCredentials(object)) {
		API.login(object['username'], object['password'])
	}
}

function trySignup() {
	alert('hello from signup');
	const myForm = signup_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((key, value) =>  {
		object[key] = value;
	});

	console.log(object);

	if (validateLoginCredentials(object)) {
		API.Register(object['firstname'], object['lastname'],object['username'], object['password'])
	}
}

/* Main */
const option_login_button = document.getElementById("option-button-login");
const option_signup_button = document.getElementById("option-button-signup");

option_login_button.addEventListener("click", showLoginForm);
option_signup_button.addEventListener("click", showSignupForm);
////////////////////////////////////////////////////////////

const login-button = document.getElementById("login-button");
const signup-button = document.getElementById("signup-button");

login-button.addEventListener("click", tryLogin);
login-button.addEventListener("click", trySignup);

////////////////////////////////////////////////////////////
const login_form  = document.getElementById("login-form");
const signup_form  = document.getElementById("signup-form");

console.log("script loaded");
showLoginForm();

