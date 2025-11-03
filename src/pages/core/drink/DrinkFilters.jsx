import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_CORE_DRINK} from "../../../store/StorePaths";
import CustomSelect from "../../../components/CustomSelect";
import {API_PATH_CORE_MENU, API_PATH_DRINK_CATEGORY} from "../../../connection/apiPaths";


const DrinkFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DRINK));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [drinkCategory, setDrinkCategory] = useState(filter?.item?.drinkCategory?.id || null)
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
                drinkCategory,
                menu
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_CORE_DRINK, filterData));
    };


    const cleanFields = () => {
        setIsActive(null);
        setDrinkCategory(null)
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
                        initialValue={drinkCategory}
                        servicePath={API_PATH_DRINK_CATEGORY}
                        onChange={ setDrinkCategory }
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
                        <label className="form-label">Nombre de la Bebida:</label>
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
                            <span>¿La bebida está Activa?:</span> <br/>
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

export default DrinkFilters