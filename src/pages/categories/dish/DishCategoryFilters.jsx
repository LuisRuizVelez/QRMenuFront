import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_DISH_CATEGORY} from "../../../store/StorePaths";



const DishCategoryFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_CATEGORY));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [status, setStatus] = useState(filter?.item?.status || null);


    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            code: filter?.item?.code,
        }
    });


    const onSubmit = (data, _) => {
        const filterData = {
            item : {
                ...data,
                status,
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_DISH_CATEGORY, filterData));
    };


    const cleanFields = () => {
        setStatus(null);
        reset({
            code: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Código de la categoría:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("code")}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <label className="form-label">
                            <span>¿La categoría esta activa?</span> <br/>
                            <Switch
                                checked={status}
                                onChange={() => setStatus(!status)}
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

export default DishCategoryFilters