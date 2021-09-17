export default class Store {
    constructor(params) {
        const self = this;

        // Add some default objects to hold our actions, mutations and state
        self.actions = {};
        self.mutations = {};
        self.state = params.initialState || {};

        // A status enum to set during actions and mutations
        self.status = 'resting';

        // We store callbacks for when the state changes in here
        self.callbacks = [];

        // Look in the passed params object for actions and mutations
        // that might have been passed in
        if(params.hasOwnProperty('actions')) {
            self.actions = params.actions;
        }

        if(params.hasOwnProperty('mutations')) {
            self.mutations = params.mutations;
        }
    }

    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey, payload) {

        const self = this;

        // Run a quick check to see if the action actually exists
        // before we try to run it
        if(typeof self.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey}" doesn't exist.`);
            return false;
        }

        // Let anything that's watching the status know that we're dispatching an action
        self.status = 'action';

        // Actually call the action and pass it the Store context and whatever payload was passed
        return self.actions[actionKey](self, payload);
    }

    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey, payload) {
        const self = this;

        // Run a quick check to see if this mutation actually exists
        // before trying to run it
        if(typeof self.mutations[mutationKey] !== 'function') {
            console.error(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        // Let anything that's watching the status know that we're mutating state
        self.status = 'mutation';

        // Get a new version of the state by running the mutation and storing the result of it
        let newState = self.mutations[mutationKey](self.state, payload);

        // Update the old state with the new state returned from our mutation
        self.state = newState;
        self.processCallbacks(self.state);
        self.status = 'resting';

        return true;
    }

    /**
     * Fire off each callback that's run whenever the state changes
     * We pass in some data as the one and only parameter.
     * Returns a boolean depending if callbacks were found or not
     *
     * @param {object} data
     * @returns {boolean}
     */
    processCallbacks(data) {
        const self = this;

        if(!self.callbacks.length) {
            return false;
        }

        // We've got callbacks, so loop each one and fire it off
        self.callbacks.forEach(callback => callback(data));

        return true;
    }

    /**
     * Allow an outside entity to subscribe to state changes with a valid callback.
     * Returns boolean based on wether or not the callback was added to the collection
     *
     * @param {function} callback
     * @returns {boolean}
     */
    subscribe(callback) {
        const self = this;

        if(typeof callback !== 'function') {
            console.error('You can only subscribe to Store changes with a valid function');
            return false;
        }

        // A valid function, so it belongs in our collection
        self.callbacks.push(callback);

        return true;
    }
}
