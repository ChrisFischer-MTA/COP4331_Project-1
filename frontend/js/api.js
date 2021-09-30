import Contact from './contact.js';

export default class API {
  constructor(userId) {
    this.userId = userId;
  }

  static async jsonPost(endpoint, req) {
    API.defaultVerify(req);

    console.log('-------- Start API --------')
    const url = 'webapp.thegentlemengaming.com/LAMPAPI';
    const reqUrl = `https://${url}/${endpoint}.php`;
    const reqJson = JSON.stringify(req);
    console.log(`Sending request to "${reqUrl}": ${reqJson}`);
    console.log(`JSON generated from request object:`);
    console.log(req);

    let response = await fetch(reqUrl, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*', // this will allow all CORS requests
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // this states the allowed methods
      },
      body: reqJson,
    });

    console.log('Response:')
    console.log(response);
    let responseTextPromise = response.text().then((string) => string.trim());
    console.log(responseTextPromise);
    console.log('-------- End API --------')
    return responseTextPromise.then((string) => JSON.parse(string));
  }

  static defaultVerify(obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'undefined') {
        throw `Undefined key:value for ${key}`;
      }
    }
  }
    
  static async forgotPassword(username) {
    let request = {
      login: username, 
    };

    let response = API.jsonPost('forgot', request);

    return response.then(
      (data) => {
        if (!data.hasOwnProperty('error')) {
          return Promise.resolve(data.Hint);
        }
        else {
          return Promise.reject('Username not found!');
        }
      }
    )
  }

  static async login(username, password) {
    let request = {
      login: username,
      password: password,
    };

    let response = API.jsonPost('login', request);
    // return new API(response.then((loginData) => loginData.id));
    return response.then(
      (loginData) => {
        if (loginData.error == '') {
          return Promise.resolve(new API(loginData.id));
        }
        else {
          return Promise.reject('Invalid credentials');
        }
      }
    )
  }

  static async register(firstname, lastname, password, login, hint) {
    let request = {
      firstname: firstname,
      lastname: lastname,
      password: password,
      login: login,
      hint: hint
    };

    let response = API.jsonPost('register', request);
    return response.then(
      (data) => {
        if (data.error == '') {
          return Promise.resolve(new API(data.ID));
        }
        else {
          return Promise.reject(data.error);
        }
      }
    )
  }

  async newContact(contact) {
    let request = {
      FirstName: contact.firstName,
      LastName: contact.lastName,
      Street1: contact.addr1,
      Street2: contact.addr1,
      ZipCode: contact.zip,
      State: contact.state,
      City: contact.city,
      PhoneNumber: contact.phoneno,
      DOB: contact.dob,
      Relationship: contact.relation,
      Notes: contact.notes,
      UserID: this.userId, 
    };

    let response = API.jsonPost('newContact', request);
    return response.then(
      (data) => {
        if (!data.hasOwnProperty('error')) {
          return Promise.resolve(data.ID);
        } 
        else {
          return Promise.reject(data.error);
        }
    });
  }

  static async responseHasError(response) {
    return response.then((data) => data.error != '');
  }

  async readContact(contactId) {
    let request = {
      ID: contactId,
      // UserID: this.userId,
    };

    let response = API.jsonPost('read', request);

    return response.then(
      (data) => {
        if (!data.error || data.error == '') {
          return Promise.resolve({
              firstName: data.firstName,
              lastName: data.lastName,
              addr1: data.Street1,
              addr2: data.Street2,
              city: data.City,
              state: data.State,
              zip: data.ZipCode,
              relation: data.Relationship,
              phoneno: data.PhoneNumber,
              notes: data.Notes,
          });
        }
        else {
          return Promise.reject(data.error);
        }
    });
  }

  async updateContact(contact) {
    let request = {
      FirstName: contact.firstName,
      LastName: contact.lastName,
      Street1: contact.addr1,
      Street2: contact.addr2,
      ZipCode: contact.zip,
      State: contact.state,
      City: contact.city,
      PhoneNumber: contact.phoneno,
      DOB: contact.dob,
      Relationship: contact.relation,
      Notes: contact.notes,
      ID: contact.id, 
    };

    let response = API.jsonPost('updateContact', request);

    return response.then(
      (data) => {
        // if (data.error == '') {
        if (data.Status == 'Success') {
          return Promise.resolve(contact.id);
        }
        else {
          return Promise.reject(data.Status);
          // return Promise.reject(data.error);
        }
      }
    );
  }

  async deleteContact(contactIds) {
    let id = this.userId;

    let request = {
      ID: contactIds,
    };

    let response = API.jsonPost('deleteContact', request);

    return response.then(
      (data) => {
        if (!data.hasOwnProperty('error')) {
          return Promise.resolve(id);
        }
        else {
          return Promise.reject(data.error);
        }
      }
    );
  }

  async search(text) {
    let request = {
      sub: text,
      UserID: this.userId,
    };

    let response = API.jsonPost('search', request);

    return response.then(
    (data) => {
      if (!data.hasOwnProperty('error')) {
        let contacts = [];

        for (let i = 0; i < data.numIds; i++) {
          contacts.push(new Contact(data.FirstName[i], data.LastName[i], data.ID[i]));
        }

        return Promise.resolve(contacts);
      }
      else {
        return Promise.reject(data.error);
      }
    });
  }


  async getAll() {
    let request = {
      sub: "",
      UserID: this.userId,
    };

    let response = API.jsonPost('search', request);

    return response.then(
    (data) => {
      if (!data.hasOwnProperty('error')) {
        let contacts = [];
		let contact;

        for (let i = 0; i < data.numIds; i++) {
		  contact = readContact(parseInt(data.ID[i]));
          contacts.push(contact);
        }

        return Promise.resolve(contacts);
      }
      else {
        return Promise.reject(data.error);
      }
    });
  }
}
