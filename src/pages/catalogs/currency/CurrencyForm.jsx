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

// paths
import {API_PATH_CURRENCY} from "../../../connection/apiPaths";
import {STORE_PATHS_CURRENCY} from "../../../store/StorePaths";

const CurrencyForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CURRENCY));
    const { selectedItem} = componentState?.data;

    const [isActive, setIsActive] = useState(selectedItem?.isActive || false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required( 'Este campo es requerido' ),
        symbol: Yup.string().required( 'Este campo es requerido' ),
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
            symbol: selectedItem?.symbol,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                isActive,
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_CURRENCY, API_PATH_CURRENCY, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_CURRENCY, API_PATH_CURRENCY, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los Monedas
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Nombre de la moneda:</label>
                        <input
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("name")}
                        />
                        {errors?.name && <span className="invalid-feedback">{errors?.name?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Símbolo de la moneda:</label>
                        <input
                            className={`form-control ${errors?.symbol ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("symbol")}
                        />
                        {errors?.symbol && <span className="invalid-feedback">{errors?.symbol?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
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

export default CurrencyForm