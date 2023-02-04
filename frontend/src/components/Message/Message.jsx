import React from 'react'
import {MessageContainer,StyledMessage} from './style'
const Message = ({type, children}) => {
  return (
    <React.Fragment>
        <MessageContainer>
          <StyledMessage type={type? type:'danger'}>
            {children}
          </StyledMessage>
        </MessageContainer>
    </React.Fragment>
  )
}

export default Message