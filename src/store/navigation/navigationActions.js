import store from "../store";

import {
    navigationSetLoading,
    navigationSetItems,
    navigationSetTableParams,
    navigationRemoveItem,
    navigationAddItem,
    navigationUpdateItem,
} from "./navigationThunks";

import {getCustomService} from "../../connection/CreateService";


/**
 * Performs a search operation using the provided service and updates the navigation state in the store.
 *
 * @function
 * @param {string} storePath - The navigation path or key to identify the state slice.
 * @param servicePath
 * @param page
 * @param sizePerPage
 * @param {Object} filterData - The filter criteria to be applied to the search.
 * @param {Function} [callBack=() => {}] - Optional callback to be executed after the search completes.
 * @returns {Promise<Object>} - A promise that resolves to the response from the service.
 *
 * @example
 * search('users', userService, 0, 10, { name: 'John' }, () => { console.log('Search complete'); });
 */
const search =  (storePath, servicePath, page, sizePerPage, filterData, callBack = () => {}) => {

    const offset = (page-1) * sizePerPage;

    const service = getCustomService(servicePath)


    store.dispatch(navigationSetLoading(storePath, true));

    service.search(offset, sizePerPage, filterData)
        .then( response => {
            store.dispatch(navigationSetItems(storePath, response?.data));
            store.dispatch(navigationSetTableParams(storePath, page, sizePerPage, response?.total));
            callBack();
            return response
        })
        .catch( error => console.error('Error during search:', error) )
        .finally(() => store.dispatch(navigationSetLoading(storePath, false)))
};



/**
 * Saves data using the provided service and updates the navigation state in the store.
 *
 * @function
 * @param {string} StorePath - The navigation path or key to identify the state slice.
 * @param servicePath
 * @param {Object} data - The data to be saved.
 * @param {Function} [callBack=() => {}] - Optional callback to be executed after the save completes.
 * @returns {Promise<Object>} - A promise that resolves to the response from the service.
 *
 * @example
 * save('users', userService, { name: 'John' }, () => { console.log('Save complete'); });
 */
const save = (StorePath, servicePath, data, callBack = () => {}) => {
    const service = getCustomService(servicePath)

    store.dispatch(navigationSetLoading(StorePath, true));

    return service.save(data)
        .then( response => {
            store.dispatch(navigationAddItem(StorePath, response));
            callBack();
            return response;
        })
        .catch( error => {
            console.error('Error during save:', error);
            throw error;
        })
        .finally(() => store.dispatch(navigationSetLoading(StorePath, false)));
};




/**
 * Updates an existing item using the provided service and updates the navigation state in the store.
 *
 * @function
 * @param {string} storePath - The navigation path or key to identify the state slice.
 * @param servicePath
 * @param {string|number} id - The unique identifier of the item to update.
 * @param {Object} data - The updated data for the item.
 * @param {Function} [callBack=() => {}] - Optional callback to be executed after the update completes.
 * @returns {Promise<Object>} - A promise that resolves to the response from the service.
 *
 * @example
 * update('users', userService, 1, { name: 'Jane' }, () => { console.log('Update complete'); });
 */
const update = (storePath, servicePath, id, data, callBack = () => {}) => {
    const service = getCustomService(servicePath)

    store.dispatch(navigationSetLoading(storePath, true));

    return service.update(id, data)
        .then( response => {
            store.dispatch(navigationUpdateItem(storePath, response));
            callBack();
            return response;
        })
        .catch( error => {
            console.error('Error during update:', error);
            throw error;
        })
        .finally(() => store.dispatch(navigationSetLoading(storePath, false)));
};






/**
 * Removes an item using the provided service and updates the navigation state in the store.
 *
 * @function
 * @param {string} storePath - The navigation path or key to identify the state slice.
 * @param servicePath
 * @param {string|number} id - The unique identifier of the item to remove.
 * @param {Function} [callBack=() => {}] - Optional callback to be executed after the removal completes.
 * @returns {Promise<void>} - A promise that resolves when the removal operation is complete.
 *
 * @example
 * remove('users', userService, 1, () => { console.log('Remove complete'); });
 */
const remove = (storePath, servicePath, id, callBack = () => {}) => {
    const service = getCustomService(servicePath)

    store.dispatch(navigationSetLoading(storePath, true));

    return service.remove(id)
        .then( response => {
            store.dispatch(navigationRemoveItem(storePath, id));
            callBack();
            return response;
        })
        .catch( error => {
            console.error('Error during delete:', error);
            throw error;
        })
        .finally(() => store.dispatch(navigationSetLoading(storePath, false)));
};



const navigationActions = {
    search,
    save,
    update,
    remove,
}



export default navigationActions;