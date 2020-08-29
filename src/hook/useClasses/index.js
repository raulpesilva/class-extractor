const useClasses = () => {
  const extractClass = (string) => {
    const re = /(?<=class=" | class=')(.*?)(?=">|"(?!2001)|'>|'(?!2001))/gi;
    const extractedClasses = string.match(re);
    return extractedClasses;
  };

  const generateBemSass = (classes) => {
    const mainClassList = Object.keys(classes);
    let string = '';
    const generateChildrenBemSass = (childrenList, parent) => {
      let string = '';

      childrenList.forEach((item) => {
        const modifier = parent ? Object.keys(classes[parent][item]) : [];

        string += `
  &${item}{
    ${modifier.reduce((acc, item) => {
      return (acc += `
    &${item}{
      
    }
`);
    }, '')}
  }
`;
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
      const [first, children] = item.split('__');
      const [trueFirst, modifier] = first.split('--');
      const sub = children?.split('--');
      if (modifier) composed[trueFirst] = { ...composed[trueFirst], [`--${modifier}`]: {} };
      sub?.length > 0
        ? sub.reduce((oldClass, classe, index) => {
            if (index) {
              composed[trueFirst][oldClass] = {
                ...composed[trueFirst][oldClass],
                [`--${classe}`]: {},
              };
              return oldClass;
            }
            if (index === 0) {
              if (composed?.[trueFirst]?.[`__${classe}`]) {
                return `__${classe}`;
              } else {
                composed[trueFirst] = composed[trueFirst]
                  ? { ...composed[trueFirst], [`__${classe}`]: {} }
                  : { [`__${classe}`]: {} };
              }
              return `__${classe}`;
            }
            return oldClass;
          }, '')
        : (composed[trueFirst] = { ...composed[trueFirst] });
    });
    return composed;
  };

  return { extractClass, generateBemSass, composeBemMainClass };
};

export default useClasses;
