const numbersAltPortrait = [
  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
  13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
  20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5,
  28.2,
];

const NumerosAltura = () => {
  return (
    <>
      {numbersAltPortrait.map((number) => (
        <option value={number} key={number}>
          {number} centimetros{' '}
        </option>
      ))}
    </>
  );
};

export default NumerosAltura;
