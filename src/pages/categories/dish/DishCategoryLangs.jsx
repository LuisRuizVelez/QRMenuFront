import {Col, Row} from "reactstrap";

// components
import EditableLangs from "../../../components/EditableLangs";

// store
import {STORE_PATHS_DISH_CATEGORY} from "../../../store/StorePaths";



const DishCategoryLangs = () => {

    const children = (key, child, onInputChange) => {

        return  <div key={key}>
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
            <Row>
                <Col>
                    <label className="form-label">Descripción corta de la categoría:</label>
                    <textarea
                        className={`form-control`}
                        name="shortDescription"
                        placeholder="Descripción corta de la categoría"
                        value={child?.shortDescription}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label">Descripción larga de la categoría:</label>
                    <textarea
                        className={`form-control`}
                        name="longDescription"
                        placeholder="Descripción larga de la categoría"
                        value={child?.longDescription}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
        </div>
    }

    return <EditableLangs
        children={children}
        storagePath={STORE_PATHS_DISH_CATEGORY}
        defaultValues={{
            title: '',
            shortDescription: '',
            longDescription: ''
        }}
    />
}

export default DishCategoryLangs;