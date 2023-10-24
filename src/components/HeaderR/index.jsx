import '../../index.css';

import { useContext } from 'react';
import HeaderContext from '../../contexts/HeaderContext';

import Border from '../Border';

const inputHeader = `truncate w-full text-xs sm:text-sm md:text-base text-left leading-tight focus:bg-white border-b focus:border-purple-500`;

const Header = ({ orientation }) => {
  const {
    inputEscola,
    inputProfessor,
    inputTurma,
    inputData,
    inputTitulo,
    inputAluno,
    border,
    compactHeader,
  } = useContext(HeaderContext);

  return (
    <div style={{ width: '100%' }}>
      {border != 0 ? (
        <Border
          border={border}
          size="landscape"
          orientation={orientation}
          css="w-full h-4"
          top="top"
        />
      ) : null}

      <div className="flex">
        <div style={{ minWidth: '12px' }}>
          {border != 0 ? (
            <Border border={border} size="header" css="w-4 h-full" />
          ) : null}
        </div>

        <div className="w-full" style={{ minWidth: '83%' }}>
          <div className="flex ">
            <div className="w-full">
              <p className={`${inputHeader}`}>{inputEscola}</p>
            </div>
          </div>

          <div className="flex">
            <div className="w-full">
              <p className={inputHeader}>{inputProfessor}</p>
            </div>
          </div>

          <div className={`flex flex-nowrap`}>
            <div
              className={`${
                inputAluno != '' ? 'w-full border-b-2 border-black mr-2' : null
              }`}
            >
              <p className={`${inputHeader} `}>{inputAluno}</p>
            </div>
          </div>

          <div className={`${inputTurma != '' ? 'w-full' : 'hidden'}`}>
            <div className="flex ">
              <div className={`${inputTurma != '' ? 'w-full' : null}`}>
                <p className={inputHeader}>{inputTurma}</p>
              </div>
            </div>

            <div className="flex">
              <div className={`${inputData != '' ? 'w-full' : null}`}>
                <p className={inputHeader}>{inputData} </p>
              </div>
            </div>
          </div>

          <div className={`${compactHeader ? 'hidden' : 'block'}flex p-1`}>
            <div className="w-full">
              <p className="line-clamp-3 text-xs sm:text-sm md:text-base  w-full text-center">
                {inputTitulo}
              </p>
            </div>
          </div>
        </div>
        <div style={{ minWidth: '8px' }}>
          {border != 0 ? (
            <Border
              border={border}
              right={true}
              size="header"
              css="w-4 h-full"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
