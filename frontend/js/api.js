// import Contact from './contact.js';

export default class API {
  constructor(userId) {
    this.userId = userId;
    this.nopEndpoints = [
      'readContact',
    ];
  }

  static async jsonPost(endpoint, req) {
    const url = 'webapp.thegentlemengaming.com/LAMPAPI';
    const reqUrl = `https://${url}/${endpoint}.php`;
    const reqJson = JSON.stringify(req);
    console.log(`Sending request to "${reqUrl}": ${reqJson}`);

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

    console.log(response);
    let responseTextPromise = response.text().then((string) => string.trim());
    console.log(responseTextPromise);
    return responseTextPromise.then((string) => JSON.parse(string));
  }
    
  static login(username, password) {
    let request = {
      login: username,
      password: password,
    };

    let response = API.jsonPost('login', request);
    return new API(response.then((loginData) => loginData.id));
  }

  async register(firstname, lastname, password, login) {
    let request = {
      firstname: firstname,
      lastname: lastname,
      password: password,
      login: login,
    };

    let response = API.jsonPost('register', request);
    return response.then(
      (data) => {
        if (data.error == '') {
          return Promise.resolve();
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
      UserID: await this.userId, 
    };

    let response = API.jsonPost('newContact', request);
    return response.then(
      (data) => {
        if (data.error == '') {
          return Promise.resolve(data.contactId);
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
      // UserID: await this.userId,
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
    let id = await this.userId;
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
      ID: id, 
    };

    let response = API.jsonPost('updateContact', request);

    return response.then(
      (data) => {
        if (data.error == '') {
          return Promise.resolve(id);
        }
        else {
          return Promise.reject(data.error);
        }
      }
    );
  }

  async deleteContact(contactIds) {
    let id = await this.userId;

    let request = {
      ContactIds: contactIds,
    };

    let response = API.jsonPost('deleteContact', request);

    return response.then(
      (data) => {
        if (data.error == '') {
          return Promise.resolve(id);
        }
        else {
          return Promise.reject(data.error);
        }
      }
    );
  }

  async search(text) {
    let id = await this.id;

    let request = {
      Search: text,
      UserID: id,
    };

    let response = API.jsonPost('search', request);

    return response.then(
    (data) => {
      if (data.error == '') {
        let contacts = [];

        for (let result of data.searchResults) {
          contacts = new Contact(result.firstName, result.lastName, id=result.id);
        }

        return Promise.resolve(contacts);
      }
      else {
        return Promise.reject(data.error);
      }
    });
  }
}

