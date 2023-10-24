const SelectBoader = ({ imageQtd, border, cssInput, handleBorder }) => {
  return (
    <div>
      <select
        id="border"
        disabled={parseInt(imageQtd) > 4 ? true : false}
        value={border}
        className={`${cssInput} ${
          parseInt(imageQtd) > 4
            ? 'border-red-600 text-red-600 font-bold '
            : cssInput
        } `}
        onChange={(e) => handleBorder(e.target.value)}
      >
        <option value="0">
          {parseInt(imageQtd) > 4 ? '  Use 2 ou 4 páginas!' : 'Sem Bordas'}
        </option>
        <option value="aquarela_de_lapis">Aquarela de Lápis </option>
        <option value="coracaoPortrait">Corações Alinhados </option>
        <option value="coracao_portrait_vazado">
          Corações Alinhados (Vazado){' '}
        </option>
        <option value="baloes_coloridos">Bandeiras Coloridos </option>
        <option value="baloes_coloridos_vazados">
          Bandeiras Coloridos Vazados
        </option>
        <option value="milhos_fofos">Uma fofura de milhos</option>
        <option value="fogueira">Fogueirinha</option>
        <option value="bandeira_baloes_fogueira">
          Bandeiras, Balões e Fogueira
        </option>
      </select>
    </div>
  );
};

export default SelectBoader;
