import * as Yup from "yup";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";



// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_SECTION} from "../../../connection/apiPaths";
import {STORE_PATHS_SECTION} from "../../../store/StorePaths";

const SectionForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_SECTION));
    const { selectedItem } = componentState?.data;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required( 'Este campo es requerido' ),
        code: Yup.string().required( 'Este campo es requerido' ),
    }).required()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: selectedItem?.id,
            code: selectedItem?.code,
            name: selectedItem?.name,
            image: selectedItem?.image,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_SECTION, API_PATH_SECTION, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_SECTION, API_PATH_SECTION, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de las Secciones
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Código:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Nombre del idioma:</label>
                        <input
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("name")}
                        />
                        {errors?.name && <span className="invalid-feedback">{errors?.name?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Nombre de la imagen:</label>
                        <input
                            className={`form-control ${errors?.image ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("image")}
                        />
                        {errors?.image && <span className="invalid-feedback">{errors?.image?.message}</span>}
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

export default SectionForm