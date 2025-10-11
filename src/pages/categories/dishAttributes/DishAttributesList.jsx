import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, CardTitle, Container} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// components
import ModalContainer from "../../../components/ModalContainer";
import ConfirmDelete from "../../../components/ConfirmDelete";
import DishAttributesForm from "./DishAttributesForm";  // form component
import DishAttributesFilters from "./DishAttributesFilters"; // filter component


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
import {API_PATH_DISH_ATTRIBUTES} from "../../../connection/apiPaths"
import {STORE_PATHS_DISH_ATTRIBUTES} from "../../../store/StorePaths";


const DishAttributesList = () => {
    const componentState = useSelector( state => getStateByPath(state, STORE_PATHS_DISH_ATTRIBUTES) )
    const {filter, items, page, sizePerPage, totalSize} = componentState?.data || {};

    const dispatch = useDispatch();

    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATHS_DISH_ATTRIBUTES, {
            item:{ code : null}
        }))
    }, [dispatch, filter]);


    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATHS_DISH_ATTRIBUTES, API_PATH_DISH_ATTRIBUTES, page, sizePerPage, filter)
    }, [page, sizePerPage, filter]);


    const handleTableChange = (type, {page, sizePerPage}) => dispatch( navigationSetTableParams(STORE_PATHS_DISH_ATTRIBUTES, page, sizePerPage, totalSize) )


    const onCreate = () => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_DISH_ATTRIBUTES))
        ModalContainer( DishAttributesForm )
    }

    const onEdit = data => {
        dispatch(navigationSetSelectedItem(STORE_PATHS_DISH_ATTRIBUTES, data))
        ModalContainer( DishAttributesForm,{ data })
    }

    const onDelete = ({id}) => ConfirmDelete({
        id,
        title: `Eliminar Atributo de Plato o Bebida`,
        storePath:STORE_PATHS_DISH_ATTRIBUTES,
        servicePath: API_PATH_DISH_ATTRIBUTES,
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
                Atributos de los Platos o Bebidas
                <div className={'float-end'}>
                    <button type="button" className="btn btn-primary" onClick={onCreate}>
                        <i className="bi bi-plus-lg"/> Nuevo
                    </button>
                </div>
            </CardTitle>


            <DishAttributesFilters />


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

export default DishAttributesList