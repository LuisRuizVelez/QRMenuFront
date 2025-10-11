import store from "../store";
import {uiSetEditableLangs, uiSetLoading} from './uiThunks';
import {getCustomService} from "../../connection/CreateService";
import {API_PATH_LANG} from "../../connection/apiPaths";



const setEditableLangs = () => {
    const service = getCustomService(API_PATH_LANG)


    store.dispatch( uiSetLoading(true) );

    return service.search(0, 100, {item: {isEnabledToEdit:true}})
        .then(response => {
            store.dispatch( uiSetEditableLangs(response?.data || []) );
            return response?.data || [];
        })
        .catch(error => console.error('Error during search:', error) )
        .finally(() =>  store.dispatch( uiSetLoading(false) ));
}


const uiActions = {
    setEditableLangs
}

export default uiActions;