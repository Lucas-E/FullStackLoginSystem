import styled, {css} from "styled-components";

export const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: #badcdd;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-around;
	align-items: center;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
    padding: 10px;
`;
export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 100%;

	background-color: #f3dadd;

	padding: 1rem;
`;
export const FormTitle = styled.div`
	width: 100%;
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 5px;
`;

export const SubmitButton = styled.button`
	padding: 10px;
	font-size: 1.2rem;
	background-color: #e9c8b2;
	border-radius: 0;
	width: 100%;
	color: #00000070;
	outline: none;
	border: none;

	&:hover {
		background-color: #d1b19d;
	}
	&:active {
		background-color: #b09584;
		border: none;
		outline: none;
	}
	&:focus {
		outline: none;
		border: none;
	}
	${(props) =>
		props.disabled &&
		css`
			background-color: lightgrey;
			cursor: default;
			&:hover {
				background-color: lightgrey;
			}
			&:active {
				background-color: lightgrey;
				border: none;
				outline: none;
			}
			&:focus {
				outline: none;
				border: none;
			}
		`}
`;

export const ErrorMessage = styled.p`
	color: red;
	font-size: 12px;
	margin: 5px 0 10px 0;
`;
