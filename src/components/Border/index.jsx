import lapisHeader from '../../img/lapisHeader.png';
import lapisPortrait from '../../img/lapisPortrait.png';
import lapisLandscape from '../../img/lapisLandscape.png';

import coracaoHeader from '../../img/coracaoHeader.png';
import coracaoPortrait from '../../img/coracaoPortrait.png';
import coracaoLandscape from '../../img/coracaoLandscape.png';

import coracaoHeaderVazado from '../../img/coracaoHeaderVazado.png';
import coracaoPortraitVazado from '../../img/coracaoPortraitVazado.png';
import coracaoPortraitVazadoMenor from '../../img/coracaoPortraitVazadoMenor.png';
import coracaoLandscapeVazado from '../../img/coracaoLandscapeVazado.png';

import baloesHeader from '../../img/baloesHeader.png';
import baloesPortrait from '../../img/baloesPortrait.png';
import baloesLandscap from '../../img/baloesLandscap.png';

import baloesHeaderVazado from '../../img/baloesHeaderVazado.png';
import baloesPortraitVazado from '../../img/baloesPortraitVazado.png';
import baloesLandscapVazado from '../../img/baloesLandscapVazado.png';

import milhosHeader from '../../img/milhosHeader.png';
import milhosPortrait from '../../img/milhosPortrait.png';
import milhosLandscap from '../../img/milhosLandscap.png';

import fogueiraHeader from '../../img/fogueiraHeader.png';
import fogueiraPortrait from '../../img/fogueiraPortrait.png';
import fogueiraPortraitForPageSmall from '../../img/fogueiraPortraitForPageSmall.png';
import fogueiraLandscap from '../../img/fogueiraLandscap.png';
import fogueiraLandscapForPageSmall from '../../img/fogueiraLandscapForPageSmall.png';

import bbBaloesHeader from '../../img/bbBaloesHeader.png';
import bbBaloesPortrait from '../../img/bbBaloesPortrait.png';
import bbfogueiraLandscap from '../../img/bbfogueiraLandscap.png';
import bbfogueiraLandscapForPageSmall from '../../img/bbfogueiraLandscapForPageSmall.png';

const Border = ({
  border,
  size,
  css,
  h = '',
  qtd,
  qtdImageFileTwo,
  right,
  orientation,
  top,
}) => {
  var tipoLandscape = null;
  if (top == 'top') {
    tipoLandscape = baloesLandscap;
  } else {
    tipoLandscape =
      orientation != 'portrait'
        ? bbfogueiraLandscapForPageSmall
        : bbfogueiraLandscap;
  }

  const borders = [
    {
      name: 'aquarela_de_lapis',
      header: lapisHeader,
      portrait: lapisPortrait,
      landscape: lapisLandscape,
    },
    {
      name: 'coracaoPortrait',
      header: coracaoHeader,
      portrait: coracaoPortrait,
      landscape: coracaoLandscape,
    },
    {
      name: 'coracao_portrait_vazado',
      header: coracaoHeaderVazado,
      portrait:
        qtd > 2 || qtdImageFileTwo > 1
          ? coracaoPortraitVazadoMenor
          : coracaoPortraitVazado,
      landscape: coracaoLandscapeVazado,
    },
    {
      name: 'baloes_coloridos',
      header: baloesHeader,
      portrait: baloesPortrait,
      landscape: qtd > 2 ? coracaoPortraitVazadoMenor : baloesLandscap,
    },
    {
      name: 'baloes_coloridos_vazados',
      header: baloesHeaderVazado,
      portrait: baloesPortraitVazado,
      landscape: baloesLandscapVazado,
    },
    {
      name: 'milhos_fofos',
      header: milhosHeader,
      portrait: milhosPortrait,
      landscape: milhosLandscap,
    },

    {
      name: 'fogueira',
      header: fogueiraHeader,
      portrait:
        qtd > 2 && orientation != 'portrait'
          ? fogueiraPortraitForPageSmall
          : fogueiraPortrait,
      landscape:
        orientation != 'portrait'
          ? fogueiraLandscapForPageSmall
          : fogueiraLandscap,
    },

    {
      name: 'bandeira_baloes_fogueira',
      header: bbBaloesHeader,
      portrait: bbBaloesPortrait,
      landscape: tipoLandscape,
    },
  ];

  const foundBorder = borders.find((b) => b.name == border);

  return (
    <div
      id={qtd}
      className={`${right ? '-scale-x-100' : null} ${
        size == 'portrait' ? 'h-full' : size == 'header' ? 'h-full' : null
      } `}
    >
      <img className={css} src={foundBorder[size]} />
    </div>
  );
};

export default Border;
