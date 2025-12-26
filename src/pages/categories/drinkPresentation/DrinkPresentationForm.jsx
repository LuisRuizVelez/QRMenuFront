import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";

// components
import DrinkPresentationLangs from "./DrinkPresentationLangs"; // Lang Component


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import { validateGroupingRole } from "../../../store/auth/authThunks";
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_DRINK_PRESENTATION} from "../../../connection/apiPaths";
import {STORE_PATHS_DRINK_PRESENTATION} from "../../../store/StorePaths";

const DrinkPresentationForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DRINK_PRESENTATION));
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
                langs,
            }
        }

        const groupingRoleValidationResult = validateGroupingRole(requestData);
                        
        if(!groupingRoleValidationResult.valid) 
            return

        if (groupingRoleValidationResult?.groupingRole)
            requestData.item.groupingRole = groupingRoleValidationResult.groupingRole;


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_DRINK_PRESENTATION, API_PATH_DRINK_PRESENTATION, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_DRINK_PRESENTATION, API_PATH_DRINK_PRESENTATION, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario del tipo de presentación
            </CardTitle>
            <CardBody>
                <Row>
                    <Col>
                        <label className="form-label">Código del tipo de presentación:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                </Row>

                <DrinkPresentationLangs />
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

export default DrinkPresentationForm