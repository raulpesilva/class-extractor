import styled from 'styled-components'

export const TextArea = styled.textarea`
    width: max(33vw, 33vh);
    height: max(33vw, 33vh);
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
        background-color: #393939;
    }
`