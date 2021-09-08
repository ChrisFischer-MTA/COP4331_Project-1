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

function tryLogin() {
	const myForm = document.getElementById("login-form");
	const formData = new FormData(myForm);
	//var jsonObj =  JSON.parse(JSON.stringify($('#formId').serializeObject()));

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

function trySignup() {
	const myForm = document.getElementById("signup-form");
	const formData = new FormData(myForm);
	//var jsonObj =  JSON.parse(JSON.stringify($('#formId').serializeObject()));

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

