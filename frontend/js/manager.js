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
        new Contact('Paul', 'Aye'),
        new Contact('Ligma', 'Balls'),
      ],
    };

    store.state[name] = this.state;
  }

  render() {
    let contacts = store.state.manager.elements;
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
        if (!store.state.form.canViewOther()) {
          // TODO: show an alert 
        }
        else {
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
    // console.log(this.element);
    console.log(this.element.querySelector('form'));
    console.log(this.element.querySelector('form').elements);
    this.state.selection.updateFromEntries(this.element.querySelector('form').elements);
  }

  render() {
    let readOnly = (this.isEditable()) ? '' : 'readonly';
    let renderedButtons;
    let doPostRender = [];
    console.log(readOnly);
    let otherAttr = `${readOnly}`;
    let c = store.state.form.selection;

    if (store.state.form.selection == null) {
      this.element.innerHTML = `
        <p>No contact selected</p>
      `;
      return;
    }
    
    if (store.state.form.isEditable()) {
      renderedButtons = `
        <div class="col-6 d-flex justify-content-center py-5">
          <button id="cancel-edit-contact-btn" type="button" 
            class="btn btn-secondary col-6">Cancel</button>
        </div>
        <div class="col-6 d-flex justify-content-center py-5">
          <button id="save-contact-btn" type="button" 
            class="btn btn-primary col-6">Save</button>
        </div>
        <div class="col-6 d-flex justify-content-center py-5">
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
          <input type="text" class="form-control" id="inputAddress" name="addr1" value="${c.addr1}" ${otherAttr}>
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">Address 2</label>
          <input type="text" class="form-control" id="inputAddress2" name="addr2" value="${c.addr2}" ${otherAttr}>
        </div>
        <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" class="form-control" id="inputCity" name="city" value="${c.city}" ${otherAttr}>
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">Zip</label>
          <input type="text" class="form-control" id="inputZip" name="zip" value="${c.zip}" ${otherAttr}>
        </div>
        ${renderedButtons}
      </form>
    `;

    for (let el of this.element.querySelectorAll('input')) {
      console.log(el);
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
    context.commit('updateContactList', {
      select: true,
      contact,
    });

    context.commit('updateContactForm', {
      editable: false,
    });
  },

  editContact(context, _) {
    context.commit('updateContactForm', {
      editable: true,
    });
  },
  
  cancelContactEdit(context, _) {
    context.commit('updateContactForm', {
      editable: false,
    });
  },

  saveContact(context, _) {
    // TODO: send to server and show success or error alert
    context.commit('updateContactForm', {
      editable: false,
      saveContact: true,
    });

  },

  deleteContact(context) {

  }
};

const mutations = {
  updateContactList(state, params) {
    if (params.create) {
      state.manager.elements.unshift(params.contact);
    }

    if (params.select) {
      state.form.selection = params.contact;
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
      console.log('Saving contact...');
      state.form.saveContact();
    }

    if (params.deleteContact) {

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
  console.log('Create contact button was pressed');

  // Only allow creation of a contact if a contact isn't being edited with changes
  if (store.state.form.canViewOther()) {
    console.log('Creating blank contact...');
    store.dispatch('createContact', new Contact('First', 'Last'));
  }
  else {
    console.log('Cannot view other contact with pending changes!');
    // TODO: Display error popup
  }
});

const contactList = new ContactList(store, listElement, 'manager');
const contactForm = new ContactForm(store, formElement, 'form');

contactList.render();
contactForm.render();

console.log(store);
