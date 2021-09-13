// import Contact from './contact.js';

export default class API {

  static async jsonPost(endpoint, req) {
    const url = 'webapp.thegentlemengaming.com/LAMPAPI';
    const reqUrl = `https://${url}/${endpoint}`;
    const reqJson = JSON.stringify(req);
    console.log(`Sending request to "${reqUrl}": ${reqJson}`);

    const response = await fetch(reqUrl, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*', // this will allow all CORS requests
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // this states the allowed methods
      },
      body: reqJson,
    });

    // console.log(`Got response: ${response.text()}`);
    // return response.json();
    console.log(response);
    console.log(response.text());
    return response
  }
    
  static async tryNewContact(contact) {
    let request = {
      Fname: contact.firstName,
      Lname: contact.lastName,
      Address: contact.addr1,
      Zip: contact.zip,
      Number: contact.number,
    };

    return API.jsonPost('newContact.php', request);
  }

  static async tryLogin(username, password) {
    let request = {
      login: username,
      password: password,
    };

    return API.jsonPost('login.php', request);
  }
}

