import * as Yup from "yup";
import Switch from "react-switch";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import {Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";


// components
import SectionsByRole from "../../ui/components/SectionsByRole";
import CustomSelect from "../../../components/CustomSelect";

// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_ROLE} from "../../../connection/apiPaths";
import {STORE_PATHS_ROLE} from "../../../store/StorePaths";


const RoleForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_ROLE));
    const { selectedItem:role } = componentState?.data;

    const [isToGrouping, setIsToGrouping] = useState(role?.isToGrouping || false);
    const [parentRole, setParentRole] = useState(role?.parentRole?.id || null);


    const validationSchema = Yup.object().shape({
        authority: Yup.string().required( 'Este campo es requerido' ),
    }).required()


    // Clear parentRole when isToGrouping is true
    useEffect(() => {
        if (isToGrouping)
            setParentRole(null);
    }, [isToGrouping]);



    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: role?.id,
            authority: role?.authority,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                isToGrouping,
                parentRole: parentRole ? { id: parentRole.id } : null
            }
        }

        if (!role?.id)
            navigationActions.save(STORE_PATHS_ROLE, API_PATH_ROLE, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_ROLE, API_PATH_ROLE, role.id, requestData, onCloseForm)
    }

    const onCloseForm = () => props.onClose();



    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario del Role
            </CardTitle>
            <CardBody>
                <Row>
                    <Col>
                        <FormGroup>
                            <label className="form-label">
                                <span>¿Es un rol agrupador?</span> <br/>
                                <Switch
                                    checked={isToGrouping}
                                    onChange={() => setIsToGrouping(!isToGrouping)}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />
                            </label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <label className="form-label">Nombre del role:</label>
                        <input
                            className={`form-control ${errors?.authority ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("authority")}
                        />
                        {errors?.authority && <span className="invalid-feedback">{errors?.authority?.message}</span>}
                    </Col>
                </Row>
                {
                    !isToGrouping && <Row>
                        <Col>
                            <CustomSelect
                                title={'Selecciona el rol padre'}
                                initialValue={parentRole}
                                onChange={setParentRole}
                                servicePath={API_PATH_ROLE}
                                customFilter={{ item: {isToGrouping: true} }}
                            />
                        </Col>
                    </Row>
                }
            </CardBody>

            {
                (role && !isToGrouping) && <Row>
                    <Col>
                        <SectionsByRole role={role} />
                   </Col>
                </Row>
            }

            <CardFooter>
                <button type="submit" className="btn btn-primary">
                    {role ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCloseForm}>
                    Cancel
                </button>
            </CardFooter>
        </Card>
    </Form>
}

export default RoleForm