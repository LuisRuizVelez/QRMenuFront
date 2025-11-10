import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_ROLE} from "../../../store/StorePaths";
import {useState} from "react";
import Switch from "react-switch";


const RoleFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_ROLE));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [isToGrouping, setIsToGrouping] = useState(filter?.isToGrouping || false);

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
                isToGrouping,
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_ROLE, filterData));
    };


    const cleanFields = () => {
        setIsToGrouping(null)
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
                <Col>
                    <FormGroup>
                        <label className="form-label">
                            <span>¿Es un rol agrupador?</span> <br/>
                            <Switch
                                checked={isToGrouping}
                                onChange={() => setIsToGrouping(!isToGrouping)}
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

export default RoleFilters