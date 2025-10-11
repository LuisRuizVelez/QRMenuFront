import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_CORE_DISH} from "../../../store/StorePaths";
import CustomSelect from "../../../components/CustomSelect";
import {API_PATH_CORE_MENU, API_PATH_DISH_CATEGORY} from "../../../connection/apiPaths";


const DishFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DISH));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [dishDrinkCategory, setDishDrinkCategory] = useState(filter?.item?.dishDrinkCategory?.id || null)
    const [menu, setMenu] = useState(filter?.item?.menu?.id || null)
    const [isActive, setIsActive] = useState(filter?.item?.isActive || null);


    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            name: filter?.item?.name,
        }
    });


    const onSubmit = (data, _) => {
        const filterData = {
            item : {
                ...data,
                isActive,
                dishDrinkCategory,
                menu
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_CORE_DISH, filterData));
    };


    const cleanFields = () => {
        setIsActive(null);
        setDishDrinkCategory(null)
        setMenu(null)

        reset({
            name: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <CustomSelect
                        title={'Muestra los platillos que tengan la categoría:' }
                        initialValue={dishDrinkCategory}
                        servicePath={API_PATH_DISH_CATEGORY}
                        onChange={ setDishDrinkCategory }
                    />
                </Col>
                <Col>
                    <CustomSelect
                        title={'Muestra los platillos que pertenescan al menu:' }
                        initialValue={menu}
                        servicePath={API_PATH_CORE_MENU}
                        onChange={ setMenu }
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Nombre del platillo:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("name")}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <label className="form-label">
                            <span>¿Platillos Activos?:</span> <br/>
                            <Switch
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <button type="submit" className="btn btn-primary">
                        Búscar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={cleanFields}>
                        Limpiar Filtro
                    </button>
                </Col>
            </Row>
        </CardBody>
    </Form>


}

export default DishFilters