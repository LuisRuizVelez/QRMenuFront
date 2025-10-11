import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, CardTitle, Container} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// components
import ModalContainer from "../../../components/ModalContainer";
import ConfirmDelete from "../../../components/ConfirmDelete";
import LangForm from "./LangForm";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {
    getStateByPath,
    navigationSetFilter,
    navigationSetSelectedItem,
    navigationSetTableParams
} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_LANG} from "../../../connection/apiPaths"
import {STORE_PATHS_LANG} from "../../../store/StorePaths";

// services
import LangFilters from "./LangFilters";



const LangList = () => {
    const componentState = useSelector( state => getStateByPath(state, STORE_PATHS_LANG) )
    const {filter, items, page, sizePerPage, totalSize} = componentState?.data || {};

    const dispatch = useDispatch();
    
    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATHS_LANG, {
            item:{ isActive : true }
        }))
    }, [dispatch,  filter]);


    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATHS_LANG, API_PATH_LANG, page, sizePerPage, filter)
    }, [page, sizePerPage, filter]);


    const handleTableChange = (type, {page, sizePerPage}) => dispatch( navigationSetTableParams(STORE_PATHS_LANG, page, sizePerPage, totalSize) )


    const onCreate = () => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_LANG))
        ModalContainer( LangForm )
    }

    const onEdit = data => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_LANG, data))
        ModalContainer( LangForm,{ data })
    }

    const onDelete = ({id}) => ConfirmDelete({
        id,
        storePath: STORE_PATHS_LANG,
        servicePath: API_PATH_LANG,
        title: `Eliminar Idioma`,
    })


    const columns = [
        {
            dataField: 'id',
            headerStyle: {width: '0px'},
            text: 'ID',
            hidden: true
        },  {
            dataField: 'name',
            text: `Nombre`,
            headerStyle: {width: '200px'},
        }, {
            dataField: 'twoLetterCode',
            text: `Código de 2 letras`,
        },{
            dataField: 'threeLetterCode',
            text: `Código de 3 letras`,
        }, {
            dataField: 'actions',
            isDummyField: true,
            text: `Acciones`,
            headerAlign: 'center',
            align: 'center',
            formatter: (cell, row) => <>
                <button type="button" className="btn btn-primary btn-sm me-1" onClick={ () => onEdit(row) }>edit</button>
                <button type="button" className="btn btn-danger btn-sm me-1" onClick={ () => onDelete(row) }>eliminar</button>
            </>
        }
    ];


    return <Container>
        <Card>
            <CardTitle>
                Lista de Idiomas
                <div className={'float-end'}>
                    <button type="button" className="btn btn-primary" onClick={onCreate}>
                        <i className="bi bi-plus-lg"/> Nuevo
                    </button>
                </div>
            </CardTitle>


            <LangFilters />


            <CardBody>
                <BootstrapTable
                    keyField="id"
                    striped hover
                    remote
                    tableHeaderClass='mb-0'
                    data={items || []}
                    columns={columns}
                    noDataIndication={ "No hay datos para mostrar" }
                    pagination={paginationFactory({page, sizePerPage, totalSize})}
                    onTableChange={handleTableChange}
                />
            </CardBody>
        </Card>
    </Container>
}

export default LangList;