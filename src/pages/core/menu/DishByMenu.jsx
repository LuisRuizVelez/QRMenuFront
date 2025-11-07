import {useEffect, useRef, useState} from "react";
import {Col, Row} from "reactstrap";


// components
import {InsideLoader} from "../../../ui/Loader";
import CustomSelect from "../../../components/CustomSelect";

// services
import createService from "../../../connection/CreateService";

// paths
import {API_PATH_CORE_DISH, API_PATH_CORE_MENU} from "../../../connection/apiPaths";


const DishByMenu = ({menu}) => {
    const menuService = createService(API_PATH_CORE_MENU);

    const [loading, setLoading] = useState(false)
    const [dishes, setDishes] = useState([])
    const [selectedDish, setSelectedDish] = useState(null)

    const isMounted = useRef(true)


    //Actualizar la referencia
    useEffect(() => {
        if (!menu?.id) return;

        getDishByMenu()

        return () => {
            isMounted.current = false
        }
    }, [menu])


    const getDishByMenu = () => menuService.getDishes(menu.id)
        .then(response => {
            if (!isMounted.current) return;
            setDishes(response)
        })
        .catch(error => console.error("Error fetching dishes by menu:", error))
        .finally(() => {
            if (!isMounted.current) return;
            setLoading(false)
        });

    const addDishByMenu = () => menuService.addDish({
        item:{
            menu: { id: menu.id },
            dish: { id: selectedDish.id }
        }
    })
        .then(response => {
            if (!isMounted.current) return;

            setDishes([...dishes, response])
            setSelectedDish(null)
        })
        .catch(error => console.error("Error adding dish to menu:", error))
        .finally(() => {
            if (!isMounted.current) return;
            setLoading(false)
        });


    const removeDishByMenu = (dishId) => {
        if (!dishId || !menu?.id) return;

        menuService.removeDish({
            item:{
                menu: menu.id,
                dish: dishId
            }
        })
            .then(() => {
                if (!isMounted.current) return;

                setDishes(dishes.filter(dish => dish.id !== dishId))
            })
            .catch(error => console.error("Error removing dish from menu:", error))
            .finally(() => {
                if (!isMounted.current) return;
                setLoading(false)
            });
    }

    if (loading)
        return <InsideLoader title={'Cargando Platillos'}/>

    return <>
        <Row>
            <Col md={9}>
                <CustomSelect
                    title={'Seleccionar Platillo'}
                    initialValue={selectedDish}
                    onChange={setSelectedDish}
                    servicePath={API_PATH_CORE_DISH}
                />
            </Col>
            <Col>
                <br/>
                <button
                    type={'button'}
                    className={'btn btn-primary btn-sm'}
                    onClick={addDishByMenu}
                >
                    Asignar
                </button>
            </Col>
        </Row>
        <br/>
        <br/>
    </>
}


export default DishByMenu