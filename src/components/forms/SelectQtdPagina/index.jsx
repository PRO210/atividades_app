const SelectQtdPagina = ({ imageQtd, cssInput, qtdPageAndImage }) => {
  return (
    <div>
      <select
        id="qtdPageAndImage"
        value={imageQtd}
        className={cssInput}
        onChange={(e) => qtdPageAndImage(e.target.value)}
      >
        <option value="1">Uma Página por Folha</option>
        <option value="2">Duas Páginas por Folha</option>
        <option value="4">Quatro Páginas por Folha</option>
        <option value="6">Seis Páginas por Folha (3 * 2)</option>
        <option value="6i">Seis Páginas por Folha Inverso (2 * 3) </option>
        <option value="8">Oito Páginas por Folha</option>
        <option value="8i">Oito Páginas por Folha Inverso (2 * 4)</option>
        <option value="10">Dez Páginaspor Folha</option>
        <option value="10i">Dez Páginas por Folha Inverso (2 * 5)</option>
        <option value="12">Doze Páginas por Folha</option>
        <option value="12i">Doze Páginas por Folha Inverso (2 * 6)</option>
        <option value="12ii">Doze Páginas por Folha Quadrado (3 * 4)</option>
      </select>
    </div>
  );
};

export default SelectQtdPagina;
