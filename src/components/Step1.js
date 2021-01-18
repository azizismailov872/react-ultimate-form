import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import Typography from "@material-ui/core/Typography";
import { MainContainer } from "./MainContainer";
import { Form } from "./Form";
import { Input } from "./Input";
import { PrimaryButton } from "./PrimaryButton";
import { useHistory } from "react-router-dom";
import {useData} from './../DataContext';

const schema = yup.object().shape({
    firstName: yup.string()
        .matches(/^([^0-9]*)$/, "Имя не должно содержать цифры")
        .required("Поле имя обязательно для заполнения"),
    lastName: yup.string()
        .matches(/^([^0-9]*)$/, "Фамилия не должно содержать цифры")
        .required("Поле фамилия обязательно для заполнения"),
});

export const Step1 = (props) => {

    const history = useHistory();

    const {data,setValues} = useData();

    const { register, handleSubmit, errors} = useForm({
        defaultValues: {firstName: data.firstName, lastName: data.lastName},
		mode: "onBluer",
		resolver: yupResolver(schema)
    });

    const onSubmit = (formData) => {
        history.push('/step2');
        setValues(formData);
    };

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                Step 1
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    ref={register}
                    id="firstName"
                    type="text"
                    label="First Name"
                    name="firstName"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                <Input
                    ref={register}
                    id="lastName"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </MainContainer>
    );
};
