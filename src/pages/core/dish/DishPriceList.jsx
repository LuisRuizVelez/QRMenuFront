import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Table, Button } from "reactstrap";


// thunks
import {
    getStateByPath,
    navigationSetFilter,
} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATHS_DISH_PRICE, STORE_PATHS_CORE_DISH} from "../../../store/StorePaths";
import {API_PATH_DISH_PRICE} from "../../../connection/apiPaths";

// actions
import ConfirmDelete from "../../../components/ConfirmDelete";
import navigationActions from "../../../store/navigation/navigationActions";

const DishPriceList = () => {
    const drinkComponentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DISH));
    const { selectedItem:dish } = drinkComponentState?.data;

    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_PRICE));
    const {filter, items } = componentState?.data || {};

    const dispatch = useDispatch();


    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATHS_DISH_PRICE, {
            item:{ id : dish?.id}
        }))
    }, [dispatch, filter, dish?.id]);

    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATHS_DISH_PRICE, API_PATH_DISH_PRICE, 0, 1000, filter)
    }, [filter]);




    const onDelete = ({id}) => ConfirmDelete({
        id,
        title: `Eliminar la asignación de precio`,
        storePath: STORE_PATHS_DISH_PRICE,
        servicePath: API_PATH_DISH_PRICE,
    })






    return <>
        <h5>Precios Asignados</h5>
        <Table striped>
            <thead>
            <tr>
                <th>Presentación</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {
                (!items || items?.length === 0) && <tr>
                    <td colSpan="3" className="text-center">
                        No hay precios asignados.
                    </td>
                </tr>
            }

            {
                items?.map(price => (
                    <tr key={price?.id}>
                        <td>{price?.presentation?.name}</td>
                        <td>${price?.price?.toFixed(2)}</td>
                        <td>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => onDelete(price)}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    </>
};

export default DishPriceList;