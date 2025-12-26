import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// components
import MenuLangs from "./MenuLangs"; 
import DishByMenu from "./DishByMenu";
import CustomSelect from "../../../components/CustomSelect";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import { validateGroupingRole } from "../../../store/auth/authThunks";
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {STORE_PATHS_CORE_MENU} from "../../../store/StorePaths";
import {API_PATH_CORE_MENU, API_PATH_CORE_RESTAURANT, API_PATH_MENU_CATEGORY} from "../../../connection/apiPaths";



const MenuForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_MENU));
    const { selectedItem, langsEdited:langs } = componentState?.data;

    const [isActive, setIsActive] = useState(selectedItem?.isActive || false);
    const [restaurant, setRestaurant] = useState(selectedItem?.restaurant?.id || null)
    const [category, setCategory] = useState(selectedItem?.category?.id || null)

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
                restaurant: restaurant?.id ? { id: restaurant.id } : null,
                category: category?.id ? { id: category.id } : null,
            }
        }
        
        const groupingRoleValidationResult = validateGroupingRole(requestData);
                
        if(!groupingRoleValidationResult.valid) 
            return

        if (groupingRoleValidationResult?.groupingRole)
            requestData.item.groupingRole = groupingRoleValidationResult.groupingRole;


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_CORE_MENU, API_PATH_CORE_MENU, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_CORE_MENU, API_PATH_CORE_MENU, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los Menus
            </CardTitle>
            <CardBody>
                <Row>
                    <Col>
                        <label className="form-label">Código del Menu:</label>
                        <input
                            className={`form-control ${errors?.code ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("code")}
                        />
                        {errors?.code && <span className="invalid-feedback">{errors?.code?.message}</span>}
                    </Col>
                    <Col>
                        <CustomSelect
                            title={'¿A qué restaurante pertenece este menú?' }
                            initialValue={restaurant}
                            servicePath={API_PATH_CORE_RESTAURANT}
                            onChange={ setRestaurant }
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <CustomSelect
                            title={'¿De qué categoría es este menú?' }
                            initialValue={category}
                            servicePath={API_PATH_MENU_CATEGORY}
                            onChange={ setCategory }
                        />
                    </Col>
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
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Imágen del menu:</label>
                        <input
                            className={`form-control ${errors?.image ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("image")}
                        />
                        {errors?.image && <span className="invalid-feedback">{errors?.image?.message}</span>}
                    </Col>

                    <Col>
                        <label className="form-label">Orden de presentación:</label>
                        <input
                            className={`form-control ${errors?.showOrder ? 'is-invalid' : ''}`}
                            type="number"
                            min={1}
                            {...register("showOrder")}
                        />
                        {errors?.showOrder && <span className="invalid-feedback">{errors?.showOrder?.message}</span>}
                    </Col>

                </Row>

                <MenuLangs />

                <br/>


                {
                    selectedItem && <Row>
                        <Col>
                            <DishByMenu menu={selectedItem} />
                        </Col>
                        <Col>Bebidas</Col>
                    </Row>
                }
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

export default MenuForm