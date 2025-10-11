import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, CardTitle, Container} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// components
import ModalContainer from "../../../components/ModalContainer";
import ConfirmDelete from "../../../components/ConfirmDelete";
import RestaurantForm from "./RestaurantForm";  // form component
import RestaurantFilters from "./RestaurantFilters"; // filter component


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
import {API_PATH_CORE_RESTAURANT} from "../../../connection/apiPaths"
import {STORE_PATHS_CORE_RESTAURANT} from "../../../store/StorePaths";



const RestaurantList = () => {
    const componentState = useSelector( state => getStateByPath(state, STORE_PATHS_CORE_RESTAURANT) )
    const {filter, items, page, sizePerPage, totalSize} = componentState?.data || {};

    const dispatch = useDispatch();

    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATHS_CORE_RESTAURANT, {
            item:{ code : null}
        }))
    }, [dispatch, filter]);


    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATHS_CORE_RESTAURANT, API_PATH_CORE_RESTAURANT, page, sizePerPage, filter)
    }, [page, sizePerPage, filter]);


    const handleTableChange = (type, {page, sizePerPage}) => dispatch( navigationSetTableParams(STORE_PATHS_CORE_RESTAURANT, page, sizePerPage, totalSize) )


    const onCreate = () => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_CORE_RESTAURANT))
        ModalContainer( RestaurantForm )
    }

    const onEdit = data => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_CORE_RESTAURANT, data))
        ModalContainer( RestaurantForm,{ data })
    }

    const onDelete = ({id}) => ConfirmDelete({
        id,
        title: `Eliminar el Restaurante`,
        storePath:STORE_PATHS_CORE_RESTAURANT,
        servicePath: API_PATH_CORE_RESTAURANT,
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
            dataField: 'name',
            text: `Nombre`,
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
                Lista de Restaurantes
                <div className={'float-end'}>
                    <button type="button" className="btn btn-primary" onClick={onCreate}>
                        <i className="bi bi-plus-lg"/> Nuevo
                    </button>
                </div>
            </CardTitle>


            <RestaurantFilters />


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

export default RestaurantList