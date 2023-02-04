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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { client } from "../../../services/api/client";
import Message from "../../components/Message/Message";

const schema = yup
	.object({
		username: yup
			.string()
			.required("Username required")
			.min(6, "Username must be at least 6 characters long"),
		password: yup
			.string()
			.required("Password required")
			.min(8, "Password must be at least 8 characters long"),
		passwordCheck: yup
			.string()
			.required("Check password required")
			.min(8, "Password must be at least 8 characters long")
			.oneOf([yup.ref("password"), "Passwords do not match"]),
	})
	.required();

const Register = () => {

	//message Text
	const[requestMessage, setRequestMessage] = useState('');

	//success or error on register
	const [success, setSuccess] = useState(false)
	
	//is loading state for register
	const [isLoading, setIsLoading] = useState(false);
	
	//did an error ocurred on register
	const [error, setError] = useState(false);
	
	//can the button register be clicked?
	const [canClick, setClick] = useState(true);
	
	//react hook forms
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
		mode: "onChange",
	});

	const submitFunction = async (data) => {
		setIsLoading(true);
		setClick(false);
		setError(false);
		setSuccess(false)
		setTimeout(async () => {
			try {
				const credentials = {
					username: data.username,
					password: data.password,
				};
				const query = await client.post("/user", credentials);
				setIsLoading(false);
				setClick(true);
				setSuccess(true)
				setRequestMessage('User created!')
			} catch (error) {
				setError(true);
				setIsLoading(false);
				setClick(true);
				setRequestMessage(error.response.data.error)
				console.log(error);
			}
		}, 5000);
	};

	return (
		<React.Fragment>
			<Wrapper>
				<Container>
					<Row>
						<FormContainer>
							<FormTitle>Register</FormTitle>
							<Form onSubmit={handleSubmit(submitFunction)}>
								<Input
									type="text"
									control={control}
									name="username"
									placeholder="username"
								/>
								<Message>{errors.username?.message}</Message>
								<Input
									type="password"
									control={control}
									name="password"
									placeholder="password"
								/>
								<Message>{errors.password?.message}</Message>
								<Input
									type="password"
									control={control}
									name="passwordCheck"
									placeholder="password check"
								/>
								<Message>
									{errors.passwordCheck?.message}
								</Message>
								<SubmitButton disabled={!(isValid && canClick)}>
									{isLoading ? (
										<Box>
											<CircularProgress size="1.5rem" />
										</Box>
									) : (
										"REGISTER"
									)}
								</SubmitButton>
							</Form>
							{error ? <Message>{requestMessage}</Message> : null}
							{success? <Message type="success">{requestMessage}</Message>:null}
							<Row>
								<Link to="/">Home</Link>
								<Link to="/">Forgot Password</Link>
							</Row>
						</FormContainer>
					</Row>
				</Container>
			</Wrapper>
		</React.Fragment>
	);
};

export default Register;
