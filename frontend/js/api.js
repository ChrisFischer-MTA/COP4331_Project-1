// import Contact from './contact.js';

export default class API {
  constructor(userId) {
    this.userId = userId;
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

    // console.log(`Got response: ${response.text()}`);
    response.json().then(function(json) {return json});
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

    let r = API.jsonPost('newContact.php', request);
    return {
      error: r.error,
      contactId: r.contactId,
    }
  }

  static async login(username, password) {
    let request = {
      login: username,
      password: password,
    };

    let response = API.jsonPost('login.php', request);
    if (this.responseHasError(response)) {
      return null;
    }
    else {
      return new API(reponse.id);
    }

  }

  static responseHasError(response) {
    return response.error != '';
  }

  async readContact(contactId) {
    let request = {
      UserID: contactId,
      ContactID: this.userId,
    };

    let r = API.jsonPost('read', request);

    return {
      error: r.error,
      contactInfo: {
        firstName: r.firstName,
        lastName: r.lastName,
        addr1: r.Street1,
        addr2: r.Street2,
        city: r.City,
        state: r.State,
        zip: r.ZipCode,
        relation: r.Relationship,
        phoneno: r.PhoneNumber,
        notes: r.Notes,
      }
    };
  }

  async updateContact(contact) {
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
      ID: this.userId, 
    };

    let r = API.jsonPost('updateContact', request);

    return {
      error: r.error,
    };
  }

  async deleteContact(contactIds) {
    let request = {
      ContactIds: contactIds,
    };

    let r = API.jsonPost('deleteContact', request);

    return {
      error: r.error,
    };
  }

  async search(text) {
    let request = {

    };
    // TODO
    return;
  }
}

