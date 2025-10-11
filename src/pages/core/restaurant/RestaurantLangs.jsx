import {Col, Row} from "reactstrap";

// components
import EditableLangs from "../../../components/EditableLangs";

// store
import {STORE_PATHS_CORE_RESTAURANT} from "../../../store/StorePaths";



const RestaurantLangs = () => {

    const children = (key, child, onInputChange) => {

        return  <div key={key}>
            <Row>
                <Col>
                    <label className="form-label">Nombre del Restaurante:</label>
                    <input
                        className={`form-control`}
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={child?.name}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label">URL del video Promocional:</label>
                    <input
                        className={`form-control`}
                        type="text"
                        name="videoUrl"
                        placeholder="URL Video"
                        value={child?.videoUrl}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label">Descripción Corta del Restaurante:</label>
                    <textarea
                        className={`form-control`}
                        name="shortDescription"
                        placeholder="Descripción Corta"
                        value={child?.shortDescription}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label">Descripción Larga del Restaurante:</label>
                    <textarea
                        className={`form-control`}
                        name="longDescription"
                        placeholder="Descripción Corta"
                        value={child?.longDescription}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
        </div>
    }

    return <EditableLangs
        children={children}
        storagePath={STORE_PATHS_CORE_RESTAURANT}
        defaultValues={{
            name: '',
            videoUrl:'',
            shortDescription:'',
            longDescription:'',
        }}
    />
}

export default RestaurantLangs