import * as Yup from "yup";
import { useState } from "react";
import {Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";


// components
import CustomSelect from "../../../components/CustomSelect";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_FB_CHILD_PATH, API_PATH_FB_DATA_BASE} from "../../../connection/apiPaths";
import {STORE_PATHS_FB_CHILD_PATH} from "../../../store/StorePaths";


const FBChildPathForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_CHILD_PATH));
    const { selectedItem } = componentState?.data;

    const [fbDatabase, setFbDatabase] = useState(selectedItem?.fbDatabase?.id || null);

    const validationSchema = Yup.object().shape({
        componentName: Yup.string().required( 'Este campo es requerido' ),
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
            componentName: selectedItem?.componentName,
            url: selectedItem?.url,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                fbDatabase: fbDatabase ? { id: fbDatabase.id } : null
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_FB_CHILD_PATH, API_PATH_FB_CHILD_PATH, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_FB_CHILD_PATH, API_PATH_FB_CHILD_PATH, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los Paths de Firebase
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Nombre del Componente:</label>
                        <input
                            className={`form-control ${errors?.componentName ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("componentName")}
                        />
                        {errors?.componentName && <span className="invalid-feedback">{errors?.componentName?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">URL en Firebase:</label>
                        <input
                            className={`form-control ${errors?.url? 'is-invalid' : ''}`}
                            type="text"
                            {...register("url")}
                        />
                        {errors?.url && <span className="invalid-feedback">{errors?.url?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <CustomSelect
                                title="Basde de Datos"
                                initialValue={fbDatabase || null}
                                servicePath={API_PATH_FB_DATA_BASE}
                                onChange={setFbDatabase}
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

export default FBChildPathForm