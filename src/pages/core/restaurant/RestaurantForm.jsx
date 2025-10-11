import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// components
import RestaurantLangs from "./RestaurantLangs"; // Lang Component


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_CORE_RESTAURANT, API_PATH_RESTAURANT_CATEGORY} from "../../../connection/apiPaths";
import {STORE_PATHS_CORE_RESTAURANT} from "../../../store/StorePaths";
import CustomSelect from "../../../components/CustomSelect";

const RestaurantForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_RESTAURANT));
    const { selectedItem, langsEdited:langs } = componentState?.data;

    const [isActive, setIsActive] = useState(selectedItem?.isActive || false);
    const [needReservation, setNeedReservation] = useState(selectedItem?.needReservation || false);
    const [category, setCategory] = useState(selectedItem?.category || null);

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
                isActive,
                needReservation,
                category: category?.id ? { id: category.id } : null,
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_CORE_RESTAURANT, API_PATH_CORE_RESTAURANT, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_CORE_RESTAURANT, API_PATH_CORE_RESTAURANT, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los Restaurantes
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Codigo del Restaurante:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                    <Col>
                        <CustomSelect
                            title={'Categoría del restaurante' }
                            initialValue={ category?.id }
                            servicePath={ API_PATH_RESTAURANT_CATEGORY }
                            onChange={ setCategory }
                        />
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <label className="form-label">
                            <span>¿Esta activo?</span>
                            <Switch
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                    <Col>
                        <label className="form-label">
                            <span>¿Necesita Reservación?</span>
                            <Switch
                                checked={needReservation}
                                onChange={() => setNeedReservation(!needReservation)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                </Row>

                <RestaurantLangs />
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

export default RestaurantForm