import React, { useRef, useState } from "react";
import TextArea from "../../components/shared/TextArea";
import * as Styled from "./styles";
// teste__teste1-teste2

const Bem = () => {
  const ref = useRef(null);
  const [output, setOutput] = useState("");

  const generateBemSass = (classes) => {
    const mainClassList = Object.keys(classes);
    let string = "";
    const generateChildrenBemSass = (childrenList, parent) => {
      let string = "";

      childrenList.forEach((item) => {
        const modifier = parent ? Object.keys(classes[parent][item]) : [];
        console.log("modifier:", modifier);

        string += `
  &${item}{
    ${modifier.reduce((acc, item) => {
              return (acc += `
    &${item}{

    }
`);
            }, "")}
  }`;
  });
      return string.trim();
    };

    mainClassList.forEach((item) => {
      string += `
.${item}{

  ${generateChildrenBemSass(Object.keys(classes[item]), item)}

}
`;
    });

    return string.trim();
  };

  const composeBemMainClass = (list) => {
    const composed = {};

    list.forEach((item) => {
      const [first, children] = item.split("__");
      const sub = children?.split("--");
      sub?.length > 0 &&
        sub.reduce((oldClass, classe, index) => {
          if (index) {
            composed[first][oldClass] = { ...composed[first][oldClass], [`--${classe}`]: {} };
            return oldClass;
          }
          if (index === 0) {
            if (composed?.[first]?.[`__${classe}`]) {
              return oldClass;
            } else {
              composed[first] = composed[first]
                ? { ...composed[first], [`__${classe}`]: {} }
                : { [`__${classe}`]: {} };
            }
            return `__${classe}`;
          }
        }, "");
    });
    return composed;
  };

  const extractClass = (element) => {
    const elementList = [...element.querySelectorAll("*")];
    const elementClassList = elementList.reduce((acc, item) => {
      return [...acc, ...item.classList];
    }, []);
    return elementClassList;
  };

  const handleChange = ({ target }) => {
    const element = ref?.current ?? null;
    const htmlText = target.value;
    element.innerHTML = htmlText;
    const extracteClass = extractClass(element);
    const composedBem = composeBemMainClass(extracteClass);

    setOutput(generateBemSass(composedBem).trim());

    console.log("handleChange", composedBem);
  };

  return (
    <Styled.Container>
      <Styled.FieldWrapper>
        <TextArea placeholder="Input" onChange={handleChange}></TextArea>
      </Styled.FieldWrapper>
      <Styled.FieldWrapper>
        <TextArea placeholder="Output" value={output}></TextArea>
      </Styled.FieldWrapper>
      <div ref={ref} style={{ display: "none" }}></div>
    </Styled.Container>
  );
};

export default Bem;
