import Store from './beedle.js';
import Component from './component.js';
import Contact from './contact.js';

const listElement = document.getElementById('contacts-list');
const formElement = document.getElementById('contacts-form');
const createContactBtnElement = document.getElementById('create-contact-btn');

console.log(listElement);

const FORM_STATUS = {
  nosel: 'nosel',
  view: 'view',
  edit: 'edit',
  edit_changes: 'edit_changes'
};

// TODO: Make compare functions in Contact class instead
const CONTACT_SORT_FUNCS = {
  passthrough: (list) => list,
  firstName: (list) => list.sort((a, b)=> a.firstName.localeCompare(b.firstName)),
  lastName: (list) => list.sort((a, b)=> a.lastName.localeCompare(b.lastName)),
};

let formState = {
  status: FORM_STATUS.nosel, 
  selection: null,
};

let managerState = {
  contacts: [
    new Contact('Paul', 'Aye'),
    new Contact('Ligma', 'Balls'),
  ],
};

let toolbarState = {
  sortFunc: CONTACT_SORT_FUNCS.firstName,
};

let state = {
  manager: managerState,
  form: formState, 
  toolbar: toolbarState,
};


class ContactList extends Component {
  constructor(store, element) {
    console.log('Creating contact list component');
    super({store, element});
  }

  render() {
    let contacts = store.state.manager.contacts;
    console.log('hi');
    console.log(contacts);

    if (contacts.length === 0) {
      this.element.innerHTML = `
        <p>You have no friends.</p>
      `;
      return;
    }

    console.log('rendering list...');
    store.state.toolbar.sortFunc(contacts);
    let selection = store.state.form.selection;

    this.element.innerHTML = `
      <ul id="contactsList" class="list-group list-group-flush border-bottom scrollarea">
        ${contacts.map(contact => {
          let liClass = 'list-group-item list-group-item-action';

          if (selection != null && selection.id == contact.id) {
            liClass += ' active';
          }
          return `
            <li class="${liClass}">${contact.firstName} ${contact.lastName}</li>
          `;
        }).join('')}
      </ul>
    `;

    this.element.querySelectorAll('li').forEach((li, index) => {
      li.addEventListener('click', () => {
        store.dispatch('selectContact', store.state.manager.contacts[index]);
      });
    }); 
  }

}


class ContactForm extends Component {
  constructor(store, element) {
    console.log('Creating contact list component');
    super({store, element});
  }

  // TODO: this is horrible
  static canViewOther() {
    let formStatus = store.state.form.status;
    return formStatus != FORM_STATUS.edit_changes;
  }

  static isEditable() {
    let formStatus = store.state.form.status;
    return formStatus == FORM_STATUS.edit || formStatus == FORM_STATUS.edit_changes;
  }

  render() {
    let readOnly = (ContactForm.isEditable()) ? '' : 'readonly';
    console.log(readOnly);
    let otherAttr = `${readOnly}`;
    let c = store.state.form.selection;

    this.element.innerHTML = `
      <form class="row g-3 px-5 py-4">
        <div class="col-md-6">
          <label for="contact-first-name" class="form-label">First Name</label>
          <input type="text" class="form-control" id="contact-first-name" value="${c.firstName}" name="firstName" ${otherAttr}>
        </div>
        <div class="col-md-6">
          <label for="contact-last-name" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="contact-last-name" value="${c.lastName}" name="lastName" ${otherAttr}>
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">Address</label>
          <input type="text" class="form-control" id="inputAddress" name="address1" value="${c.addr1}" ${otherAttr}>
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">Address 2</label>
          <input type="text" class="form-control" id="inputAddress2" name="address2" value="${c.addr2}" ${otherAttr}>
        </div>
        <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" class="form-control" id="inputCity" name="city" value="${c.city}" ${otherAttr}>
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">Zip</label>
          <input type="text" class="form-control" id="inputZip" name="zip" value="${c.zip}" ${otherAttr}>
        </div>
        <div class="col-12 d-flex justify-content-center py-5">
          <button id="saveContactBtn" type="button" 
            class="btn btn-primary col-6">Edit</button>
        </div>
      </form>
    `;
  }

}

const actions = {
  createContact(context, contact) {
    context.commit('createContactListItem', contact);
    context.commit('makeSelection', contact);
    context.commit('updateContactForm', {
      editable: true,
    });
  },

  selectContact(context, contact) {
    context.commit('makeSelection', contact);
  }
};

const mutations = {
  createContactListItem(state, contact) {
    console.log(contact);
    state.manager.contacts.unshift(contact);

    return state;
  },

  updateContactForm(state, params) {
    if (params.editable) {
      state.form.status = FORM_STATUS.edit;
    } 
    return state;
  },

  makeSelection(state, contact) {
    state.form.selection = contact;

    return state;
  }
};

let store = new Store({
  actions: actions,
  mutations: mutations,
  initialState: state
});

createContactBtnElement.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Create contact button was pressed');

  // Only allow creation of a contact if a contact isn't being edited with changes
  if (ContactForm.canViewOther()) {
    console.log('Creating blank contact...');
    store.dispatch('createContact', new Contact('First', 'Last'));
  }
  else {
    console.log('Cannot view other contact with pending changes!');
    // TODO: Display error popup
  }
});

const contactList = new ContactList(store, listElement);
const contactForm = new ContactForm(store, formElement);

contactList.render();
contactForm.render();

console.log(store);
