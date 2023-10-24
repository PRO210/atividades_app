const SelectHeader = ({ imageQtd, value, cssInput, handleHeader }) => {
  return (
    <div>
      <select
        disabled={parseInt(imageQtd) > 4 ? true : false}
        value={value}
        className={`${cssInput} ${
          parseInt(imageQtd) > 4
            ? 'border-red-600 text-red-600 font-bold '
            : cssInput
        } `}
        onChange={() => handleHeader()}
      >
        <option value={true}>Cabeçalho Completo</option>
        <option value={false}>
          {parseInt(imageQtd) > 4 ? '  Use 2 ou 4 páginas!' : 'Sem Cabeçalho'}
        </option>
      </select>
    </div>
  );
};

export default SelectHeader;
