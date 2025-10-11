import * as Yup from "yup";
import { useState } from "react";
import {Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// components
import CustomSelect from "../../../components/CustomSelect";

// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_FB_DATA_BASE, API_PATH_FB_PROJECT} from "../../../connection/apiPaths";
import {STORE_PATHS_FB_DATABASE} from "../../../store/StorePaths";


const FBDatabaseForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_DATABASE));
    const { selectedItem } = componentState?.data;

    const [isDefault, setIsDefault] = useState(selectedItem?.isDefault || null);
    const [isProduction, setIsProduction] = useState(selectedItem?.isProduction || null);
    const [project, setProject] = useState(selectedItem?.project || null);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required( 'Este campo es requerido' ),
        url: Yup.string().required( 'Este campo es requerido' ),
    }).required()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: selectedItem?.id,
            name: selectedItem?.name,
            url: selectedItem?.url,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                isDefault,
                isProduction,
                project: project?.id ? { id: project?.id } : null
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_FB_DATABASE, API_PATH_FB_DATA_BASE, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_FB_DATABASE, API_PATH_FB_DATA_BASE, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los langs
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Nombre de la base de datos:</label>
                        <input
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("name")}
                        />
                        {errors?.name && <span className="invalid-feedback">{errors?.name?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">URL de la Base de datos:</label>
                        <input
                            className={`form-control ${errors?.url ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("url")}
                        />
                        {errors?.url && <span className="invalid-feedback">{errors?.url?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <label className="form-label">
                            <span>¿Es base predeterminada?</span>
                            <Switch
                                checked={isDefault}
                                onChange={() => setIsDefault(!isDefault)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
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
            </CardBody>
            <CardFooter>
                <button type="submit" className="btn btn-primary">
                    {selectedItem ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCloseForm}>
                    Cancel
                </button>
            </CardFooter>
        </Card>
    </Form>
}

export default FBDatabaseForm