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

const listItemClass = 'list-group-item';
const contactsList = document.getElementById('contactsList');
console.log(contactsList);

// let entry = document.createElement('li');
// entry.textContent = "Generated Item";
// entry.setAttribute('class', 'list-group-item');
// contactsList.appendChild(entry);

function contactListItemId(contact) {
  // TODO: need to use some sort of unique ID
  return `contact-li-${contact.firstName}-${contact.lastName}`;
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
  $("#contactInfoForm").load("testForm.html #testForm");
}

// 
// removeContactListItem(paul);
