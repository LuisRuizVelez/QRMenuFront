import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "reactstrap";

// components
import CustomSelect from "../../../components/CustomSelect";

// thunks
import { getStateByPath } from "../../../store/navigation/navigationThunks";

// paths
import { STORE_PATHS_CORE_DISH, STORE_PATHS_DISH_PRICE } from "../../../store/StorePaths";
import { API_PATH_CURRENCY, API_PATH_DISH_PRESENTATION, API_PATH_DISH_PRICE } from "../../../connection/apiPaths";

// actions
import navigationActions from "../../../store/navigation/navigationActions";

const DishPriceForm = () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DISH));
    const { selectedItem } = componentState?.data;

    const [presentation, setPresentation] = useState(null);
    const [currency, setCurrency] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            price: "",
        },
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                presentation,
                currency,
                drink: {id: selectedItem.id},
                price: parseFloat(data.price),
            }
        }

        navigationActions.save(STORE_PATHS_DISH_PRICE, API_PATH_DISH_PRICE, requestData, cleanFields)
    };

    const cleanFields = () => {
        setPresentation(null);
        setCurrency(null);
        reset({
            price: "",
        });
    }

    return (
        <>
            <h5>Asignar Nuevo Precio</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <CustomSelect
                            title={"Selecciona una presentación"}
                            servicePath={API_PATH_DISH_PRESENTATION}
                            onChange={setPresentation}
                        />
                    </Col>
                    <Col>
                        <CustomSelect
                            title={"Selecciona una Moneda"}
                            servicePath={API_PATH_CURRENCY}
                            onChange={setCurrency}
                        />
                    </Col>
                    <Col>
                        <label className="form-label">Precio:</label>
                        <input
                            className={`form-control ${errors?.price ? "is-invalid" : ""}`}
                            type="number"
                            step="0.01"
                            {...register("price", { required: "El precio es obligatorio" })}
                        />
                        {errors?.price && (
                            <span className="invalid-feedback">{errors?.price?.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Button type="submit" color="primary">
                            Asignar Precio
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default DishPriceForm;