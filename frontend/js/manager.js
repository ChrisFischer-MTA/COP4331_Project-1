import Store from './beedle.js';
import Component from './component.js';
import Contact from './contact.js';
import API from './api.js';
import {createTimedAlert, dismissAllAlerts} from './alert.js';

const timeout = 5000;
const alertPositionElement = parent=document.getElementById('alert-position');
let createErrorAlert = (message) => createTimedAlert('danger', message, timeout, alertPositionElement);
let dismissAlerts = () => dismissAllAlerts(alertPositionElement);

let api = API.login('DeezNuts', 'morenutsplease');
console.log('API:');
console.log(api);

const listElement = document.getElementById('contacts-list');
const formElement = document.getElementById('contacts-form');
const createContactBtnElement = document.getElementById('create-contact-btn');
const searchBtnElement = document.getElementById('search-btn');
const searchInputElement = document.getElementById('search-input');

const disabledEndpoints = [
  // 'readContact',
];

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

let toolbarState = {
  sortFunc: CONTACT_SORT_FUNCS.firstName,
};

let state = {
  // manager: managerState,
  // form: formState, 
  toolbar: toolbarState,
};


class ContactList extends Component {
  constructor(store, element, name) {
    super({store, element});

    this.state = {
      elements: [
        new Contact('Paul', 'Wood', 7),
        new Contact('Ligma', 'Balls', 67),
      ],
      topIsNewContact: false,
      // NOTE: maybe remove these
      prepend: (c) => this.prepend(c),
      append: (c) => this.append(c),
    };

    store.state[name] = this.state;
  }

  prepend(contact) {
    this.state.elements.unshift(contact);
  }

  append(contact) {
    this.state.elements.push(contact);
  }

  render() {
    let contacts = store.state.manager.elements;

    if (contacts.length === 0) {
      this.element.innerHTML = `
        <p>You have no friends.</p>
      `;
      return;
    }

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
        if (!store.state.form.canViewOther()) {
          // TODO: show an alert 
        }
        else {
          if (this.state.topIsNewContact) {
            store.dispatch('deleteContact', {});
          }
          store.dispatch('selectContact', store.state.manager.elements[index]);
        }
      });
    }); 
  }

}


class ContactForm extends Component {
  constructor(store, element, name) {
    super({store, element});

    this.state = {
      status: FORM_STATUS.nosel, 
      selection: null,
      canViewOther: () => this.canViewOther(),
      isEditable: () => this.isEditable(),
      saveContact: () => this.saveContact(),
    };
    
    store.state[name] = this.state;
  }

  // TODO: this is horrible
  canViewOther() {
    let formStatus = this.state.status;
    return formStatus != FORM_STATUS.edit_changes;
  }

  isEditable() {
    let formStatus = this.state.status;
    return formStatus == FORM_STATUS.edit || formStatus == FORM_STATUS.edit_changes;
  }

  hasChanges() {
    // TODO
    return true; 
  }

  // Only locally
  saveContact() {
    this.state.selection.updateFromEntries(this.element.querySelector('form').elements);
  }

  render() {
    let readOnly = (this.isEditable()) ? '' : 'readonly';
    let renderedButtons;
    let doPostRender = [];
    let otherAttr = `${readOnly}`;
    let c = store.state.form.selection;
    // field spacing
    const fs = 'py-3';

    if (store.state.form.selection == null) {
      this.element.innerHTML = `
        <p>No contact selected</p>
      `;
      return;
    }
    
    if (store.state.form.isEditable()) {
      renderedButtons = `
        <div class="col-md-6 d-flex justify-content-center py-5">
          <button id="cancel-edit-contact-btn" type="button" 
            class="btn btn-secondary col-12">Cancel</button>
        </div>
        <div class="col-md-6 d-flex justify-content-center py-5">
          <button id="save-contact-btn" type="button" 
            class="btn btn-primary col-12">Save</button>
        </div>
        <div class="col-md-12 d-flex justify-content-center py-5">
          <button id="delete-contact-btn" type="button" 
            class="btn btn-danger col-6">Delete</button>
        </div>
      `;

      doPostRender.push(
        () => {
          document.getElementById('cancel-edit-contact-btn').addEventListener('click', (_) => {
            store.dispatch('cancelContactEdit', {}); 
          });
        },
        () => {
          document.getElementById('save-contact-btn').addEventListener('click', (_) => {
            store.dispatch('saveContact', {}); 
          });
        },
        () => {
          document.getElementById('delete-contact-btn').addEventListener('click', (_) => {
            store.dispatch('deleteContact', {}); 
          });
        }
      );
    }
    else {
      renderedButtons = `
        <div class="col-12 d-flex justify-content-center py-5">
          <button id="edit-contact-btn" type="button" 
            class="btn btn-primary col-6">Edit</button>
        </div>
      `;

      doPostRender.push(() => {
        document.getElementById('edit-contact-btn').addEventListener('click', (_) => {
          store.dispatch('editContact', {}); 
        });
      });
    }

    // TODO make separate render functions for fields and buttons
    this.element.innerHTML = `
      <form class="d-flex row g-3 px-5 py-4">
        <!-- Column 1 -->
        <div class="col-md-4 ${fs}">
          <label for="contact-first-name" class="form-label">First Name</label>
          <input type="text" class="form-control" id="contact-first-name" value="${c.firstName}" name="firstName" ${otherAttr}>
        </div>
        <div class="col-md-4 ${fs}">
          <label for="contact-last-name" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="contact-last-name" value="${c.lastName}" name="lastName" ${otherAttr}>
        </div>
        <div class="col-md-4 ${fs}">
          <label for="contact-dob" class="form-label">Date of Birth</label>
          <input type="text" class="form-control" id="contact-dob" value="${c.dob}" name="dob" ${otherAttr}>
        </div>

        <!-- Column 2 -->
        <div class="col-12 ${fs}">
          <label for="contact-addr1" class="form-label">Street Address 1</label>
          <input type="text" class="form-control" id="contact-addr1" name="addr1" value="${c.addr1}" ${otherAttr}>
        </div>

        <!-- Column 3 -->
        <div class="col-12 ${fs}">
          <label for="contact-addr2" class="form-label">Street Address 2</label>
          <input type="text" class="form-control" id="contact-addr2" name="addr2" value="${c.addr2}" ${otherAttr}>
        </div>

        <!-- Column 4 -->
        <div class="col-md-4 ${fs}">
          <label for="contact-city" class="form-label">City</label>
          <input type="text" class="form-control" id="contact-city" name="city" value="${c.city}" ${otherAttr}>
        </div>
        <div class="col-md-4 ${fs}">
          <label for="contact-state" class="form-label">State</label>
          <input type="text" class="form-control" id="contact-state" name="state" value="${c.state}" ${otherAttr}>
        </div>
        <div class="col-md-4 ${fs}">
          <label for="contact-zip" class="form-label">Zip Code</label>
          <input type="text" class="form-control" id="contact-zip" name="zip" value="${c.zip}" ${otherAttr}>
        </div>

        <!-- Column 5 -->
        <div class="col-md-4 ${fs}">
          <label for="contact-relationship" class="form-label">Relationship</label>
          <input type="text" class="form-control" id="contact-relationship" name="relation" value="${c.relation}" ${otherAttr}>
        </div>
        <div class="col-md-4 ${fs}">
          <label for="contact-profession" class="form-label">Profession</label>
          <input type="text" class="form-control" id="contact-profession" name="profession" value="${c.profession}" ${otherAttr}>
        </div>
        <div class="col-md-4 ${fs}">
          <label for="contact-phoneno" class="form-label">Phone Number</label>
          <input type="text" class="form-control" id="contact-phoneno" name="phoneno" value="${c.phoneno}" ${otherAttr}>
        </div>

        <!-- Column 6 -->
        <div class="col-md-12 ${fs}">
          <label for="contact-notes" class="form-label">Notes</label>
          <input type="text" class="form-control contact-notes" id="contact-notes" name="notes" value="${c.notes}" ${otherAttr}>
        </div>
        ${renderedButtons}
      </form>
    `;

    for (let el of this.element.querySelectorAll('input')) {
      el.addEventListener('input', () => {
        this.state.status = FORM_STATUS.edit_changes;
      });
    }
    
    for (let f of doPostRender) {
      f();
    }
  }
}

const actions = {
  createContact(context, contact) {
    context.commit('updateContactList', {
      select: true,
      create: true,
      contact,
    });

    context.commit('updateContactForm', {
      editable: true,
    });
  },

  selectContact(context, contact) {
    // TODO(Rick): Read contact
    let response = api.readContact(contact.id);
    if (disabledEndpoints.includes('readContact')) {
      response = Promise.resolve({});
    }
    response.then(
      (newFields) => {
        contact.updateFromObj(newFields);

        context.commit('updateContactList', {
          select: true,
          contact,
        });

        context.commit('updateContactForm', {
          editable: false,
        });
      },

      (error) => {
        console.log(`Error reading contact! ${error}`);
        createErrorAlert(`Error reading contact! ${error}`);
        // TODO: display error alert
      }
    );
  },

  // The following have no other parameters because they use the selected contact (form.selection),
  // or don't need to actually have control over the contact object.
  editContact(context, _) {
    context.commit('updateContactForm', {
      editable: true,
    });
  },
  
  cancelContactEdit(context, _) {
    dismissAlerts();

    context.commit('updateContactForm', {
      editable: false,
    });

    if (context.state.manager.topIsNewContact) {
      context.commit('updateContactList', {
        deleteSelection: true,
      })
    }
  },

  saveContact(context, _) {
    dismissAlerts();

    // This is the Contact object to save or create
    let contact = context.state.form.selection;
    let response;

    // Set error only if there's an error, not the error field in the API response
    if (context.state.manager.topIsNewContact) {
      // TODO(Rick): create new contact 
      context.state.form.saveContact();
      response = api.newContact(contact);
    }
    else {
      // TODO(Rick): update contact
      context.state.form.saveContact();
      response = api.updateContact(contact);
    }

    response.then(
      (userId) => {
        contact.id = userId;
        context.commit('updateContactForm', {
          editable: false,
          saveContact: true,
        });
      }, 
      (error) => {
        console.log(`Error saving contact! ${error}`);
        createErrorAlert(`Error saving contact! ${error}`);
        // TODO: display error alert
      }
    );
  },

  deleteContact(context, _) {
    dismissAlerts();

    let contact = context.state.form.selection;

    // TODO(Rick): delete contact
    let response;

    if (context.state.manager.topIsNewContact) {
      response = Promise.resolve(69);
    }
    else {
      response = api.deleteContact([contact.id]);
    }
    
    response.then(
      (_) => {
        context.commit('updateContactList', {
          deleteSelection: true,
        });
        context.commit('updateContactForm', {
          deleteContact: true,
        });
      }, 
      (error) => {
        console.log(`Error deleting contact! ${error}`);
        createErrorAlert(`Error deleting contact! ${error}`);
        // TODO: display error alert
      }
    );
  },

  search(context, searchText) {
    api.search(searchText).then(
      (results) => context.commit('setListElements', results),
      (error) => {
        createErrorAlert(`Error performing search: ${error}`)
      }
    );
  }
};

// TODO: fix mutations functions - I hate how it's organized
const mutations = {
  setListElements(state, elements) {
    state.manager.elements = elements;

    return state;
  },

  updateContactList(state, params) {
    if (params.create) {
      state.manager.prepend(params.contact);
    }

    if (params.select) {
      state.form.selection = params.contact;
    }

    if (params.deleteSelection) {
      state.manager.topIsNewContact = false;

      let contacts = state.manager.elements;
      let toDeleteId = state.form.selection.id;
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === toDeleteId) {
          // TODO: API endpoint
          let deletedContact = contacts.splice(i, 1);
          console.log(`deleted: ${deletedContact}`);
          break;
        }
      }
    }

    return state;
  },

  updateContactForm(state, params) {
    // TODO: handle different cases
    if (params.editable) {
      state.form.status = FORM_STATUS.edit;
    } 
    else {
      state.form.status = FORM_STATUS.view;
    }

    if (params.saveContact) {
      state.form.saveContact();
      state.manager.topIsNewContact = false;
    }

    if (params.deleteContact) {
      // state.manager.delete(state.form.selection);
      state.form.selection = null;
      state.form.status = FORM_STATUS.nosel;
    }

    return state;
  },

};

let store = new Store({
  actions: actions,
  mutations: mutations,
  initialState: state
});

createContactBtnElement.addEventListener('click', (event) => {
  event.preventDefault();

  let list = store.state.manager;
  let form = store.state.form;
  // Only allow creation of a contact if a contact isn't being edited with changes
  if (!list.topIsNewContact && form.canViewOther()) {
    console.log('Creating blank contact...');
    store.dispatch('createContact', new Contact('First', 'Last'));
    list.topIsNewContact = true; 
  }
  else {
    console.log('Cannot view other contact with pending changes!');
    // TODO: Display error popup
    createErrorAlert('You must save your changes.');
  }
});

searchBtnElement.addEventListener('click', () => {
  store.dispatch('search', searchInputElement.value);
});

searchInputElement.addEventListener('keypress', () => {
  store.dispatch('search', searchInputElement.value);
});

const contactList = new ContactList(store, listElement, 'manager');
const contactForm = new ContactForm(store, formElement, 'form');

contactList.render();
contactForm.render();

