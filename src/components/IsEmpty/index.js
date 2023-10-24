// var hasOwnProperty = Object.prototype.hasOwnProperty;
// const obj = authContext.user;

export default function isEmpty(obj) {
  // null é "empty"
  if (obj == null) return true;
  // Suponhamos que se tenha uma propriedade length com um valor diferente de zero
  // Essa proriedade será verdadeira
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  // Caso contrário ela tem todas as sua propriedades?
  // Isto não se manipula
  // toString e valueOf são erros de enumeração no IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}
