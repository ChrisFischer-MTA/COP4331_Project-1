// TODO: refactor for lazy loading of contact fields & include ID
let contactId = 0;

export default class Contact {
  constructor(
    firstName, lastName, dob='', addr1='', addr2='', city='', 
    state='', zip='', relation='', profession='', phoneno='', notes=''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.addr1 = addr1;
    this.addr2 = addr2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.relation = relation;
    this.profession = profession;
    this.phoneno = phoneno;
    this.notes = notes;
    this.id = contactId;
    contactId++;
  }

  static fromObj(obj) {
    return new Contact(
      obj.firstName,
      obj.lastName,
      obj.dob,
      obj.addr,
      obj.addr,
      obj.city,
      obj.state, 
      obj.zip, 
      obj.relation,
      obj.profession,
      obj.phoneno,
      obj.notes
    );
  }

  // Assumption: form entry name attributes match contact properties
  updateFromEntries(formEntries) {
    for (let el of formEntries) {
      let key = el.name;
      if (this[key] != null) {
        console.log('   updating');
        this[key] = el.value;
      }
    }
  }
}

