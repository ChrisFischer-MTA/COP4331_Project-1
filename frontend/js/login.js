const login_button = document.getElementById("option-button-login");
const signup_button = document.getElementById("option-button-signup");

const login_form  = document.getElementById("login-form")
const signup_form  = document.getElementById("signup-form")


function showLoginForm() {
	login_button.classList.remove('disabled');
	login_button.className += " active";

	signup_button.className += " disabled";

	login_form.style.display = "block"
	signup_form.style.display = "none"
	signup_form.reset();
}

function showSignupForm() {
	signup_button.classList.remove('disabled');
	signup_button.className += " active";

	login_button.className += " disabled";

	login_form.style.display = "none"
	login_form.reset();
	signup_form.style.display = "block"
}

function validateLoginCredentials(creds) {
	return creds.username != "" && creds.password != "";
}

function tryLogin() {
	const myForm = login_form;
	const formData = new FormData(myForm);

	let object  = {};
	formData.forEach((value, key) =>  {
		object[key] = value;
	});
	console.log(object);

	/*
	for (var pair of formData.entries()) {
		console.log(pair);
	}
	*/
}

function trySignup() {
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
