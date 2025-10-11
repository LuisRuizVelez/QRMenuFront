import {Col, Row} from "reactstrap";

// components
import EditableLangs from "../../../components/EditableLangs";

// store
import {STORE_PATHS_MENU_CATEGORY} from "../../../store/StorePaths";



const MenuCategoryLangs = () => {

    const children = (key, child, onInputChange) => <div key={key}>
        <Row>
            <Col>
                <label className="form-label">Título de la categoría:</label>
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
    </div>

    return <EditableLangs
        children={children}
        storagePath={STORE_PATHS_MENU_CATEGORY}
        defaultValues={{
            title: ''
        }}
    />
}

export default MenuCategoryLangs;