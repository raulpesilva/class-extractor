import React, { useRef, useState } from "react";
import TextArea from "../../components/shared/TextArea";
import * as Styled from "./styles";
import useClasses from "../../hook/useClasses";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Bem = () => {
  const ref = useRef(null);
  const [output, setOutput] = useState("");
  const [ copied, setCopied ] = useState(false);
  const { extractClass, generateBemSass, composeBemMainClass } = useClasses();

  const handleChange = ({ target }) => {
    const element = ref?.current ?? null;
    const htmlText = target.value;
    element.innerHTML = htmlText;
    const extracteClass = extractClass(element);
    const composedBem = composeBemMainClass(extracteClass);

    setOutput(generateBemSass(composedBem).trim());
  };

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <>
      <Styled.Container>
        <Styled.FieldWrapper>
          <TextArea placeholder="Input" onChange={handleChange}></TextArea>
        </Styled.FieldWrapper>
        <Styled.FieldWrapper>
          <CopyToClipboard text={output} onCopy={handleCopy}>
            <Styled.CopyButton copied={copied}/>
          </CopyToClipboard>
          <Styled.Colorizer>{output}</Styled.Colorizer>
        </Styled.FieldWrapper>
        <div ref={ref} style={{ display: "none" }}></div>
      </Styled.Container>
    </>
  );
};

export default Bem;
