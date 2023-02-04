import styled from "styled-components";

export const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	width: 100%;
`;

export const StyledInput = styled.input`
	background-color: transparent;
	padding: 5px;
	width: 90%;
	border: 0;
	border-bottom: 2px solid #cecece;
	color: #00000070;
	outline: none;
	height: 100%;
    font-size: 1.2rem;
    font-weight: lighter;
`;
export const IconContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 10px;
	height: 100%;
    width: 10%;
    font-size: 1.4rem;
`;
