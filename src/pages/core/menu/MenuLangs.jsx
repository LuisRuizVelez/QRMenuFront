import {Col, Row} from "reactstrap";

// components
import EditableLangs from "../../../components/EditableLangs";

// store
import {STORE_PATHS_CORE_MENU} from "../../../store/StorePaths";



const MenuLangs = () => {

    const children = (key, child, onInputChange) => {

        return  <div key={key}>
            <Row>
                <Col>
                    <label className="form-label">Título del Menú:</label>
                    <input
                        className={`form-control`}
                        type="text"
                        name="title"
                        placeholder="Título de la categoría"
                        value={child?.title}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label">Descripción corta del menú:</label>
                    <textarea
                        className={`form-control`}
                        name="shortDescription"
                        placeholder="Descripción corta del menú"
                        value={child?.shortDescription}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label">Descripción larga del menú:</label>
                    <textarea
                        className={`form-control`}
                        name="longDescription"
                        placeholder="Descripción corta del menú"
                        value={child?.longDescription}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
        </div>
    }

    return <EditableLangs
        children={children}
        storagePath={STORE_PATHS_CORE_MENU}
        defaultValues={{
            title: '',
            shortDescription: '',
            longDescription: ''
        }}
    />
}

export default MenuLangs