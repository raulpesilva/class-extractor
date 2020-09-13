import React from "react";
import * as Styled from "./styles";

const Header = () => {
  return (
    <Styled.Container>
      <Styled.Logo>ClassExtractor</Styled.Logo>
      <Styled.SubTitle>Extract classes from HTML</Styled.SubTitle>
    </Styled.Container>
  );
};

export default Header;
