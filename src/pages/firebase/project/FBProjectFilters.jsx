import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATHS_FB_PROJECT} from "../../../store/StorePaths";


const FBProjectFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_PROJECT));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();



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
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_FB_PROJECT, filterData));
    };


    const cleanFields = () => {
        reset({
            name: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col sm={12} md={6}>
                    <FormGroup>
                        <label className="form-label">Nombre del proyecto:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("name")}
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

export default FBProjectFilters