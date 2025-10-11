import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// components
import CustomSelect from "../../../components/CustomSelect";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";


// paths
import {STORE_PATHS_FB_CHILD_PATH} from "../../../store/StorePaths";
import {API_PATH_FB_DATA_BASE} from "../../../connection/apiPaths";



const FBChildPathFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_CHILD_PATH));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [fbDatabase, setFbDatabase] = useState(filter?.item?.fbDatabase || null);


    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            componentName: filter?.item?.componentName,
        }
    });


    const onSubmit = (data, _) => {
        const filterData = {
            item : {
                ...data,
                fbDatabase: fbDatabase ? { id: fbDatabase } : null,
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_FB_CHILD_PATH, filterData));
    };


    const cleanFields = () => {
        setFbDatabase(null);
        reset({
            componentName: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Nombre del Componente:</label>
                        <input
                            className={`form-control`}
                            type="text"
                            {...register("componentName")}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Col>
                        <FormGroup>
                            <CustomSelect
                                title="Base de Datos"
                                initialValue={fbDatabase || null}
                                servicePath={API_PATH_FB_DATA_BASE}
                                onChange={setFbDatabase}
                            />
                        </FormGroup>
                    </Col>
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

export default FBChildPathFilters