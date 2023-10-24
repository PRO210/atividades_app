import '../../index.css';
import { useContext } from 'react';
import HeaderContext from '../../contexts/HeaderContext';

import Border from '../Border';

const inputHeader = `truncate text-xs sm:text-sm md:text-base text-left leading-tight focus:bg-white border-b focus:border-purple-500`;

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

      <div className="flex flex-row">
        <div style={{ minWidth: '8px' }}>
          {border != 0 ? (
            <Border border={border} size="header" css="w-4 h-full" />
          ) : null}
        </div>

        <div className="w-full" style={{ minWidth: '89%' }}>
          <div className="flex ">
            <div className="w-full">
              <p className={`${inputHeader} `}>{inputEscola}</p>
            </div>
          </div>

          <div className="flex ">
            <div className="w-full">
              <p className={inputHeader}>{inputProfessor}</p>
            </div>
          </div>

          <div className="flex ">
            <div
              className={`${
                inputAluno != '' ? 'w-full border-b-2 border-black mr-2' : null
              }`}
            >
              <p className={`${inputHeader} `}>{inputAluno}</p>
            </div>
          </div>

          <div
            className={`${
              inputTurma != 'flex flex-nowrap justify-end' ? '' : null
            }  `}
          >
            <div className="w-full">
              <p className={inputHeader}>{inputTurma}</p>
            </div>
            <div className="w-3/4">
              <p className={inputHeader}>{inputData}</p>
            </div>
          </div>

          <div
            className={`${
              compactHeader ? 'hidden' : 'block'
            }flex p-1  justify-center text-center`}
          >
            <div className="w-full">
              <p className="line-clamp-3 text-xs sm:text-sm md:text-base w-full ">
                {inputTitulo}
              </p>
            </div>
          </div>
        </div>
        <div style={{ minWidth: '8px' }}>
          {border != 0 ? (
            <Border
              border={border}
              size="header"
              right={true}
              css={'w-4 h-full'}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
