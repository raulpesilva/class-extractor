import React from "react";
import * as Styled from "./styles";

const Footer = () => {
  return (
    <Styled.Container>
      <Styled.Copyright>
        ClassExtractor was created by{" "}
        <Styled.Link href="https://www.linkedin.com/in/raulpesilva/">Raul Pereira</Styled.Link> and{" "}
        <Styled.Link href="https://www.linkedin.com/in/marcos-henrique-57a162188/">
          Marcos Maia
        </Styled.Link>
        .
      </Styled.Copyright>
    </Styled.Container>
  );
};

export default Footer;
