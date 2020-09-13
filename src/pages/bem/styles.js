import styled, { css } from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FiCopy } from 'react-icons/fi';

export const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;

export const FieldWrapper = styled.div`
  height: fit-content;
  position: relative;
`;

export const Colorizer = styled(SyntaxHighlighter).attrs({
  showLineNumbers: true,
  language: 'scss',
  style: dracula,
  customStyle: { marginTop: 0, backgroundColor: '#393939A1' },
})`
  width: max(33vw, 33vh);
  height: max(33vw, 33vh);
  resize: none;
  border-radius: 8px;
  outline: none;
  border: 1px solid #4c5963;
  box-sizing: border-box;
  transition: 250ms;
  position: relative;

  &:focus {
    background-color: #393939;
  }
`;

export const CopyButton = styled(FiCopy)`
  color: #f0f3f8;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 105px;
  right: 25px;
  z-index: 1;
  cursor: pointer;

  @keyframes copy {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

  ${({ copied }) =>
    !!copied &&
    css`
      color: green;
      animation: copy 400ms;
    `}
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 37px;
  display: flex;
`