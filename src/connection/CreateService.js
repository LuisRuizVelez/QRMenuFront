import {doRequest} from "./api";

const createService = path => ({
    search: (offset = 0, max = 10, data) =>
        doRequest(`${path}/search?max=${max}&offset=${offset}`, 'POST', { data, showAlert: false }),

    save: (data) =>
        doRequest(`${path}`, 'POST', { data }),

    update: (id, data) =>
        doRequest(`${path}/${id}`, 'PUT', { data }),

    remove: (id, fbDB) =>
        doRequest(`${path}/${id}/${fbDB}`, 'DELETE', {}),

    getOptions: (data) =>
        doRequest(`${path}/getOptions`, 'POST', { data, showAlert:false }),

    getRoles: (userId) =>
        doRequest(`${path}/getRoles/${userId}`, 'GET', { showAlert: false }),

    addRole: (userId, roleId) =>
        doRequest(`${path}/addRole/${userId}/${roleId}`, 'POST'),

    removeRole: (userId, roleId) =>
        doRequest(`${path}/removeRole/${userId}/${roleId}`, 'DELETE'),

    getSectionsByRole: (roleId) =>
        doRequest(`${path}/getSections/${roleId}`, 'GET', { showAlert: false }),

    addSectionToRole: (roleId, sectionId) =>
        doRequest(`${path}/addRole/${roleId}/${sectionId}`, 'POST'),

    removeSectionFromRole: (userId, roleId) =>
        doRequest(`${path}/removeSection/${userId}/${roleId}`, 'DELETE'),

    getSectionByUser: (username) =>
        doRequest(`${path}/getSectionsByUser/${username}`, 'GET',{showAlert: false}),

});

export const getCustomService = path => {
    if (!path || typeof path !== 'string')
        throw new Error('Invalid path provided for service creation');

    return createService(path);
};
export default createService;


