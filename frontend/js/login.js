import API from './api.js';

const URL = "https://webapp.thegentlemengaming.com/LAMPAPI/login.php";

const login_button = document.getElementById("option-button-login");
const signup_button = document.getElementById("option-button-signup");

const login_form  = document.getElementById("login-form")
const signup_form  = document.getElementById("signup-form")

export function showLoginForm() {
	login_button.classList.remove('disabled');
	login_button.className += " active";

	signup_button.className += " disabled";

	login_form.style.display = "block"
	signup_form.style.display = "none"
	signup_form.reset();
}

export function showSignupForm() {
	signup_button.classList.remove('disabled');
	signup_button.className += " active";

	login_button.className += " disabled";

	login_form.style.display = "none"
	login_form.reset();
	signup_form.style.display = "block"
}

export function validateLoginCredentials(creds) {
	return creds.username != "" && creds.password != "";
}

export function tryLogin() {
	const myForm = login_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((value, key) =>  {
		object[key] = value;
	});
	console.log(object);
	API.login(object['username'], object['password'])

	/*
	for (var pair of formData.entries()) {
		console.log(pair);
	}
	*/
	/*
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", URL, true); 
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
	        // Response
			     var response = this.responseText;
				    }
					};
					xhttp.send(JSON.stringify(object));
	fetch(URL, {
		method: "POST",
		body: JSON.stringify(object),
		headers: { 
			"Content-type" : "application/json"
		}
	})
		.then(response => response.json())
		.then(returnData => console.log(returnData))
	*/
}

export function trySignup() {
	const myForm = signup_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((key, value) =>  {
		object[key] = value;
	});
	console.log(object);

	let json =  JSON.stringify(object);
	console.log(json);

	console.log(formData);
	for (var pair of formData.entries()) {
		console.log(pair);
	}

}

// Main
showLoginForm();

