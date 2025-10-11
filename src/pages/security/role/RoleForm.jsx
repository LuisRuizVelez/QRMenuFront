import * as Yup from "yup";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_ROLE} from "../../../connection/apiPaths";
import {STORE_PATHS_ROLE} from "../../../store/StorePaths";
import SectionsByRole from "../../ui/components/SectionsByRole";

const RoleForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_ROLE));
    const { selectedItem } = componentState?.data;

    const validationSchema = Yup.object().shape({
        authority: Yup.string().required( 'Este campo es requerido' ),
    }).required()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: selectedItem?.id,
            authority: selectedItem?.authority,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_ROLE, API_PATH_ROLE, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_ROLE, API_PATH_ROLE, selectedItem.id, requestData, onCloseForm)
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
                        <label className="form-label">Nombre del role:</label>
                        <input
                            className={`form-control ${errors?.authority ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("authority")}
                        />
                        {errors?.authority && <span className="invalid-feedback">{errors?.authority?.message}</span>}
                    </Col>
                </Row>
            </CardBody>

            {
                selectedItem && <Row>
                    <Col>
                        <SectionsByRole role={selectedItem} />
                   </Col>
                </Row>
            }

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

export default RoleForm