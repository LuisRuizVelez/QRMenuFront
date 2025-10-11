import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";



// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// path
import {STORE_PATHS_FB_PROJECT} from "../../../store/StorePaths";
import {API_PATH_FB_PROJECT} from "../../../connection/apiPaths";

const FBProjectService = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_PROJECT));
    const { selectedItem } = componentState?.data;

    const [useRealtime, setUseRealtime] = useState(selectedItem?.useRealtime || false);
    const [useFirestore, setUseFirestore] = useState(selectedItem?.useFirestore || false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required( 'Este campo es requerido' ),
        defaultDb: Yup.string().required( 'Este campo es requerido' ),
        configurationFileName: Yup.string().required( 'Este campo es requerido' ),
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
            defaultDb: selectedItem?.name,
            configurationFileName: selectedItem?.configurationFileName,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                useRealtime,
                useFirestore,
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_FB_PROJECT, API_PATH_FB_PROJECT, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_FB_PROJECT, API_PATH_FB_PROJECT, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de regístro / edición de los proyectos de Firebase
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Nombre del proyecto:</label>
                        <input
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("name")}
                        />
                        {errors?.name && <span className="invalid-feedback">{errors?.name?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Base de datos predeterminada:</label>
                        <input
                            className={`form-control ${errors?.defaultDb ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("defaultDb")}
                        />
                        {errors?.defaultDb && <span className="invalid-feedback">{errors?.defaultDb?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Nombre del archivo de configuración:</label>
                        <input
                            className={`form-control ${errors?.configurationFileName ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("configurationFileName")}
                        />
                        {errors?.configurationFileName && <span className="invalid-feedback">{errors?.configurationFileName?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">
                            <span>¿Usa Base de Datos Realtime?</span>
                            <br />
                            <Switch
                                checked={useRealtime}
                                onChange={() => setUseRealtime(!useRealtime)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                    <Col>
                        <label className="form-label">
                            <span>¿Usa Base de Datos Firestore?</span>
                            <br />
                            <Switch
                                checked={useFirestore}
                                onChange={() => setUseFirestore(!useFirestore)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
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

export default FBProjectService