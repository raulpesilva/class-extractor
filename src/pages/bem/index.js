import React, { useRef } from 'react';
import TextArea from '../../components/shared/TextArea';
import * as Styled from './styles';
// teste__teste1-teste2
const teste = `<main>
<!-- Estrutura Breadcrumb -->

<article class="container-center bread">
  <nav class="bread__nav">
    <vtex.cmc:breadCrumb />
  </nav>
</article>

<article class="container-center product-geral">
  <!-- Estrutura para imagem do product -->

  <section class="product-left">
    <ul class="product-left__thumbs"></ul>
    <div class="product-left__img"></div>
  </section>

  <!-- Estrutura para as principais informações do produto -->

  <section class="product-right">
    <div class="product-right__seal"></div>

    <h3 class="product-right__title">
      <vtex.cmc:productName />
    </h3>

    <div class="product-right__codigo">
      Cód:
      <vtex.cmc:skuReference />
    </div>

    <p class="product-right__curta-descricao">
      <vtex.cmc:productDescriptionShort />
    </p>

    <div class="product-right__price">
      <vtex.cmc:skuPrice />
      <div class="product-right__installment-show">
        <span>Ver opções de parcelamento</span>
        <div class='product-right__modal-installment'>
          <span class='product-right__modal-installment--close'>x</span>
          <vtex.cmc:OtherPaymentMethod />
        </div>
      </div>
    </div>

    <div class="product-right__default-buy-button">
      <vtex.cmc:BuyButton />
    </div>

    <div class="product-right__wrapper-buy-button">
      <a class="product-right__buy-button">
        <vtex.cmc:SVGBag />
        Adicionar à sacola
      </a>

      <div class="product-right__special-price">
        <span class="product-right__special-price-text">
          Preço especial para salão
        </span>
        <a class="product-right__special-price-link" href="#">Saiba mais</a>
      </div>
    </div>

    <div class="freight">
      <label class="freight-title">Calcular frete e prazo</label>
      <div class="freight-wrapper-bottom">
        <div class="freight-field">
          <img src="/arquivos/truck.png" />
          <input class="freight-field--input" placeholder="Digite seu CEP" />
          <button class="freight-field--button">Calcular</button>
        </div>
        <a
          class="freight__donotknow"
          href="http/www.buscacep.correios.com.br/sistemas/buscacep/"
          >Não sei meu CEP</a
        >
      </div>
    </div>
  </section>
</article>
<!-- Estrutura de compre junto -->

<article class="details-prod container-center">
  <section class="details-prod__descriptions">
      <div class='details-prod__box-title'>
          <h4 class='details-prod__title details-prod__title--description' data-ref=".productDescription">Descrição do produto</h4>
          <h4 class='details-prod__title details-prod__title--use' data-ref=".value-field.Modo-de-Uso">Modo de uso</h4>
          <h4 class='details-prod__title details-prod__title--benefits' data-ref=".value-field.Beneficios-e-Indicacao">Benefícios e indicação</h4>
          <h4 class='details-prod__title details-prod__title--comnposition' data-ref=".value-field.Composicao">Composição</h4>
      </div>
  </section>

  <div class='details-prod__text'></div>

  <section class="details-prod__specifications" style='display: none'>
    <vtex.cmcroductDescription />
    <vtex.cmc:productSpecification />
  </section>
</article>

<article class="compreJunto container-center">
  <section class="compreJunto__box">
    <h2 class="compreJunto__titulo title">Aproveite e Compre Junto</h2>
  </section>

  <div class="compreJunto__main container-center">
    <div class="compreJunto__itemA"></div>

    <div class="compreJunto__plus">
      +
    </div>

    <div class="compreJunto__itemB"></div>

    <div class="compreJunto__equal">
      =
    </div>

    <div class="compreJunto__buy-wrapper"></div>
  </div>

  <div class="compreJunto__produtos-wrapper container-center">
    <div class="compreJunto__produto-compreJunto">
      <vtex.cmc:BuyTogether />
    </div>
  </div>
</article>

  <article class='container-center'>
      <vtex:contentPlaceHolder id="prateleira01" />
  </article>

  <article class='container-center'>
      <vtex:contentPlaceHolder id="prateleira02" />
  </article>
</main>`;

const Bem = () => {
  const ref = useRef(null);

  const composeBemMainClass = (list) => {
    const composed = {};

    list.forEach((item) => {
      const [first, children] = item.split('__');
      const sub = children?.split('--');
      sub?.length > 0 &&
        sub.reduce((oldClass, classe, index) => {
          if (index) {
            composed[first][oldClass] = { ...composed[first][oldClass], [`--${classe}`]: {} };
            return oldClass;
          }
          if (index === 0) {
            if (composed?.[first]?.[`__${classe}`]) {
            } else {
              composed[first] = composed[first]
                ? { ...composed[first], [`__${classe}`]: {} }
                : { [`__${classe}`]: {} };
            }
            return `__${classe}`;
          }
        }, '');
    });
    return composed;
  };

  const extractClass = (element) => {
    const elementList = [...element.querySelectorAll('*')];
    const elementClassList = elementList.reduce((acc, item) => {
      return [...acc, ...item.classList];
    }, []);
    return elementClassList;
  };

  const handleChange = ({ target }) => {
    const element = ref?.current ?? null;
    const htmlText = target.value;
    element.innerHTML = teste;
    const extracteClass = extractClass(element);
    const composedBem = composeBemMainClass(extracteClass);

    console.log('handleChange', composedBem);
  };

  return (
    <Styled.Container>
      <Styled.FieldWrapper>
        <TextArea placeholder="Input" onChange={handleChange}></TextArea>
      </Styled.FieldWrapper>
      <Styled.FieldWrapper>
        <TextArea placeholder="Output"></TextArea>
      </Styled.FieldWrapper>
      <div ref={ref} style={{ display: 'none' }}></div>
    </Styled.Container>
  );
};

export default Bem;
