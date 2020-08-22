import styled from 'styled-components'

export const TextArea = styled.textarea`
    width: max(38vw, 38vh);
    height: max(38vw, 38vh);
    resize: none;
    border-radius: 8px; 
    background-color: #393939A1;
    outline: none;
    border: 1px solid #4C5963;
    color: #ffffff;
    padding: 15px;
    box-sizing: border-box;
    transition: 250ms;
    &:focus{
        /* border: 1px solid ; */
        background-color: #393939;
    }
`