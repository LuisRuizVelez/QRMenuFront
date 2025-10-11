import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";

// components
import CustomSelect from "../../../components/CustomSelect";

// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATHS_FB_DATABASE} from "../../../store/StorePaths";
import {API_PATH_FB_PROJECT} from "../../../connection/apiPaths";


const FBDatabaseFilters =  () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_DATABASE));
    const { filter } = componentState?.data || {};
    const dispatch = useDispatch();

    const [isDefault, setIsDefault] = useState(filter?.item?.isDefault || null);
    const [isProduction, setIsProduction] = useState(filter?.item?.isProduction || null);
    const [project, setProject] = useState(filter?.item?.project || null);


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
                isDefault,
                isProduction,
                project: project?.id ? { id:project?.id } : null
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_FB_DATABASE, filterData));
    };


    const cleanFields = () => {
        setIsDefault(null);
        setIsProduction(null);
        reset({
            name: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Nombre de la base de datos:</label>
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
                            <span>¿Es la base predeterminada?</span> <br/>
                            <Switch
                                checked={isDefault}
                                onChange={() => setIsDefault(!isDefault)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <label className="form-label">
                            <span>¿Es una base de producción?</span> <br/>
                            <Switch
                                checked={isProduction}
                                onChange={() => setIsProduction(!isProduction)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <CustomSelect
                            title="Proyecto de firebase"
                            initialValue={project?.id || null}
                            servicePath={API_PATH_FB_PROJECT}
                            onChange={setProject}
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

export default FBDatabaseFilters