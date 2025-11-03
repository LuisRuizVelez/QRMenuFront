import {Col, Row} from "reactstrap";

// components
import EditableLangs from "../../../components/EditableLangs";

// store
import {STORE_PATHS_DRINK_PRESENTATION} from "../../../store/StorePaths";



const DrinkPresentationLangs = () => {

    const children = (key, child, onInputChange) => {

        return  <div key={key}>
            <Row>
                <Col>
                    <label className="form-label">Título del tipo de presentación:</label>
                    <input
                        className={`form-control`}
                        type="text"
                        name="title"
                        placeholder="Título de la presentación"
                        value={child?.title}
                        onChange={onInputChange}
                    />
                </Col>
            </Row>
        </div>
    }

    return <EditableLangs
        children={children}
        storagePath={STORE_PATHS_DRINK_PRESENTATION}
        defaultValues={{title:''}}
    />
}

export default DrinkPresentationLangs