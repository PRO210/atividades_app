import { useState } from 'react';
import logoCafeLandscape from '../../img/logoCafeLandscape.png';
import QrCode from '../../img/QrCode.jpeg';
import Spinner from '../Spinner';

const PixLandscape = () => {
  const [buttonText, setButtonText] = useState(false);
  const [buttonTextCp, setButtonTextCp] = useState(false);
  const [buttonTextLoad, setButtonTextLoad] = useState(false);

  function pixCpLandscape(value) {
    setButtonText(true);
    setButtonTextLoad(true);

    navigator.clipboard
      .writeText('43a6ac21-4e54-4e1b-ac39-1e2fd2b7c697')

      .then(() => {
        setTimeout(() => {
          setButtonTextLoad(false);
          setButtonTextCp(true);
        }, 3000);
      })
      .finally(() => {
        setTimeout(() => {
          setButtonTextLoad(false);
          setButtonTextCp(false);
          setButtonText(false);
        }, 6000);
      });
  }
  return (
    <div className="hidden lg:block">
      <div id="pixLandascpae" className="grid grid-flow-row  mx-3">
        <div>
          <button
            onClick={() => pixCpLandscape()}
            className={``}
            type="button"
            // value="43a6ac21-4e54-4e1b-ac39-1e2fd2b7c697"
          >
            <div className="aspect-square w-44">
              <img src={logoCafeLandscape} alt="Me Paga um Café?" />
            </div>

            {buttonText == false ? 'Copiar Chave Pix!' : null}

            {buttonTextLoad == true ? (
              <Spinner msgSpinner={'Copiando . . .'} />
            ) : null}
            {buttonTextCp == true ? 'Copiado :)' : null}
          </button>
        </div>

        <div className="aspect-square w-44 my-3">
          <img className="m-auto" src={QrCode} alt="Me Paga um Café?" />
        </div>
      </div>
    </div>
  );
};

export default PixLandscape;
