import {Col, Row} from "reactstrap";

// components
import EditableLangs from "../../../components/EditableLangs";

// store
import {STORE_PATHS_CORE_DRINK} from "../../../store/StorePaths";



const DrinkLangs = () => {

    const children = (key, child, onInputChange) => <div key={key}>
        <Row>
            <Col>
                <label className="form-label">Título del platillo:</label>
                <input
                    className={`form-control`}
                    type="text"
                    name="title"
                    placeholder="Título del platillo"
                    value={child?.title}
                    onChange={onInputChange}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <label className="form-label">Descripción básica del platillo:</label>
                <textarea
                    className={`form-control`}
                    name="shortDescription"
                    placeholder="Descripción básica del platillo"
                    value={child?.shortDescription}
                    onChange={onInputChange}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <label className="form-label">Descripción detallada del platillo:</label>
                <textarea
                    className={`form-control`}
                    name="longDescription"
                    placeholder="Descripción detallada del platillo"
                    value={child?.longDescription}
                    onChange={onInputChange}
                />
            </Col>
        </Row>
    </div>


    return <EditableLangs
        children={children}
        storagePath={STORE_PATHS_CORE_DRINK}
        defaultValues={{
            title: '',
            shortDescription: '',
            longDescription: ''
        }}
    />
}

export default DrinkLangs