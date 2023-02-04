import React from "react";
import { IconContainer, InputContainer, StyledInput } from "./style";
import { Controller } from "react-hook-form";

const Input = ({ rightIcon, placeholder, type,control,name }) => {
	return (
		<React.Fragment>
			<InputContainer>
            <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => <StyledInput type={type} placeholder={placeholder} {...field}/>}
      />
				
				{rightIcon ? <IconContainer>{rightIcon}</IconContainer> : null}
			</InputContainer>
		</React.Fragment>
	);
};

export default Input;
