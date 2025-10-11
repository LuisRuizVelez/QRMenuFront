import {doRequest} from "../../connection/api";

const relativePath = 'api/FBProject';

const search = (offset=0, max=10, data) => doRequest(`${relativePath}/search?max=${max}&offset=${offset}`, 'POST', { data, showAlert:false })


//save
const save = data  => doRequest(`${relativePath}`, 'POST', { data: data });


//update
const update = (id, data) => doRequest(`${relativePath}/${id}`, 'PUT', { data: data });


//delete
const remove = (id, fbDB) => doRequest(`${relativePath}/${id}/${fbDB}`, 'DELETE',{});

const fBProjectService = {
    search,
    save,
    update,
    remove,
};

export default fBProjectService;