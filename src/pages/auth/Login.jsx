import React from "react";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {Form, Row, Col, Label, FormGroup, Button} from 'reactstrap';


// thunks
import {checkingAuthentication} from "../../store/auth/authThunks";

// labels
import {IS_REQUIRED} from "../../labels/formValidationLabels";



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string().required(IS_REQUIRED),
        password: Yup.string().required(IS_REQUIRED),
    }).required()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues:{
            username: "admin",
            password: "admin",
        }
    })

    const onSubmit = async (data) => {
        const {username, password} = data;
        await dispatch(checkingAuthentication(username, password));
        navigate('/main', {replace: true});
    };




    return <>
        <h1>Login Page</h1>

        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>Usuario</Label>
                        <input
                            className={'form-control'}
                            type={'text'}
                            {...register("username")}
                        />
                        {errors?.username && (
                            <div className="invalid-feedback" style={{ display: 'block' }}>
                                {errors?.username?.message || 'Este campo es requerido'}
                            </div>
                        )}
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>Password</Label>
                        <input
                            className={'form-control'}
                            type={'password'}
                            {...register("password")}
                        />
                        { errors?.password && <div className="invalid-feedback" style={{'display':'block'}}>{errors?.password?.message}</div>}
                    </FormGroup>
                </Col>
            </Row>



            <Button type={'submit'} color={'primary'} className={'btn-block'}>
                login
            </Button>

        </Form>

    </>
}

export default Login;