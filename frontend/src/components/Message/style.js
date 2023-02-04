import styled, {css} from "styled-components";

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    margin: 10px 0;
`

export const StyledMessage = styled.p`
    font-size: 12px;
    ${(props) => props.type === 'success'? css`
        color: green;
    `:css`color: red`}
`