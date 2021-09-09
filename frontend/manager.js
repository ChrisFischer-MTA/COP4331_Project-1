class Result {
  constructor() {
    this.ok = null;
    this.err = null;
  }

  static Ok(ok=null) {
    let res = new Result();
    res.ok = ok;
    return res;
  }

  static Err(err) {
    let res = new Result();
    res.err = err;
    return res;
  }

  on_err(func) {
    if (this.err != null) 
      return func(this.err);
    else if (this.ok != null)
      return this.ok;
    else
      throw 'Invalid Result object: no ok or err specified!';
  }

  on_ok(func) {
    if (this.ok != null)
      return func(this.ok);
    else if (this.err != null)
      return this.err;
    else
      throw 'Invalid Result object: no ok or err specified!';
  }

  then(ok_func, err_func) {
    if (this.ok == null && this.err == null)
      throw 'Invalid Result object: no ok or err specified!';

    if (this.ok != null)
      ok_func(this.ok);

    if (this.err != null)
      err_func(this.err);
  }
}

class Manager {
  constructor(listId, formId) {
    this.listId = listId;
    this.formId = formId;

    // A dict where: 
    //   key (string): contact html list item ID
    //   value (Contact): the contact object
    this.contacts = {};

    // States:
    //   nosel: when the page is first loaded, there isn't a selected contact to display
    //   view:  a contact is being viewed (readonly)
    //   edit:  a contact is being edited
    this.STATES = {
      NOSEL: 0,
      VIEW: 1,
      EDIT: 2,
    }
    this.state = STATES.NOSEL;
    // this.httpConnection = '';
    
    // The currently selected contact list item ID (string)
    this.selectedId = null;
    this.selectedContact = null;
  }

  viewContact(htmlId) {
    if (state == STATES.EDIT && hasChanges())
      return new Promise((resolve, reject) => {
        resolve(new Result.Err('A contact is already open with unsaved changes!'));
      });

    if (!hasContact(htmlId))
      return new Promise((resolve, reject) => {
        resolve(new Result.Err(`The contact ${html} does not exist!`));
      });

    let contact = this.contacts[htmlId];
    selectedId = htmlId;
    selectedContact = contact;

    makeselectedId();
    setFormData(contact); 
    setFormReadOnly();

    return new Promise((resolve, reject) =>{
      resolve(new Result.Ok(contact));
    });
  }

  editContact() {
    if (state == STATES.EDIT)
      return new Promise((resolve, reject) => {
        resolve(new Result.Err('A contact is already being edited!'));
      });

    // selectedId = null should only happen when the page first loads but just adding
    // for a sanity check.
    if (state == STATES.NOSEL || selectedId == null)
      return new Promise((resolve, reject) => {
        resolve(new Result.Err('A contact is not currently selected!'));
      });

    editForm(); 
     
    return new Promise();
  }

  deleteContact(htmlId) {

    return new Promise();
  }

  addContact() {

    return new Promise();
  }

  hasContact(htmlId) {
    return this.contacts.hasOwnProperty(htmlId);
  }

  search(searchStr) {
    // TODO
  }

  hasChanges() {
    // TODO
    return true; 
  }

  // Up to caller to ensure proper state
  makeSelection() {
    // TODO
  }

  // Up to caller to ensure proper state
  setFormData(contact) {
    // TODO
  }

  // Up to caller to ensure proper state
  setFormReadOnly() {
    // TODO
    state = STATES.VIEW;
  }

  // Up to caller to ensure proper state
  editForm() {
    // TODO
    state = STATES.EDIT;
  }

  saveContact() {
    // TODO
  }
}

class Contact {
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

  static fromForm(id) {
    // TODO
  }
}

const listItemClass = 'list-group-item list-group-item-action';
const contactsList = document.getElementById('contactsList');
console.log(contactsList);

// let entry = document.createElement('li');
// entry.textContent = "Generated Item";
// entry.setAttribute('class', 'list-group-item');
// contactsList.appendChild(entry);

function contactListItemId(contact) {
  // TODO: need to use some sort of unique ID
  return `contact-li-${contact.firstName}${contact.lastName}`;
}

function addContactListItem(contact) {
  let li = document.createElement('li');
  li.textContent = `${contact.firstName} ${contact.lastName}`;
  li.setAttribute('class', listItemClass);
  li.setAttribute('id', contactListItemId(contact));
  contactsList.appendChild(li);
}

function removeContactListItem(contact) {
  let li = document.getElementById(contactListItemId(contact));
  contactsList.removeChild(li);
}

function createContact() {
  console.log('Creating contact');
  const paul = new Contact('Paul', 'Wood');
  const aaron = new Contact('Aaron', 'Wood');
  addContactListItem(paul);
  addContactListItem(aaron);
}

function saveContact() {
  // const form = document.getElementById('contactInfoForm');
  // form.innerHTML = 'Saved';
  // $("#contactInfoForm").load("testForm.html #testForm");
  const form = document.getElementById('contactInfoForm'); 
  // let elements = form.elements;

  // console.log(form);
  // console.log(form.children);
  // console.log(form.elements);
  // console.log(new FormData(form).entries());
  // console.log($(form).serializeArray());
  // for (let i = 0; i < elements.length; i++) {
  //   console.log(elements[i]);
  //   elements[i].readOnly = true;
  // }
  // for (let e of (new FormData(form)).entries()) {
  //   console.log(e);
  // }
  console.log(Object.fromEntries(new FormData(form)));
}


// 
// removeContactListItem(paul);
