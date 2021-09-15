// import Contact from './contact.js';

export default class API {
  constructor(userId) {
    this.userId = userId;
    // Last reponse promise
    this.context = null;
  }

  static async jsonPost(endpoint, req) {
    const url = 'webapp.thegentlemengaming.com/LAMPAPI';
    const reqUrl = `https://${url}/${endpoint}`;
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

    console.log(`Got response: ${response.text()}`);
    return response.json();
  }
    
  static login(username, password) {
    let request = {
      login: username,
      password: password,
    };

    let response = API.jsonPost('login.php', request);
    return new API(response.then((loginData) => loginData.id));
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

    let response = API.jsonPost('newContact.php', request);
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
      UserID: contactId,
      ContactID: await this.userId,
    };

    let response = API.jsonPost('read', request);

    return response.then(
      (data) => {
        if (data.error == '') {
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
          return Promose.resolve(id);
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
          return Promose.resolve(id);
        }
        else {
          return Promise.reject(data.error);
        }
      }
    );
  }

  async search(text) {
    let request = {

    };
    // TODO
    return;
  }
}

