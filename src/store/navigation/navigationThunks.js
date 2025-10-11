import {
    addState,
    removeState,
    setLoading,
    setItems,
    setSelectedItem,
    setTableParams,
    setFilter,
    addItem,
    removeItem,
    updateItem,
    setLangsEdited,
    updateEditableLangs,
    setLangValidationsErrors
} from "./navigationSlice"



/**
 * Adds a new navigation state to the store for the specified path.
 *
 * @function
 * @param {string} path - The navigation path to add to the state.
 * @returns {Function} - A thunk function that dispatches the `addState` action.
 *
 * @example
 * navigationAddState('dashboard')(dispatch);
 */
export const navigationAddState = path => dispatch => {
    try {
        dispatch(addState({ path }));
    } catch (error) {
        console.error('Error adding navigation:', error);
    }
}




/**
 * Removes a navigation state from the store for the specified path.
 *
 * @function
 * @param {string} path - The navigation path to remove from the state.
 * @returns {Function} - A thunk function that dispatches the `removeState` action.
 *
 * @example
 * navigationRemoveState('dashboard')(dispatch);
 */
export const navigationRemoveState = path => dispatch => {
    try {
        dispatch(removeState({ path }));
    } catch (error) {
        console.error('Error adding navigation:', error);
    }
}



/**
 * Sets the loading state for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the loading state for.
 * @param {boolean} loading - The loading state value to set.
 * @returns {Function} - A thunk function that dispatches the `setLoading` action.
 *
 * @example
 * navigationSetLoading('dashboard', true)(dispatch);
 */
export const navigationSetLoading = (path, loading) => dispatch => {
    try {
        dispatch(setLoading({ path, loading }));
    } catch (error) {
        console.error('Error setting navigation loading:', error);
    }
}



/**
 * Sets the items for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the items for.
 * @param {Array} items - The list of items to set for the specified path.
 * @returns {Function} - A thunk function that dispatches the `setItems` action.
 *
 * @example
 * navigationSetItems('dashboard', [{ id: 1, name: 'Item 1' }])(dispatch);
 */
export const navigationSetItems = (path, items) => dispatch => {
    try {
        dispatch(setItems({ path, items }));
    } catch (error) {
        console.error('Error setting navigation items:', error);
    }
}



/**
 * Sets the selected item for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the selected item for.
 * @param {Object|null} [selectedItem=null] - The selected item to set, or null to clear the selection.
 * @returns {Function} - A thunk function that dispatches the `setSelectedItem` action.
 *
 * @example
 * navigationSetSelectedItem('dashboard', { id: 1, name: 'Item 1' })(dispatch);
 */
export const navigationSetSelectedItem = (path, selectedItem = null) => dispatch => {
    try {
        dispatch(setSelectedItem({ path, selectedItem }));
    } catch (error) {
        console.error('Error setting navigation selected item:', error);
    }
}



/**
 * Sets the table parameters for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the table parameters for.
 * @param {number} pageSize - The number of items per page.
 * @param {number} pageIndex - The current page index.
 * @param {number} totalSize - The total number of items.
 * @param {number} currentPage - The current page number.
 * @returns {Function} - A thunk function that dispatches the `setTableParams` action.
 *
 * @example
 * navigationSetTableParams('dashboard', 10, 0, 100, 1)(dispatch);
 */
export const navigationSetTableParams = (path, page, sizePerPage, totalSize) => dispatch => {
    try {
        dispatch(setTableParams({ path, page, sizePerPage, totalSize }));
    } catch (error) {
        console.error('Error setting navigation table params:', error);
    }
}





/**
 * Sets the filter for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the filter for.
 * @param {Object} filter - The filter object to apply to the specified path.
 * @returns {Function} - A thunk function that dispatches the `setFilter` action.
 *
 * @example
 * navigationSetFilter('dashboard', { search: 'query' })(dispatch);
 */
export const navigationSetFilter = (path, filter) => dispatch => {
    try {
        dispatch(setFilter({ path, filter }));
    } catch (error) {
        console.error('Error setting navigation filter:', error);
    }
}




/**
 * Adds an item to a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to add the item to.
 * @param {Object} item - The item to add to the specified path.
 * @returns {Function} - A thunk function that dispatches the `addItem` action.
 *
 * @example
 * navigationAddItem('dashboard', { id: 1, name: 'New Item' })(dispatch);
 */
export const navigationAddItem = (path, item) => dispatch => {
    try {
        dispatch(addItem({ path, item }));
    } catch (error) {
        console.error('Error adding navigation item:', error);
    }
}





/**
 * Removes an item from a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to remove the item from.
 * @param {string|number} id - The unique identifier of the item to remove.
 * @returns {Function} - A thunk function that dispatches the `removeItem` action.
 *
 * @example
 * navigationRemoveItem('dashboard', 1)(dispatch);
 */
export const navigationRemoveItem = (path, id) => dispatch => {
    try {
        dispatch(removeItem({ path, id }));
    } catch (error) {
        console.error('Error removing navigation item:', error);
    }
}




/**
 * Updates an item in a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path where the item exists.
 * @param {Object} item - The updated item to replace the existing one.
 * @returns {Function} - A thunk function that dispatches the `updateItem` action.
 *
 * @example
 * navigationUpdateItem('dashboard', { id: 1, name: 'Updated Item' })(dispatch);
 */
export const navigationUpdateItem = (path, item) => dispatch => {
    try {
        dispatch(updateItem({ path, item }));
    } catch (error) {
        console.error('Error updating navigation item:', error);
    }
}


/**
 * Sets the edited languages for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the edited languages for.
 * @param {Array} langs - The list of edited languages to set for the specified path.
 * @returns {Function} - A thunk function that dispatches the `setLangsEdited` action.
 *
 * @example
 * navigationSetLangsEdited('dashboard', ['en', 'es'])(dispatch);
 */
export const navigationSetLangsEdited = (path, langs) => dispatch => {
    try {
        dispatch(setLangsEdited({ path, langs }));
    } catch (error) {
        console.error('Error setting navigation updated langs:', error);
    }
}



/**
 * Updates the edited languages for a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to update the edited languages for.
 * @param {Array} langs - The list of languages to update for the specified path.
 * @returns {Function} - A thunk function that dispatches the `updateEditableLangs` action.
 *
 * @example
 * navigationUpdateLangsEdited('dashboard', ['en', 'fr'])(dispatch);
 */
export const navigationUpdateLangsEdited = (path, langs) => dispatch => {
    try {
        dispatch(updateEditableLangs({ path, langs }));
    } catch (error) {
        console.error('Error setting navigation updated langs:', error);
    }
}




/**
 * Sets the validation errors for languages in a specific navigation path in the store.
 *
 * @function
 * @param {string} path - The navigation path to set the validation errors for.
 * @param {Object} errors - The validation errors object to set for the specified path.
 * @returns {Function} - A thunk function that dispatches the `setLangValidationsErrors` action.
 *
 * @example
 * navigationSetLangValidationsErrors('dashboard', { en: 'Error message' })(dispatch);
 */
export const navigationSetLangValidationsErrors = (path, errors) => dispatch => {
    try {
        dispatch(setLangValidationsErrors({ path, errors }));
    } catch (error) {
        console.error('Error setting navigation lang validation errors:', error);
    }
}




/**
 * Retrieves the navigation state for a specific path from the state object.
 *
 * @function
 * @param {Array} [state=[]] - The state array containing navigation states.
 * @param {string} path - The navigation path to find in the state.
 * @returns {Object|undefined} - The navigation state object for the specified path, or undefined if not found.
 *
 * @example
 * const navigationState = getStateByPath(state, 'dashboard');
 */
export const getStateByPath = (state = [], path) => state?.navigation?.find(s => s.path === path);