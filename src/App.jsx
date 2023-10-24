import { useContext, useEffect, useRef, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

import HeaderContext from './contexts/HeaderContext';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
import PdfExport from './components/PdfExport';

import LeftAndRight from './components/LeftAndRight';
import Accordion from './components/Accordion';
import MediaQuery from './components/MediaQuery';
// import Modal from './components/Modal';
import Pix from './components/Pix';
import PixLandscape from './components/PixLandscape';
import NavBar from './components/NavBar';
// import Numeros from './components/NumerosAltura';
import NumerosAltura from './components/NumerosAltura';
import NumerosLargura from './components/NumerosLargura';
import SelectBoader from './components/forms/SelectBorder';
import SelectHeader from './components/forms/SelectHeader';
import SelectQtdPagina from './components/forms/SelectQtdPagina';
import CirculoMinus from './components/Svgs/CirculoMinus';
import Download from './components/Svgs/Download';
import { AuthContext } from './contexts/AuthProvider/context';
import NavBarUserMobil from './components/NavBarUserMobil';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

const input = `p-3 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 cursor-pointer`;
const buttonSuccess = `py-2 w-full bg-transparent transition duration-500 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded items-center`;
const buttonPrimary = `w-full bg-transparent transition duration-500 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded items-center`;
const buttonInfo = `w-full border border-teal-500 bg-transparent text-teal-500 rounded font-semibold px-4 py-2 transition duration-500  hover:bg-teal-600 hover:text-white  focus:shadow-outline `;
const labelPro = `block text-gray-500 font-bold md:text-left mb-1 p-1 `;

function App() {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const [orientation, setOrientation] = useState('portrait');
  const [pageWidth, setPageWidth] = useState('60%');

  const [imagemWidth, setImagemWidth] = useState(28);
  const [imageHeight, setImageHeight] = useState(19);

  const [especificoTamanho, setEspecificoTamanho] = useState(false);
  const [especificoWidth, setEspecificoWidth] = useState(19.5);
  const [especificoHeight, setEspecificoHeight] = useState(28.2);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileTwo, setImageFileTwo] = useState(null);
  const [qtdImageFileTwo, setQtdImageFileTwo] = useState(1);

  const [imageQtd, setImageQtd] = useState(2);
  const [header, setHeader] = useState(true);
  const [border, setBorder] = useState(0);

  const [inputEscola, setInputEscola] = useState('Escola XXXXX');
  const [inputProfessor, setInputProfessor] = useState('Professor(a): XXXX');
  const [inputAluno, setInputAluno] = useState('Aluno: ');
  const [inputTurma, setInputTurma] = useState('Turma: XXXXXX ');
  const [inputData, setInputData] = useState('Data: ' + new Date().toLocaleDateString());
  const [inputTitulo, setInputTitulo] = useState('Título XXXXXX');

  // const [expanded, setExpanded] = useState(header);

  var compactHeader = false;

  const handleChangeImg = (e) => {
    setImageFile(null);
    setImageFile(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeImgTwo = (e) => {
    setImageFileTwo(null);
    setImageFileTwo(URL.createObjectURL(e.target.files[0]));
  };

  const qtdPageAndImage = (value) => {
    setImageQtd(value);
    value > 4 ? setHeader(false) : true;
  };

  const clearImageFileTwo = () => {
    const inputArquivo = document.querySelector('#imageFileTwo');
    inputArquivo != null ? (inputArquivo.value = '') : null;
    setImageFileTwo(null);
  };

  const clearImageFileOne = () => {
    const inputArquivo = document.querySelector('#imageFile');
    inputArquivo != null ? (inputArquivo.value = '') : null;
    setImageFile(null);
  };

  const handleQtdImagePage = () => {
    if (parseInt(imageQtd) == 1) {
      setQtdImageFileTwo(1);
      setImageFileTwo(null);
      clearImageFileTwo();
    } else if (parseInt(imageQtd) == 2 || parseInt(imageQtd) == 4) {
      if (qtdImageFileTwo != 2) {
        setQtdImageFileTwo(1);
        setImageFileTwo(null);
        clearImageFileTwo();
      }
    } else if (parseInt(imageQtd) > 4) {
      setQtdImageFileTwo(0);
      setImageFileTwo(null);
      clearImageFileTwo();
      setBorder(false);
    }
  };

  useEffect(() => {
    handleQtdImagePage();
    return;
  }, [parseInt(imageQtd)]);

  let width = '';

  const childMediaQuery = (media) => {
    width = media;

    if (orientation == 'landscape') {
      if (media == 'small') {
        setPageWidth('100%');
      } else {
        setPageWidth('90%');
      }
    } else if (orientation == 'portrait') {
      if (media == 'small') {
        setPageWidth('90%');
      } else {
        setPageWidth('60%');
      }
    }
  };

  const handleChange = (e) => {
    var orientation = e.target.value;
    setOrientation(orientation);

    if (orientation == 'landscape') {
      setEspecificoHeight(19.5);
      setEspecificoWidth(28.2);

      if (width == 'small') {
        setPageWidth('100%');
      } else {
        setPageWidth('80%');
      }
    } else if (orientation == 'portrait') {
      setEspecificoHeight(28.2);
      setEspecificoWidth(19.5);

      if (width == 'small') {
        setPageWidth('90%');
      } else {
        setPageWidth('60%');
      }
    }
  };

  const [openMenu, setOpenMenu] = useState(true);

  const handleMenu = () => {
    return setOpenMenu((prev) => !prev);
  };

  const handleBorder = (border) => {
    setBorder(border);
  };

  const handleHeader = () => {
    setHeader((prev) => !prev);
  };

  const escolaRef = useRef();
  const titleRef = useRef();

  const handleEscola = () => setInputEscola(escolaRef.current?.value);
  const handleTitle = () => setInputTitulo(titleRef.current?.value);

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // const [zoom, Setzoom] = useState(null);
  // window.onresize = () => {
  //   const z = Math.round(window.devicePixelRatio * 100);
  //   z > 200 ? Setzoom(z) : null;
  // };
  // console.log('zommAtual = ' + zoom);

  return (
    <div>
      {/* <div className=" bg-blue-700  sm:bg-yellow-300  md:bg-red-600 lg:bg-orange-400 xl:bg-green-600 h-6 m-4"></div> */}
      <div>
        <input
          className="w-full pb-1 cursor-pointer hidden"
          type="file"
          accept="image/*,png, jpeg, jpg"
          id="imageFile"
          onChange={handleChangeImg}
        />

        <input
          className="w-full pt-1 cursor-pointer hidden"
          type="file"
          accept="image/*,png, jpeg, jpg"
          id="imageFileTwo"
          onChange={handleChangeImgTwo}
        />
      </div>

      <NavBar handleMenu={handleMenu} />

      <div id="sm-menu" className="hidden sm:block xl:hidden p-3 bg-purple-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label className={labelPro} htmlFor="orientation">
              Orientação da Página
            </label>
            <select onChange={handleChange} className={input} id="orientation" value={orientation} autoFocus>
              <option value="landscape">Paisagem</option>
              <option value="portrait">Retrato</option>
            </select>
          </div>

          <div className="">
            <label className={labelPro}>Tamanho Específico de Imagem</label>
            <select onChange={() => setEspecificoTamanho((prev) => !prev)} className={input} value={especificoTamanho}>
              <option value={false}>Não</option>
              <option value={true}>Sim</option>
            </select>
          </div>

          <div
            className={`overflow-hidden transition-all duration-1000   ${
              especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
            }`}
          >
            <div>
              <label className={labelPro}>Altura da Imagem em cm</label>
              <select className={`pro-input`} value={especificoHeight} onChange={(e) => setEspecificoHeight(e.target.value)}>
                {orientation == 'portrait' ? <NumerosAltura /> : <NumerosLargura />}
              </select>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-1000   ${
              especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
            }`}
          >
            <div>
              <label className={labelPro}>Largura da Imagem em cm</label>
              <select className={`pro-input`} value={especificoWidth} onChange={(e) => setEspecificoWidth(e.target.value)}>
                {orientation !== 'portrait' ? <NumerosAltura /> : <NumerosLargura />}
              </select>
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-1000   ${
            !especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
          }`}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelPro} htmlFor="qtdPageAndImage">
                Quantidade de Páginas
              </label>
              <SelectQtdPagina imageQtd={imageQtd} qtdPageAndImage={qtdPageAndImage} cssInput={input} />
            </div>

            <div>
              <label className={[`${labelPro} `]} htmlFor="imageQtd">
                Qtd. de Imagens Diferentes
              </label>
              <select
                id="imageQtd"
                disabled={parseInt(imageQtd) == 1 || parseInt(imageQtd) > 4 ? true : false}
                value={qtdImageFileTwo}
                onChange={(e) => {
                  setQtdImageFileTwo(e.target.value);
                }}
                className={`${input} ${
                  parseInt(imageQtd) == 1 || parseInt(imageQtd) > 4 ? 'border-red-600 text-red-600 font-bold' : input
                } `}
              >
                <option value="0" disabled>
                  Use 2 ou 4 páginas!
                </option>
                <option value="1">Uma Imagem por Folha</option>
                <option value="2">Duas Imagens por Folha</option>
              </select>
            </div>

            <div>
              <label className={labelPro}>Opões de Borda</label>
              <SelectBoader imageQtd={imageQtd} border={border} cssInput={input} handleBorder={handleBorder} />
            </div>

            <div>
              <label className={labelPro}>Opções do Cabeçalho</label>
              <SelectHeader imageQtd={imageQtd} value={header} cssInput={input} handleHeader={handleHeader} />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen md:flex">
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all[max-height] duration-1000 ease-linear ${
            openMenu ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
          }`}
        >
          {sessionStorage.getItem('name') != null ? <NavBarUserMobil /> : null}

          <div className="sm:hidden flex-1 md:max-w-xs p-3 bg-purple-100">
            <div>
              <label className={labelPro} htmlFor="orientation">
                Orientação da Página
              </label>
              <select onChange={handleChange} className={input} id="orientation" value={orientation} autoFocus>
                <option value="landscape">Paisagem</option>
                <option value="portrait">Retrato</option>
              </select>
            </div>

            <div>
              <label className={labelPro}>Tamanho Específico de Imagem</label>
              <select onChange={() => setEspecificoTamanho((prev) => !prev)} className={input} value={especificoTamanho}>
                <option value={false}>Não</option>
                <option value={true}>Sim</option>
              </select>
            </div>

            <div
              className={`overflow-hidden transition-all duration-1000   ${
                especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
              }`}
            >
              <div>
                <label className={labelPro}>Altura da Imagem em cm</label>
                <select className={`pro-input`} value={especificoHeight} onChange={(e) => setEspecificoHeight(e.target.value)}>
                  {orientation == 'portrait' ? <NumerosAltura /> : <NumerosLargura />}
                </select>
              </div>

              <div>
                <label className={labelPro}>Largura da Imagem em cm</label>
                <select className={`pro-input`} value={especificoWidth} onChange={(e) => setEspecificoWidth(e.target.value)}>
                  {orientation !== 'portrait' ? <NumerosAltura /> : <NumerosLargura />}
                </select>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-1000   ${
                !especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
              }`}
            >
              <div>
                <label className={labelPro} htmlFor="qtdPageAndImage">
                  Quantidade de Páginas
                </label>
                <SelectQtdPagina imageQtd={imageQtd} qtdPageAndImage={qtdPageAndImage} cssInput={input} />
              </div>

              <div>
                <label className={[`${labelPro} `]} htmlFor="imageQtd">
                  Qtd. de Imagens Diferentes
                </label>
                <select
                  id="imageQtd"
                  disabled={parseInt(imageQtd) == 1 || parseInt(imageQtd) > 4 ? true : false}
                  value={qtdImageFileTwo}
                  onChange={(e) => {
                    setQtdImageFileTwo(e.target.value);
                  }}
                  className={`${input} ${
                    parseInt(imageQtd) == 1 || parseInt(imageQtd) > 4 ? 'border-red-600 text-red-600 font-bold' : input
                  } `}
                >
                  <option value="0" disabled>
                    Use 2 ou 4 páginas!
                  </option>
                  <option value="1">Uma Imagem por Folha</option>
                  <option value="2">Duas Imagens por Folha</option>
                </select>
              </div>

              <div>
                <label className={labelPro}>Opões de Borda</label>
                <SelectBoader imageQtd={imageQtd} border={border} cssInput={input} handleBorder={handleBorder} />
              </div>

              <div>
                <label className={labelPro}>Opções do Cabeçalho</label>
                <SelectHeader imageQtd={imageQtd} value={header} cssInput={input} handleHeader={handleHeader} />
              </div>
            </div>
          </div>
        </div>

        <div id="desktop-menu" className="hidden sm:hidden md:hidden lg:hidden  xl:block flex-1 md:max-w-xs p-3 bg-purple-100">
          <div>
            <label className={labelPro} htmlFor="orientation">
              Orientação da Página
            </label>
            <select onChange={handleChange} className={input} id="orientation" value={orientation} autoFocus>
              <option value="landscape">Paisagem</option>
              <option value="portrait">Retrato</option>
            </select>
          </div>

          <div>
            <label className={labelPro}>Tamanho Esp. de Imagem</label>
            <select onChange={() => setEspecificoTamanho((prev) => !prev)} className={input} value={especificoTamanho}>
              <option value={false}>Não</option>
              <option value={true}>Sim</option>
            </select>

            <div
              className={`overflow-hidden transition-all duration-1000  ${
                especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-10 max-h-0 '
              }`}
            >
              <div>
                <label className={labelPro}>Altura da Imagem em cm</label>
                <select className={`pro-input`} value={especificoHeight} onChange={(e) => setEspecificoHeight(e.target.value)}>
                  {orientation == 'portrait' ? <NumerosAltura /> : <NumerosLargura />}
                </select>
              </div>

              <div>
                <label className={labelPro}>Largura da Imagem em cm</label>
                <select className={`pro-input`} value={especificoWidth} onChange={(e) => setEspecificoWidth(e.target.value)}>
                  {orientation !== 'portrait' ? <NumerosAltura /> : <NumerosLargura />}
                </select>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-1000 ${
              !especificoTamanho ? 'opacity-100 max-h-screen ' : 'opacity-50 max-h-0 '
            }`}
          >
            <div>
              <label className={labelPro} htmlFor="qtdPageAndImage">
                Quantidade de Páginas
              </label>
              <SelectQtdPagina imageQtd={imageQtd} qtdPageAndImage={qtdPageAndImage} cssInput={input} />
            </div>

            <div>
              <label className={[`${labelPro} `]} htmlFor="imageQtd">
                Qtd. de Imagens Diferentes
              </label>
              <select
                id="imageQtd"
                disabled={parseInt(imageQtd) == 1 || parseInt(imageQtd) > 4 ? true : false}
                value={qtdImageFileTwo}
                onChange={(e) => {
                  setQtdImageFileTwo(e.target.value);
                }}
                className={`${input} ${parseInt(imageQtd) == 1 || parseInt(imageQtd) > 4 ? 'border-red-600 text-red-600 font-bold' : input}

              `}
              >
                <option value="0" disabled>
                  Use 2 ou 4 páginas!
                </option>
                <option value="1">Uma Imagem por Folha</option>
                <option value="2">Duas Imagens por Folha</option>
              </select>
            </div>

            <div>
              <label className={labelPro}>Opões de Borda</label>
              <SelectBoader imageQtd={imageQtd} border={border} cssInput={input} handleBorder={handleBorder} />
            </div>

            <div>
              <label className={labelPro}>Opções do Cabeçalho</label>
              <SelectHeader imageQtd={imageQtd} value={header} cssInput={input} handleHeader={handleHeader} />
            </div>
          </div>
        </div>

        <div className="flex-1 font-bold">
          <MediaQuery childMediaQuery={childMediaQuery} />

          <Accordion expanded={header} bg={'bg-green-100'}>
            <div className="shadow-md rounded bg-white flex flex-col m-4">
              <div className="md:flex md:items-center mb-3">
                <div className="md:w-4/6">
                  <input
                    ref={escolaRef}
                    onKeyUp={debounce(handleEscola, 2000)}
                    className={`pro-input`}
                    name="ESCOLA"
                    type="text"
                    maxLength={orientation == 'landscape' ? '65' : '50'}
                    defaultValue={'Escola:XXXXX'}
                  />
                </div>
                <div className="w-5 mb-3 sm:m-0"></div>
                <div className="md:w-4/6">
                  <input
                    value={inputProfessor}
                    onChange={(e) => setInputProfessor(e.target.value)}
                    className={`pro-input`}
                    type="text"
                    maxLength={orientation == 'landscape' ? '65' : '50'}
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-3 ">
                <div className="md:w-4/6">
                  <input
                    value={inputTurma}
                    onChange={(e) => setInputTurma(e.target.value)}
                    className={`pro-input`}
                    type="text"
                    maxLength={'32'}
                  />
                </div>
                <div className="w-5 mb-3 sm:m-0"></div>
                <div className="md:w-4/6">
                  <input
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    type="text"
                    className={`${inputTurma != '' ? 'pro-input' : 'hidden'}`}
                  />
                </div>
              </div>

              <div className="md:flex md:items-center ">
                <div className={`${compactHeader ? 'hidden' : 'block'} md:w-4/6 pb-3`}>
                  <textarea
                    ref={titleRef}
                    style={{ resize: 'none' }}
                    className={`pro-input`}
                    defaultValue={'Título XXXXX'}
                    onKeyUp={debounce(handleTitle, 1000)}
                    rows={3}
                    cols={40}
                    maxLength={'140'}
                    wrap="soft"
                  />
                </div>
                <div className="w-5"></div>
                <div className="md:w-4/6">
                  <input value={inputAluno} onChange={(e) => setInputAluno(e.target.value)} type="text" className={`pro-input`} />
                </div>
              </div>
            </div>
          </Accordion>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 m-3">
            <div>
              {imageFile ? (
                <button onClick={clearImageFileOne} className={buttonPrimary} type="button">
                  <CirculoMinus />A Imagem 1
                </button>
              ) : null}
            </div>
            <div>
              {imageFileTwo ? (
                <button onClick={clearImageFileTwo} className={buttonInfo} type="button">
                  <CirculoMinus />A Imagem 2
                </button>
              ) : null}
            </div>

            {
              <div className="">
                <PDFDownloadLink
                  fileName="Atividades-por-Folha.pdf"
                  document={
                    <HeaderContext.Provider
                      value={{
                        inputEscola,
                        inputProfessor,
                        inputTurma,
                        inputData,
                        imageFile,
                        imageQtd,
                        inputTitulo,
                        header,
                        orientation,
                        imageFileTwo,
                        qtdImageFileTwo,
                        inputAluno,
                        border,
                        especificoTamanho,
                        especificoHeight,
                        especificoWidth,
                      }}
                    >
                      <PdfExport />
                    </HeaderContext.Provider>
                  }
                >
                  {/* {({ loading }) =>
                  loading ? (
                    <button>Loading Document...</button>
                  ) : (
                    <button className={inputButton}>Download PDF</button>
                  )
                } */}

                  {sessionStorage.getItem('name') == null ? (
                    <>
                      <button className={buttonSuccess} disabled={true}>
                        <Link to={'/login'}>
                          <Download texto="Faça o Login para Baixar!" />
                        </Link>
                      </button>
                    </>
                  ) : (
                    <button className={buttonSuccess}>
                      <Download texto="Download em PDF " />
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            }
          </div>

          <Pix />

          <HeaderContext.Provider
            value={{
              inputEscola,
              setInputEscola,
              inputProfessor,
              setInputProfessor,
              inputTurma,
              setInputTurma,
              inputData,
              setInputData,
              inputTitulo,
              setInputTitulo,
              header,
              setHeader,
              imageFileTwo,
              setImageFileTwo,
              qtdImageFileTwo,
              setQtdImageFileTwo,
              inputAluno,
              setInputAluno,
              border,
              especificoTamanho,
              especificoWidth,
              especificoHeight,
            }}
          >
            <div className="flex mb-3">
              <div className="flex-1">
                <div className="bg-blue-100 m-auto p-3" style={{ maxWidth: pageWidth }}>
                  <LeftAndRight headerOff={header} orientation={orientation} imageFile={imageFile} imageQtd={imageQtd} />

                  {/*  <PDFViewer
                    style={{
                      width: imagemWidth + 'cm',
                      height: imageHeight + 'cm',
                    }}
                    orientation={orientation}
                  >
                    <HeaderContext.Provider
                      value={{
                        inputEscola,
                        inputProfessor,
                        inputTurma,
                        inputData,
                        imageQtd,
                        imageFile,
                        imageFileTwo,
                        inputTitulo,
                        header,
                        orientation,
                        qtdImageFileTwo,
                        inputAluno,
                        border,
                        especificoTamanho,
                        especificoHeight,
                        especificoWidth,
                      }}
                    >
                      <PdfExport />
                    </HeaderContext.Provider>
                  </PDFViewer> */}
                </div>
              </div>

              <PixLandscape />
            </div>
          </HeaderContext.Provider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
