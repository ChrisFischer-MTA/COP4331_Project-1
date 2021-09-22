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
		API.login(object['username'], object['password']).then((res) =>{console.log(res)});
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
		API.register(object['firstname'], object['lastname'],object['username'], object['password']).then((res) =>{console.log("The account was created\n" + res)});
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

console.log("script loaded");
showLoginForm();

