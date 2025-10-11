import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_USER} from "../../../store/StorePaths";


const UserFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_USER));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [enabled, setEnabled] = useState(filter?.item?.enabled || null);


    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            username: filter?.item?.username,
        }
    });


    const onSubmit = (data, _) => {
        const filterData = {
            item : {
                ...data,
                enabled
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_USER, filterData));
    };


    const cleanFields = () => {
        setEnabled(true);
        reset({
            username: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Usuario:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("username")}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <label className="form-label">
                            <span>¿Usuario activo?:</span> <br/>
                            <Switch
                                checked={enabled}
                                onChange={() => setEnabled(!enabled)}
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

export default UserFilters