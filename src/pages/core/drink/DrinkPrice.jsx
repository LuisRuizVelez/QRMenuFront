import {useEffect} from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import {useDispatch} from "react-redux";

// components
import DrinkPriceList from "./DrinkPriceList";
import DrinkPriceForm from "./DrinkPriceForm";

// thunks
import {navigationAddState, navigationRemoveState} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATH_DRINK_PRICE} from "../../../store/StorePaths";

const DrinkPrice = ({title}) => {
    const dispatch = useDispatch();


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATH_DRINK_PRICE) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATH_DRINK_PRICE) );
        };
    }, [dispatch]);


    return (
        <Card>
            <CardTitle>Gestión de Precios de la Bebida: {title}</CardTitle>
            <CardBody>
                <DrinkPriceForm />
                <hr />
                <DrinkPriceList />
            </CardBody>
        </Card>
    );
};

export default DrinkPrice;