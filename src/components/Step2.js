import React from "react";
import { MainContainer } from "./MainContainer";
import { Form } from "./Form";
import { Input } from "./Input";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "./PrimaryButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useData } from "./../DataContext";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Email должен быть корректным")
        .required("Email обязатнльное поле"),
});

export const Step2 = () => {
	const history = useHistory();
    
    const {data,setValues} = useData();

	const normolizePhoneNumber = (number) => {
		const phoneNumber = parsePhoneNumberFromString(number);
		if(!phoneNumber){
			return number
		}
		return(phoneNumber.formatInternational());
	}

    const { register, handleSubmit, errors, watch } = useForm({
        defaultValues: {email: data.email, phoneNumber: data.phoneNumber, hasPhone: data.hasPhone},
        mode: "onBlur",
        resolver: yupResolver(schema),
	});
	const hasPhone = watch("hasPhone");

    const onSubmit = (formData) => {
        history.push("/step3");
        setValues(formData);
    };

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                Step 2
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
					ref={register}
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    required
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
				<FormControlLabel label="У вас есть телефон" 
				control={<Checkbox defaultValue={data.hasPhone} defaultChecked={data.hasPhone} name="hasPhone" inputRef={register} color="primary" />}
				/>
				{
					hasPhone && (
						<Input 
						ref={register}
						id="phoneNumber"
						type="tel"
						label="Phone number"
						name="phoneNumber"
						onChange={e => {
							e.target.value = normolizePhoneNumber(e.target.value)
						}}
						/>
					)
				}
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </MainContainer>
    );
};
