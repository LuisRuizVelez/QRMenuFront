import * as Yup from "yup";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";


// components
import MenuCategoryLangs from "./MenuCategoryLangs";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_MENU_CATEGORY} from "../../../connection/apiPaths";
import {STORE_PATHS_MENU_CATEGORY} from "../../../store/StorePaths";

const MenuCategoryForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_MENU_CATEGORY));
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
            navigationActions.save(STORE_PATHS_MENU_CATEGORY, API_PATH_MENU_CATEGORY, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_MENU_CATEGORY, API_PATH_MENU_CATEGORY, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de las categorías de menú
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Código del Menú:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                </Row>


                <MenuCategoryLangs />
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

export default MenuCategoryForm