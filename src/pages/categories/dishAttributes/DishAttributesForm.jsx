import * as Yup from "yup";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";


// components
import DishAttributesLangs  from "./DishAttributesLangs"; // Lang Component


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_DISH_ATTRIBUTES} from "../../../connection/apiPaths";
import {STORE_PATHS_DISH_ATTRIBUTES} from "../../../store/StorePaths";

const DishAttributesForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_ATTRIBUTES));
    const { selectedItem, langsEdited:langs } = componentState?.data;


    const validationSchema = Yup.object().shape({
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
            icon: selectedItem?.icon,
            color: selectedItem?.color,
            relatedImage: selectedItem?.relatedImage,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                langs
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_DISH_ATTRIBUTES, API_PATH_DISH_ATTRIBUTES, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_DISH_ATTRIBUTES, API_PATH_DISH_ATTRIBUTES, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los los atributos de los platillos y bebidas
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Código del atributo:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Ícono:</label>
                        <input
                            className={`form-control ${errors?.icon ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("icon")}
                        />
                        {errors?.icon && <span className="invalid-feedback">{errors?.icon?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Color del atributo:</label>
                        <input
                            className={`form-control ${errors?.color ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("color")}
                        />
                        {errors?.color && <span className="invalid-feedback">{errors?.color?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Imagen de relación:</label>
                        <input
                            className={`form-control ${errors?.relatedImage ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("relatedImage")}
                        />
                        {errors?.relatedImage && <span className="invalid-feedback">{errors?.relatedImage?.message}</span>}
                    </Col>
                </Row>



                <DishAttributesLangs  />
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

export default DishAttributesForm