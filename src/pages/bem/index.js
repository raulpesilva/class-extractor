import React, { useRef, useState } from 'react';
import TextArea from '../../components/shared/TextArea';
import * as Styled from './styles';
import useSass from '../../hook/useSass';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../../components/shared/Button';
import Footer from '../../components/footer';
import Header from '../../components/header';

const Bem = () => {
  const ref = useRef(null);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const { extractClass, generateBemSass, composeBemMainClass } = useSass();

  const handleChange = ({ target }) => {
    const extractedClasses = extractClass(target.value) ?? [];
    const composedBem = composeBemMainClass(extractedClasses);

    setOutput(generateBemSass(composedBem).trim());
  };

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
    <Header></Header>
      <Styled.Container>
        <Styled.FieldWrapper>
         <Styled.ButtonWrapper>
          <Button>html</Button>
         </Styled.ButtonWrapper>
          <TextArea placeholder="Input" onChange={handleChange}></TextArea>
        </Styled.FieldWrapper>
        <Styled.FieldWrapper>
        <Styled.ButtonWrapper>
          <Button>Sass - bem</Button>
         </Styled.ButtonWrapper>
          <CopyToClipboard text={output} onCopy={handleCopy}>
            <Styled.CopyButton copied={copied ? true : undefined} />
          </CopyToClipboard>
          <Styled.Colorizer>{output}</Styled.Colorizer>
        </Styled.FieldWrapper>
        <div ref={ref} style={{ display: 'none' }}></div>
      </Styled.Container>
      <Footer></Footer>
    </>
  );
};

export default Bem;
