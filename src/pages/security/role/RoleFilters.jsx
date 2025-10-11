import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_ROLE} from "../../../store/StorePaths";


const RoleFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_ROLE));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            authority: filter?.item?.authority,
        }
    });


    const onSubmit = (data, _) => {
        const filterData = {
            item : {
                ...data,
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_ROLE, filterData));
    };


    const cleanFields = () => {
        reset({
            authority: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Nombre del Role:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("authority")}
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

export default RoleFilters