import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, CardTitle, Container} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// components
import ModalContainer from "../../../components/ModalContainer";
import ConfirmDelete from "../../../components/ConfirmDelete";
import MenuCategoryForm from "./MenuCategoryForm";  // form component
import MenuCategoryFilters from "./MenuCategoryFilters"; // filter component


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
import {API_PATH_MENU_CATEGORY} from "../../../connection/apiPaths"
import {STORE_PATHS_MENU_CATEGORY} from "../../../store/StorePaths";



const MenuCategoryList = () => {
    const componentState = useSelector( state => getStateByPath(state, STORE_PATHS_MENU_CATEGORY) )
    const {filter, items, page, sizePerPage, totalSize} = componentState?.data || {};

    const dispatch = useDispatch();

    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATHS_MENU_CATEGORY, {
            item:{ code : null}
        }))
    }, [dispatch, filter]);


    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATHS_MENU_CATEGORY, API_PATH_MENU_CATEGORY, page, sizePerPage, filter)
    }, [page, sizePerPage, filter]);


    const handleTableChange = (type, {page, sizePerPage}) => dispatch( navigationSetTableParams(STORE_PATHS_MENU_CATEGORY, page, sizePerPage, totalSize) )


    const onCreate = () => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_MENU_CATEGORY))
        ModalContainer( MenuCategoryForm )
    }

    const onEdit = data => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_MENU_CATEGORY, data))
        ModalContainer( MenuCategoryForm,{ data })
    }

    const onDelete = ({id}) => ConfirmDelete({
        id,
        title: `Eliminar la categoría de menú`,
        storePath:STORE_PATHS_MENU_CATEGORY,
        servicePath: API_PATH_MENU_CATEGORY,
    })


    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },  {
            dataField: 'code',
            text: `Código`,
        },  {
            dataField: 'title',
            text: `Título`,
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
                Lista de las categorías de menú
                <div className={'float-end'}>
                    <button type="button" className="btn btn-primary" onClick={onCreate}>
                        <i className="bi bi-plus-lg"/> Nuevo
                    </button>
                </div>
            </CardTitle>


            <MenuCategoryFilters />


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

export default MenuCategoryList;