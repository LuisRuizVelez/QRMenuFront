import * as Yup from "yup";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Col, Form, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import Switch from "react-switch";


// actions
import navigationActions from "../../../store/navigation/navigationActions";

// thunks
import {getStateByPath} from "../../../store/navigation/navigationThunks";

// paths
import {API_PATH_LANG} from "../../../connection/apiPaths";
import {STORE_PATHS_LANG} from "../../../store/StorePaths";


const LangForm = props => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_LANG));
    const { selectedItem } = componentState?.data;

    const [isEnabledToEdit, setIsEnabledToEdit] = useState(selectedItem?.isEnabledToEdit || false);
    const [isDefault, setIsDefault] = useState(selectedItem?.isDefault || false);
    const [isBaseTranslate, setIsBaseTranslate] = useState(selectedItem?.isBaseTranslate || false);
    const [isActive, setIsActive] = useState(selectedItem?.isActive || false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required( 'Este campo es requerido' ),
        twoLetterCode: Yup.string().required( 'Este campo es requerido' ).max(2, 'El código de 2 letras no puede tener más de 2 caracteres'),
        threeLetterCode: Yup.string().required( 'Este campo es requerido' ).max(3, 'El código de 3 letras no puede tener más de 3 caracteres'),
    }).required()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: selectedItem?.id,
            name: selectedItem?.name,
            twoLetterCode: selectedItem?.twoLetterCode,
            threeLetterCode: selectedItem?.threeLetterCode,
            isEnabledToEdit: selectedItem?.isEnabledToEdit,
            isDefault: selectedItem?.isDefault,
            isBaseTranslate: selectedItem?.isBaseTranslate,
        }
    });

    const onSubmit = (data) => {
        const requestData = {
            item: {
                ...data,
                isEnabledToEdit,
                isDefault,
                isBaseTranslate,
                isActive,
            }
        }


        if (!selectedItem?.id)
            navigationActions.save(STORE_PATHS_LANG, API_PATH_LANG, requestData, onCloseForm)
        else
            navigationActions.update(STORE_PATHS_LANG, API_PATH_LANG, selectedItem.id, requestData, onCloseForm)
    }
    
    const onCloseForm = () => props.onClose();
    


    return <Form onSubmit={ handleSubmit(onSubmit) }>
        <Card>
            <CardTitle>
                Formulario de los langs
            </CardTitle>
            <CardBody>

                <Row>
                    <Col>
                        <label className="form-label">Nombre del idioma:</label>
                        <input
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            type="text"
                            {...register("name")}
                        />
                        {errors?.name && <span className="invalid-feedback">{errors?.name?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Código de 2 letras</label>
                        <input
                            className={`form-control ${errors?.twoLetterCode ? 'is-invalid' : ''}`}
                            type="text"
                            max={2}
                            {...register("twoLetterCode")}
                        />
                        {errors?.twoLetterCode && <span className="invalid-feedback">{errors?.twoLetterCode?.message}</span>}
                    </Col>
                    <Col>
                        <label className="form-label">Código de 3 letras</label>
                        <input
                            className={`form-control ${errors?.threeLetterCode ? 'is-invalid' : ''}`}
                            type="text"
                            max={3}
                            {...register("threeLetterCode")}
                        />
                        {errors?.threeLetterCode && <span className="invalid-feedback">{errors?.threeLetterCode?.message}</span>}
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <label className="form-label">
                            <span>¿Está activo?</span>
                            <Switch
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                    <Col sm={12}>
                        <label className="form-label">
                            <span>Habilitado para editar:</span>
                            <Switch
                                checked={isEnabledToEdit}
                                onChange={() => setIsEnabledToEdit(!isEnabledToEdit)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                    <Col sm={12}>
                        <label className="form-label">
                            <span>Es el idioma default:</span>
                            <Switch
                                checked={isDefault}
                                onChange={() => setIsDefault(!isDefault)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>

                    <Col sm={12}>
                        <label className="form-label">
                            <span>Es el idioma de traducción base:</span>
                            <Switch
                                checked={isBaseTranslate}
                                onChange={() => setIsBaseTranslate(!isBaseTranslate)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            />
                        </label>
                    </Col>
                </Row>


            </CardBody>
            <CardFooter>
                <button type="submit" className="btn btn-primary">
                    {selectedItem ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn btn-danger" onClick={onCloseForm}>
                    Cancel
                </button>
            </CardFooter>
        </Card>
    </Form>
}

export default LangForm