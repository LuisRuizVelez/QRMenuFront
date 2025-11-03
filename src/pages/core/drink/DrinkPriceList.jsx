import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Table, Button } from "reactstrap";


// thunks
import {
    getStateByPath,
    navigationSetFilter,
} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATH_DRINK_PRICE, STORE_PATHS_CORE_DRINK} from "../../../store/StorePaths";
import {API_PATH_DRINK_PRICE} from "../../../connection/apiPaths";

// actions
import ConfirmDelete from "../../../components/ConfirmDelete";
import navigationActions from "../../../store/navigation/navigationActions";

const DrinkPriceList = () => {
    const drinkComponentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DRINK));
    const { selectedItem:drink } = drinkComponentState?.data;

    const componentState = useSelector(state => getStateByPath(state, STORE_PATH_DRINK_PRICE));
    const {filter, items } = componentState?.data || {};

    const dispatch = useDispatch();


    // para realizar la primera carga de datos
    useEffect(() => {
        if(filter)
            return;

        dispatch(navigationSetFilter(STORE_PATH_DRINK_PRICE, {
            item:{ id : drink?.id}
        }))
    }, [dispatch, filter, drink?.id]);

    // para gestionar el cambio de paginación
    useEffect(() => {
        if (!filter)
            return

        navigationActions.search(STORE_PATH_DRINK_PRICE, API_PATH_DRINK_PRICE, 0, 1000, filter)
    }, [filter]);




    const onDelete = ({id}) => ConfirmDelete({
        id,
        title: `Eliminar la asignación de precio`,
        storePath: STORE_PATH_DRINK_PRICE,
        servicePath: API_PATH_DRINK_PRICE,
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

export default DrinkPriceList;