import React from "react";
import Input from "../../components/Input/Input";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import {
	Container,
	FormContainer,
	FormTitle,
	Row,
	Wrapper,
	Form,
	SubmitButton,
	ErrorMessage,
} from "./style";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const schema = yup
	.object({
		username: yup.string().email().required("Username required"),
		password: yup.string().required("Password required"),
	})
	.required();

const Home = () => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			mail: "",
			passwordSchema: "",
		},
		mode: "onBlur",
	});

	const submitFunction = (e) => {
		e.preventDefault();

		console.log(login, password);
	};

	return (
		<React.Fragment>
			<Wrapper>
				<Container>
					<Row>
						<FormContainer>
							<FormTitle>Login</FormTitle>
							<Form onSubmit={submitFunction}>
								<Input
									placeholder="username"
									type="text"
									name="username"
									control={control}
								/>
								<ErrorMessage>
									{errors.username?.message}
								</ErrorMessage>
								<Input
									placeholder="password"
									type="password"
									name="password"
									control={control}
								/>
								<ErrorMessage>
									{errors.password?.message}
								</ErrorMessage>
								
								<SubmitButton disabled={!isValid}>Submit</SubmitButton>
							</Form>
							<Row>
								<Link to="/register">Register</Link>
								<Link to="/">Forgot Password</Link>
							</Row>
						</FormContainer>
					</Row>
				</Container>
			</Wrapper>
		</React.Fragment>
	);
};

export default Home;
