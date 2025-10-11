import {useState} from "react";
import Switch from "react-switch";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";


// thunks
import {getStateByPath, navigationSetFilter} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATHS_LANG} from "../../../store/StorePaths";

const LangFilters = () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_LANG));
    const { filter } = componentState?.data ||{} ;
    const dispatch = useDispatch();


    const [isActive, setIsActive] = useState(filter?.item?.isActive || true);


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
            }
        };


        dispatch(navigationSetFilter(STORE_PATHS_LANG, filterData));
    };


    const cleanFields = () => {
        setIsActive(null);
        reset({
            name: ''
        });
    }



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <CardBody>
            <Row>
                <Col>
                    <FormGroup>
                        <label className="form-label">Nombre del idioma:</label>
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
                            <span>El Idioma esta Activo:</span> <br/>
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

export default LangFilters