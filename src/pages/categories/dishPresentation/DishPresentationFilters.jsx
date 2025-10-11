import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_DISH_PRESENTATION} from "../../../store/StorePaths";


const DishPresentationFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_PRESENTATION));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();


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
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_DISH_PRESENTATION, filterData));
    };


    const cleanFields = () => {
        reset({
            code: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <label className="form-label">Código del tipo de presentación:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("code")}
                        />
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

export default DishPresentationFilters