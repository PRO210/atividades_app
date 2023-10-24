import { useContext, useState } from 'react';
import Header from '../Header';
import HeaderR from '../HeaderR';
import HeaderContext from '../../contexts/HeaderContext';

import Border from '../Border';

const divImage = ` flex justify-center text-center border-2 border-dashed border-purple-300 items-center w-full `;

const LeftAndRight = ({ headerOff, orientation, imageFile, imageQtd }) => {
  const {
    imageFileTwo,
    qtdImageFileTwo,
    setHeader,
    border,
    especificoTamanho,
    especificoWidth,
    especificoHeight,
  } = useContext(HeaderContext);

  let qtd = parseInt(imageQtd);
  let images = [];
  let imagesTwo = [];
  let imagesEsp = [];
  let divHeight = '';
  let divWidth = '';
  let aspect = '';
  let qtdAltura = '';
  let qtdLargura = '';

  // window.onload = () => {
  //   let divImg = document.getElementById('dois_img').getBoundingClientRect();
  //   console.log('largura: ' + Math.round(divImg.width), 'altura: ' + Math.round(divImg.height));
  // };

  // const [zoom, Setzoom] = useState(null);
  // window.onresize = () => {
  //   const z = Math.round(window.devicePixelRatio * 100);
  //   z > 200 ? Setzoom(z) : null;
  //   console.log('zommAtual = ' + zoom);
  // };

  // const borders = [{ aquarela_de_lapis: lapisPortrait }, { coracaoPortrait: coracaoPortrait }];
  // function getBorders(collection, key) {
  //   var value;
  //   collection.map(function (item) {
  //     // if (key in item) value = item[key];
  //     if (key in item) value = item;
  //   });
  //   return value;
  // }
  // console.log(getBorders(borders, border));

  function isRetratoOrPaisagem() {
    if (orientation == 'landscape') {
      if (qtd == 1) {
        divHeight = '';
        divWidth = '100%';
        aspect = '16/9';
      } else if (qtd == 2) {
        divHeight = '';
        divWidth = '50%';
        aspect = '9/16';
      } else if (qtd == 4) {
        divWidth = '50%';
        aspect = '16/9';
      }
    } else {
      if (qtd == 1) {
        divHeight = '';
        divWidth = '100%';
        aspect = '9/16';
      } else if (qtd == 2) {
        divHeight = '';
        divWidth = '50%';
        aspect = '9/16';
      } else if (qtd == 4) {
        divWidth = '50%';
        headerOff == true
          ? (aspect = '1/1')
          : ((aspect = '9/16'), (divHeight = '85%'));
      }
    }
  }

  function notHeader() {
    if (!isNaN(imageQtd)) {
      if (qtd == 1) {
        divHeight = '';
        divWidth = '100%';
        aspect = '9/16';
      } else if (qtd == 2) {
        divHeight = '';
        divWidth = '50%';
        aspect = '9/16';
      } else if (qtd == 4) {
        divHeight = '';
        divWidth = '50%';
        orientation == 'landscape' ? (aspect = '16/9') : (aspect = '9/16');
      } else if (qtd == 6) {
        divHeight = '';
        divWidth = '50%';
        orientation == 'landscape' ? (aspect = '16/9') : (aspect = '1/1');
      } else if (qtd == 8) {
        divHeight = '';
        divWidth = '50%';
        aspect = '16/9';
      } else if (qtd == 10) {
        divHeight = '';
        divWidth = '50%';
        aspect = '16/9';
      } else if (qtd == 12) {
        divHeight = '';
        divWidth = '50%';
        aspect = '16/9';
      }
    } else {
      if (qtd == 6) {
        divHeight = '';
        divWidth = '33.33%';
        orientation == 'portrait' ? (aspect = '16/9') : (aspect = '1/1');
        aspect = '9/16';
      } else if (qtd == 8) {
        divHeight = '';
        divWidth = '25%';
        orientation == 'portrait' ? (aspect = '9/16') : (aspect = '1/1');
        aspect = '9/16';
      } else if (qtd == 10) {
        divHeight = '';
        divWidth = '20%';
        aspect = '9/16';
      } else if (qtd == 12 && imageQtd.length == 3) {
        divHeight = '';
        divWidth = '16.66%';
        aspect = '9/16';
      } else if (qtd == 12 && imageQtd.length == 4) {
        divHeight = '';
        divWidth = '25%';
        orientation == 'portrait' ? (aspect = '9/16') : (aspect = '1/1');
      }
    }
  }

  const handleOffHeader = () => {
    setHeader(false);
  };

  function espTamImg() {
    if (orientation == 'portrait') {
      /* 28.2 altura e 19.5 largura */
      divHeight = (especificoHeight * 100) / 28.2 + '%';
      divWidth = (especificoWidth * 100) / 19.5 + '%';
      aspect = '';
      // console.log(' Altura  :' + divHeight + ' Largura  : ' + divWidth);
      qtdAltura = Math.floor(28.2 / especificoHeight);
      qtdLargura = Math.floor(19.5 / especificoWidth);
      qtd = qtdAltura * qtdLargura;

      aspect = 1 / 1;
    } else {
      /* 19.5 altura e 28.2 largura */
      divHeight = (especificoHeight * 100) / 19.5 + '%';
      divWidth = (especificoWidth * 100) / 28.2 + '%';

      qtdAltura = Math.floor(28.2 / especificoWidth);
      qtdLargura = Math.floor(19.5 / especificoHeight);
      qtd = qtdAltura * qtdLargura;

      aspect = '';
    }
  }

  if (especificoTamanho == false) {
    if (headerOff == true && qtd < 6) {
      isRetratoOrPaisagem();
    } else {
      handleOffHeader();
      notHeader();
    }
  } else {
    handleOffHeader();
    espTamImg();
  }

  if (especificoTamanho == false) {
    qtdImageFileTwo == 2 && (qtd == 2 || 4) ? (qtd = qtd / 2) : (qtd = qtd);

    for (let i = 0; i < qtd; i++) {
      images.push(
        <div
          id="one_img"
          key={i}
          style={{
            width: divWidth,
            // height: divHeight,
            margin: 'auto',
          }}
        >
          {orientation == 'landscape' && headerOff ? (
            <Header orientation={orientation} />
          ) : null}
          {orientation == 'portrait' && headerOff ? (
            <HeaderR orientation={orientation} />
          ) : null}

          {border != 0 && headerOff == false ? (
            <Border
              border={border}
              size="landscape"
              orientation={orientation}
              css="w-full h-4"
              top="top"
            />
          ) : null}

          <div id="dois_img" style={{ display: 'flex', aspectRatio: aspect }}>
            <div>
              {border != 0 ? (
                <Border
                  h="100%"
                  border={border}
                  size="portrait"
                  orientation={orientation}
                  css={'h-full w-4'}
                  qtd={qtd}
                  qtdImageFileTwo={qtdImageFileTwo}
                />
              ) : null}
            </div>

            <div className={`${divImage}  `} >
              {imageFile ? (
                <img className="h-full w-full" src={imageFile} />
              ) : (
                <label
                  htmlFor="imageFile"
                  className="m-auto cursor-pointer text-xs sm:text-base font-bold w-full"
                >
                  Escolha a Primeira Imagem :)
                </label>
              )}
            </div>

            <div className="-scale-x-100">
              {border != 0 ? (
                <Border
                  h="100%"
                  border={border}
                  size="portrait"
                  orientation={orientation}
                  css="h-full w-4"
                  qtd={qtd}
                  qtdImageFileTwo={qtdImageFileTwo}
                />
              ) : null}
            </div>
          </div>

          {border != 0 ? (
            <Border
              border={border}
              orientation={orientation}
              size="landscape"
              css="w-full h-4"
            />
          ) : null}
        </div>
      );
    }

    if (qtdImageFileTwo == 2 && (qtd == 2 || 4)) {
      for (let i = 0; i < qtd; i++) {
        imagesTwo.push(
          <div
            key={i}
            style={{
              width: divWidth,
              height: divHeight,
            }}
          >
            {orientation == 'landscape' && headerOff ? (
              <Header orientation={orientation} />
            ) : null}
            {orientation == 'portrait' && headerOff ? (
              <HeaderR orientation={orientation} />
            ) : null}

            {border != 0 && headerOff == false ? (
              <Border
                border={border}
                size="landscape"
                orientation={orientation}
                css="w-full h-4"
                top="top"
              />
            ) : null}

            <div
              id="dois_img2"
              style={{ display: 'flex', aspectRatio: aspect }}
            >
              <div>
                {border != 0 ? (
                  <Border
                    h="100%"
                    border={border}
                    size="portrait"
                    orientation={orientation}
                    css="h-full w-4"
                    qtd={qtd}
                    qtdImageFileTwo={qtdImageFileTwo}
                  />
                ) : null}
              </div>

              <div className={`${divImage}`}>
                {imageFileTwo ? (
                  <img className="h-full w-full" src={imageFileTwo} />
                ) : (
                  <label
                    htmlFor="imageFileTwo"
                    className="m-auto cursor-pointer text-xs sm:text-base font-bold w-full"
                  >
                    Escolha a Segunda Imagem :)
                  </label>
                )}
              </div>

              <div className="-scale-x-100">
                {border != 0 ? (
                  <Border
                    h="100%"
                    border={border}
                    size="portrait"
                    orientation={orientation}
                    css="h-full w-4"
                    qtd={qtd}
                    qtdImageFileTwo={qtdImageFileTwo}
                  />
                ) : null}
              </div>
            </div>

            {border != 0 ? (
              <Border
                border={border}
                size="landscape"
                orientation={orientation}
                css="w-full h-4"
              />
            ) : null}
          </div>
        );
      }
    }
  } else {
    for (let i = 0; i < qtd; i++) {
      imagesEsp.push(
        <div
          id="one_img"
          key={i}
          style={{
            width: divWidth,
            // height: divHeight,
            margin: 'auto',
            aspectRatio: aspect,
          }}
        >
          <div id="dois_img" style={{ display: 'flex', aspectRatio: aspect }}>
            <div className={`${divImage}  relative`}>
              {/* <div className="text-lg absolute  ">Aqui {nomes[i]}</div> */}
              {imageFile ? (
                <img className="h-full w-full" src={imageFile} />
              ) : (
                <label
                  htmlFor="imageFile"
                  className="m-auto cursor-pointer text-xs sm:text-base font-bold w-full"
                >
                  Escolha a Primeira Imagem :)
                </label>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images}
      {imagesTwo}
      {imagesEsp}
    </div>
  );
};

export default LeftAndRight;
