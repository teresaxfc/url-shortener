const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const base = alphabet.length;

function encodeToBase58(number) {
  const remainders = [];
  let divideResult = number;

  do {
    remainders.push(divideResult % base);
    divideResult = Math.floor(divideResult / base);
  } while (divideResult !== 0);

  return remainders.reverse().map(remainder => alphabet.charAt(remainder)).join('');
}

function decodeFromBase58(number) {
  return number.split('').reverse()
    .reduce((decimalValue, digit, index) =>
      decimalValue + (alphabet.indexOf(digit) * (base ** index))
      , 0)
    .toString();
}

module.exports = {
  encodeToBase58,
  decodeFromBase58,
};
