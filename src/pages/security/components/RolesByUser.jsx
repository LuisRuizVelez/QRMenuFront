import {useEffect, useRef, useState} from "react";
import {Col, Row} from "reactstrap";

// components
import CustomSelect from "../../../components/CustomSelect";
import {InsideLoader} from "../../../ui/Loader";

// services
import createService from "../../../connection/CreateService";

// paths
import {API_PATH_ROLE, API_PATH_USER} from "../../../connection/apiPaths";

const RolesByUser = ({user}) => {

    const userService = createService(API_PATH_USER)

    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])
    const [selectedRol, setSelectedRol] = useState(null)

    const isMounted = useRef(true)


    //Actualizar la referencia
    useEffect(() => {
        if (!user?.id) return;
        
        getRolesByUser(user?.id)

        return () => {
            isMounted.current = false
        }
    }, [user])


    const getRolesByUser = () => userService.getRoles(user.id)
        .then(response => {
            if (!isMounted.current) return;
            setRoles(response)
        })
        .catch(error => console.error("Error fetching roles by user:", error))
        .finally(() => {
            if (!isMounted.current) return;
            setLoading(false)
        });

    const addRoleToUser = () => {
        if (!selectedRol || !user?.id) return;

        userService.addRole(user.id, selectedRol?.id)
            .then(response => {
                if (!isMounted.current) return;

                setRoles([...roles, response])
                setSelectedRol(null)
            })
            .catch(error => console.error("Error adding role to user:", error))
            .finally(() => {
                if (!isMounted.current) return;
                setLoading(false)
            });
    }

    const removeRoleFromUser = (roleId) => {
        if (!roleId || !user?.id) return;

        userService.removeRole(user.id, roleId)
            .then(_ => {
                if (!isMounted.current) return;
                setRoles(roles.filter(role => role.id !== roleId))
            })
            .catch(error => console.error("Error removing role from user:", error))
            .finally(() => {
                if (!isMounted.current) return;
                setLoading(false)
            });
    }

    if (loading)
        return <InsideLoader title={'Cargando Roles'}/>


    return <>
        <Row>
            <Col md={9}>
                <CustomSelect
                    title={'Seleccionar Rol'}
                    initialValue={selectedRol}
                    onChange={setSelectedRol}
                    servicePath={API_PATH_ROLE}
                />
            </Col>
            <Col>
                <br/>
                <button
                    type={'button'}
                    className={'btn btn-primary btn-sm'}
                    onClick={addRoleToUser}
                >
                    Asignar
                </button>
            </Col>
        </Row>
        <br/>
        <br/>
        {
            roles.length <= 0
                ? <div className={'align-content-center'}>No tiene roles asignados</div>
                : roles.map(role => <Row key={role.id}>
                        <Col md={9}>
                            <strong>{role?.authority}</strong>
                        </Col>
                        <Col>
                        <button
                            type={'button'}
                            className={'btn btn-danger btn-sm'}
                            onClick={() => removeRoleFromUser(role?.id)}
                        >
                            Quitar
                        </button>
                    </Col>
                </Row>)
        }
    </>
}

export default RolesByUser;