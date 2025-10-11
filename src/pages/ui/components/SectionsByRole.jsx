import {useEffect, useRef, useState} from "react";
import {Col, Row} from "reactstrap";


// components
import {InsideLoader} from "../../../ui/Loader";
import CustomSelect from "../../../components/CustomSelect";

// Paths
import {
    API_PATH_ROLE,
    API_PATH_SECTION
} from "../../../connection/apiPaths";

// utils
import createService from "../../../connection/CreateService";


const SectionsByRole = ({ role }) => {
    const roleService = createService(API_PATH_ROLE);

    const [loading, setLoading] = useState(false)
    const [sections, setSections] = useState([])
    const [selectedSections, setSelectedSections] = useState(null)

    const isMounted = useRef(true)


    //Actualizar la referencia
    useEffect(() => {
        if (!role?.id) return;

        getSectionsByRole(role?.id)

        return () => {
            isMounted.current = false
        }
    }, [role])



    const getSectionsByRole = () => roleService.getSectionsByRole(role.id)
        .then(response => {
            if (!isMounted.current) return;
            setSections(response);
        })
        .catch(error => console.error("Error fetching sections by role:", error))
        .finally(() => {
            if (!isMounted.current) return;
            setLoading(false);
        });


    const addSectionToRole = () => {
        if (!selectedSections || !role?.id) return;

        roleService.addSectionToRole(role.id, selectedSections?.id)
            .then(response => {
                if (!isMounted.current) return;

                setSections([...sections, response]);
                setSelectedSections(null); // Clear the selected section after adding
            })
            .catch(error => console.error("Error adding section to role:", error))
            .finally(() => {
                if (!isMounted.current) return;
                setLoading(false);
            });
    }

    const removeSectionFromRole = (sectionId) => {
        if (!sectionId || !role?.id) return;

        roleService.removeSectionFromRole(role?.id, sectionId)
            .then(() => {
                if (!isMounted.current) return;

                setSections(sections.filter(section => section.id !== sectionId));
            })
            .catch(error => console.error("Error removing section from role:", error))
            .finally(() => {
                if (!isMounted.current) return;
                setLoading(false);
            });
    }


    if (loading)
        return <InsideLoader title={'Cargando Secciones'}/>


    return <>
        <Row>
            <Col md={9}>
                <CustomSelect
                    title={'Seleccionar la sección'}
                    initialValue={selectedSections}
                    onChange={setSelectedSections}
                    servicePath={API_PATH_SECTION}
                />
            </Col>
            <Col>
                <br/>
                <button
                    type={'button'}
                    className={'btn btn-primary btn-sm'}
                    onClick={addSectionToRole}
                >
                    Asignar
                </button>
            </Col>
        </Row>
        <br/>
        <br/>
        {
            sections?.length <= 0
                ? <div className={'align-content-center'}>No tiene roles asignados</div>
                : sections.map(section => <Row key={section?.id}>
                    <Col md={8}>
                        <strong>{section?.name}</strong>
                    </Col>
                    <Col>
                        <button
                            type={'button'}
                            className={'btn btn-danger btn-sm'}
                            onClick={() => removeSectionFromRole(section?.id)}
                        >
                            Quitar
                        </button>
                    </Col>
                </Row>)
        }
    </>

}

export default SectionsByRole;