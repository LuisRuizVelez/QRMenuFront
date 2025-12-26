import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// components
import DishLangs from "./DishLangs"; // Lang Component
import CustomSelect from "../../../components/CustomSelect";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import { validateGroupingRole } from "../../../store/auth/authThunks";
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATHS_CORE_DISH} from "../../../store/StorePaths";
import {API_PATH_CORE_DISH, API_PATH_CORE_MENU, API_PATH_DISH_CATEGORY} from "../../../connection/apiPaths";


const DishForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DISH));
    const { selectedItem, langsEdited:langs } = componentState?.data;

    const [isActive, setIsActive] = useState(selectedItem?.isActive || false);
    const [dishCategory, setDishCategory] = useState(selectedItem?.dishCategory?.id || null)
    const [menu, setMenu] = useState(selectedItem?.menu?.id || null)

    const validationSchema = Yup.object().shape({}).required()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: selectedItem?.id,
            image: selectedItem?.image,
            showOrder: selectedItem?.showOrder,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                langs,
                isActive,
                dishCategory: dishCategory ? { id: dishCategory?.id } : null,
                menu
            }
        }

        const groupingRoleValidationResult = validateGroupingRole(requestData);
                        
        if(!groupingRoleValidationResult.valid) 
            return

        if (groupingRoleValidationResult?.groupingRole)
            requestData.item.groupingRole = groupingRoleValidationResult.groupingRole;
        


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_CORE_DISH, API_PATH_CORE_DISH, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_CORE_DISH, API_PATH_CORE_DISH, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los Platillos
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <CustomSelect
                            title={'¿A qué categoría pertenece este platillo?' }
                            initialValue={dishCategory}
                            servicePath={API_PATH_DISH_CATEGORY}
                            onChange={ setDishCategory }
                        />
                    </Col>
                    <Col>
                        <CustomSelect
                            title={'¿A qué menú pertenece este platillo?' }
                            initialValue={menu}
                            servicePath={API_PATH_CORE_MENU}
                            onChange={ setMenu }
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Imagen del paltillo:</label>
                        <input
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("name")}
                        />
                        {errors?.name && <span className="invalid-feedback">{errors?.name?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Orden de presentación:</label>
                        <input
                            className={`form-control ${errors?.showOrder ? 'is-invalid' : ''}`}
                            type="number"
                            {...register("showOrder")}
                        />
                        {errors?.showOrder && <span className="invalid-feedback">{errors?.showOrder?.message}</span>}
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

                <DishLangs />
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

export default DishForm