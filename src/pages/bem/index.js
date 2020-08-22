import React, { useState, useRef } from "react";
import TextArea from "../../components/shared/TextArea";
import * as Styled from "./styles";

const Bem = () => {
  const ref = useRef(null);

  const composeBem = (list) => {
    
  }
  
  const extractClass = element => {
    const elementList = [...element.querySelectorAll('*')]; 
    const elementClassList = elementList.reduce((acc, item) => {
      return [...acc, ...item.classList ]
    }, []) 
    return elementClassList;
  }
  
  const handleChange = ({ target }) => {
    const element = ref?.current ?? null;
    const htmlText = target.value;
    element.innerHTML = htmlText;
    const extracteClass = extractClass(element);
    const composedBem = composeBem(extracteClass);

    console.log(composedBem);
  } 

  return (
    <Styled.Container>
      <Styled.FieldWrapper>
        <TextArea placeholder='Input' onChange={handleChange}></TextArea>
      </Styled.FieldWrapper>
      <Styled.FieldWrapper>
        <TextArea placeholder='Output'></TextArea>
      </Styled.FieldWrapper>
      <div ref={ref}></div>
    </Styled.Container>
  );
};

export default Bem;
