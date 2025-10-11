import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// components
import RestaurantCategoryLangs from "./RestaurantCategoryLangs";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_RESTAURANT_CATEGORY} from "../../../connection/apiPaths";
import {STORE_PATHS_RESTAURANT_CATEGORY} from "../../../store/StorePaths";

const RestaurantCategoryForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_RESTAURANT_CATEGORY));
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

        console.log(requestData)

        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_RESTAURANT_CATEGORY, API_PATH_RESTAURANT_CATEGORY, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_RESTAURANT_CATEGORY, API_PATH_RESTAURANT_CATEGORY, selectedItem.id, requestData, onCloseForm)
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
                        <label className="form-label">Código de la categoría:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                </Row>


                <RestaurantCategoryLangs />
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

export default RestaurantCategoryForm