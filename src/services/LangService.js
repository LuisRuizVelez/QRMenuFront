import {doRequest} from "../connection/api";

const relativePath = 'api/lang';

const search = (offset=0, max = 10, data) => doRequest(`${relativePath}/search?max=${max}&offset=${offset}`, 'POST', { data, showAlert:false })


//save
const save = data  => doRequest(`${relativePath}`, 'POST', { data: data });


//update
const update = (id, data) => doRequest(`${relativePath}/${id}`, 'PUT', { data: data });


//delete
const remove = (id) => doRequest(`${relativePath}/${id}`, 'DELETE',{});

export const langService = {
    search,
    save,
    update,
    remove,
};