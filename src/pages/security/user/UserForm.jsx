import * as Yup from "yup";
import { useState } from "react";
import {Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_USER} from "../../../connection/apiPaths";
import {STORE_PATHS_USER} from "../../../store/StorePaths";
import RolesByUser from "../components/RolesByUser";

const UserForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_USER));
    const { selectedItem } = componentState?.data;

    const [enabled, setEnabled] = useState(selectedItem?.enabled || false);
    const [accountExpired, setAccountExpired] = useState(selectedItem?.accountExpired || false);
    const [accountLocked, setAccountLocked] = useState(selectedItem?.accountLocked || false);
    const [passwordExpired, setPasswordExpired] = useState(selectedItem?.passwordExpired || false);


    const validationSchema = Yup.object().shape({
        username: Yup.string().required( 'Este campo es requerido' ),
        password: Yup.string().required( 'Este campo es requerido' ),
    }).required()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: selectedItem?.id,
            username: selectedItem?.username,
            password: selectedItem?.password,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                enabled,
                accountExpired,
                accountLocked,
                passwordExpired
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_USER, API_PATH_USER, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_USER, API_PATH_USER, selectedItem.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los usuarios
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Username:</label>
                        <input
                            className={`form-control ${errors?.username ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("username")}
                        />
                        {errors?.username && <span className="invalid-feedback">{errors?.username?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Password:</label>
                        <input
                            className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                            type="password"
                            {...register("password")}
                        />
                        {errors?.password && <span className="invalid-feedback">{errors?.password?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">
                            <span>¿Usuario activo?</span> <br />
                            <Switch
                                checked={enabled}
                                onChange={() => setEnabled(!enabled)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                    <Col>
                        <FormGroup>
                            <label className="form-label">
                                <span>¿Cuenta Expirada?</span> <br/>
                                <Switch
                                    checked={accountExpired}
                                    onChange={() => setAccountExpired(!accountExpired)}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />
                            </label>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <label className="form-label">
                                <span>¿Cuenta Bloqueada?</span> <br/>
                                <Switch
                                    checked={accountLocked}
                                    onChange={() => setAccountLocked(!accountLocked)}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />
                            </label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <label className="form-label">
                                <span>¿Contraseña Expirada?</span> <br/>
                                <Switch
                                    checked={passwordExpired}
                                    onChange={() => setPasswordExpired(!passwordExpired)}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />
                            </label>
                        </FormGroup>
                    </Col>
                </Row>

                {
                    selectedItem && <Row>
                        <Col>
                            <RolesByUser user={selectedItem} />
                        </Col>
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

export default UserForm