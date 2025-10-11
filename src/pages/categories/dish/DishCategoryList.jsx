import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, CardTitle, Container} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// components
import ModalContainer from "../../../components/ModalContainer";
import ConfirmDelete from "../../../components/ConfirmDelete";
import DishCategoryForm from "./DishCategoryForm";  // form component
import DishCategoryFilters from "./DishCategoryFilters"; // filter component


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
import {API_PATH_DISH_CATEGORY} from "../../../connection/apiPaths"
import {STORE_PATHS_DISH_CATEGORY} from "../../../store/StorePaths";



const DishCategoryList = () => {
    const componentState = useSelector( state => getStateByPath(state, STORE_PATHS_DISH_CATEGORY) )
    const {filter, items, page, sizePerPage, totalSize} = componentState?.data || {};

    const dispatch = useDispatch();


    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATHS_DISH_CATEGORY, {
            item:{ code : null}
        }))
    }, [dispatch, filter]);


    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATHS_DISH_CATEGORY, API_PATH_DISH_CATEGORY, page, sizePerPage, filter)
    }, [page, sizePerPage, filter]);


    const handleTableChange = (type, {page, sizePerPage}) => dispatch( navigationSetTableParams(STORE_PATHS_DISH_CATEGORY, page, sizePerPage, totalSize) )


    const onCreate = () => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_DISH_CATEGORY))
        ModalContainer( DishCategoryForm )
    }

    const onEdit = data => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_DISH_CATEGORY, data))
        ModalContainer( DishCategoryForm,{ data })
    }

    const onDelete = ({id}) => ConfirmDelete({
        id,
        title: `Elíminar la categoría de platos y bebidas`,
        storePath:STORE_PATHS_DISH_CATEGORY,
        servicePath: API_PATH_DISH_CATEGORY,
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
        },  {
            dataField: 'showOrder',
            text: `Orden de aparición`,
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
                Lista de categorías de platos y bebidas
                <div className={'float-end'}>
                    <button type="button" className="btn btn-primary" onClick={onCreate}>
                        <i className="bi bi-plus-lg"/> Nuevo
                    </button>
                </div>
            </CardTitle>


            <DishCategoryFilters />


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

export default DishCategoryList;