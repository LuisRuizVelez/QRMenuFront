import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// components
import DishCategoryLangs from "./DishCategoryLangs"; // Lang component


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import { validateGroupingRole } from "../../../store/auth/authThunks";
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_DISH_CATEGORY} from "../../../connection/apiPaths";
import {STORE_PATHS_DISH_CATEGORY} from "../../../store/StorePaths";

const DishCategoryForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_CATEGORY));
    const { selectedItem, langsEdited:langs } = componentState?.data;

    const [status, setStatus] = useState(selectedItem?.status || false);

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
            image: selectedItem?.image,
            showOrder: selectedItem?.showOrder,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                status,
                langs
            }
        }

        const groupingRoleValidationResult = validateGroupingRole(requestData);
                        
        if(!groupingRoleValidationResult.valid) 
            return

        if (groupingRoleValidationResult?.groupingRole)
            requestData.item.groupingRole = groupingRoleValidationResult.groupingRole;


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_DISH_CATEGORY, API_PATH_DISH_CATEGORY, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_DISH_CATEGORY, API_PATH_DISH_CATEGORY, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de la categoría de plato o bebida
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Código de la categoría:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Imagen de la categoría:</label>
                        <input
                            className={`form-control ${errors?.image ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("image")}
                        />
                        {errors?.image && <span className="invalid-feedback">{errors?.image?.message}</span>}
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Orden en que se muestra la categoría:</label>
                        <input
                            className={`form-control ${errors?.showOrder ? 'is-invalid' : ''}`}
                            type="number"
                            {...register("showOrder")}
                        />
                        {errors?.showOrder && <span className="invalid-feedback">{errors?.showOrder?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">
                            <span>¿Esta activo?</span>
                            <Switch
                                checked={status}
                                onChange={() => setStatus(!status)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                </Row>

                <DishCategoryLangs />
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

export default DishCategoryForm