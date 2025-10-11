import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Alert, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

// components
import {InsideLoader} from "../ui/Loader";

// actions
import uiActions from "../store/ui/uiActions";
import {
    getStateByPath,
    navigationSetLangsEdited,
} from "../store/navigation/navigationThunks";

const EditableLangs = ({
       children,
       storagePath,
       defaultValues,
}) => {
    const { data:{ selectedItem, langsEdited } } = useSelector(state => getStateByPath(state, storagePath));
    const { editableLangs = [], loading } = useSelector(state => state.ui);
    
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(0)
    const [activeLang, setActiveLang] = useState(editableLangs[0] || {});


    // Ensure editable languages are set when component mounts
    useEffect(() => {
        if(editableLangs.length > 0)
            return

        uiActions.setEditableLangs()
    }, [editableLangs]);
    





    // Set initial values for editable languages when component mounts
    useEffect(() => {
        setInitialValues()
    }, []);




    // Set initial values for editable languages
    const setInitialValues = () => {
        let initialValues = []


        // if there are selected item to edit, we will use its langs
        if(selectedItem != null) {
            initialValues = editableLangs.map(lang => {
                const langIndex = selectedItem?.langs.findIndex(item => item.lang.id === lang.id);


                // if the lang exists in selected item, we will use its values
                if(langIndex !== -1)
                    return {
                        ...selectedItem.langs[langIndex]
                    }


                // if the lang does not exist in selected item, we will use default values
                return {
                    lang: { id: lang.id,twoLetterCode: lang.twoLetterCode },
                    ...defaultValues
                }
            })

            dispatch(navigationSetLangsEdited(storagePath, initialValues));

            return
        }


        // if there are no selected item, we will use default values
        initialValues = editableLangs.map(lang => ({
            lang: { id: lang.id, twoLetterCode: lang.twoLetterCode },
            ...defaultValues
        }))


        dispatch(navigationSetLangsEdited(storagePath, initialValues));
    }



    const onInputChange = e => {
        const newLangs = langsEdited.slice();
        const langIndex = newLangs.findIndex(item => item?.lang?.id === activeLang?.id);

        if(langIndex < 0)
            return;

        const newLang = { lang:{ id:activeLang?.id }, [e.target.name]: e.target.value };

        newLangs[langIndex] = { ...newLangs[langIndex], ...newLang };

        dispatch(navigationSetLangsEdited(storagePath, newLangs));
    }




    const onChangeTab = tab => {
        setActiveTab(tab);
        setActiveLang(editableLangs[tab] || {});
    }


    if(editableLangs.length === 0)
        return <Alert color="warning" className="text-center">
            No hay idiomas editables disponibles. Por favor, asegúrate de que los idiomas estén configurados correctamente.
        </Alert>;



    return <div className="mt-4">
        {  loading && <InsideLoader title="Cargando idiomas editables..." />  }

        <Nav tabs>
            {
                editableLangs.map((lang, index) => (
                    <NavItem key={`nav_item_${index}`}>
                        <NavLink
                            className={activeTab === index ? 'active' : ''}
                            onClick={() => onChangeTab(index)}
                        >
                            { lang?.name }
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
        <TabContent activeTab={activeTab} className={"mt-3"}>
            {
                editableLangs.map((lang, index) => {
                    const childrenLang = langsEdited.find(l => l?.lang?.id === lang?.id) || null;

                    return <TabPane tabId={index} key={`tab_pane_${index}`}>
                        {
                            !children
                                ? <Alert color="warning" className="text-center"> No hay contenido para el idioma {lang?.name}. </Alert>
                                : children(index, childrenLang, onInputChange)
                        }
                    </TabPane>
                })
            }
        </TabContent>

    </div>
}

export default EditableLangs;