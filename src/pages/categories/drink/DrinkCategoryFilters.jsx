import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_DRINK_CATEGORY} from "../../../store/StorePaths";


const DrinkCategoryFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DRINK_CATEGORY));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(filter?.item?.isActive || null);


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
                isActive,
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_DRINK_CATEGORY, filterData));
    };


    const cleanFields = () => {
        setIsActive(null);
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

export default DrinkCategoryFilters