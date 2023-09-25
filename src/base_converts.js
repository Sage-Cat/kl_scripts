// ------------------------------------ PUBLIC ------------------------------------

const DEC2HEX_EXTENDED = (decString) =>
  _decToBaseExtended(decString, 16).replace(/^0+/, "");
const DEC2BIN_EXTENDED = (decString) =>
  _decToBaseExtended(decString, 2).replace(/^0+/, "");
const DEC2OCT_EXTENDED = (decString) =>
  _decToBaseExtended(decString, 8).replace(/^0+/, "");

const HEX2DEC_EXTENDED = (hexString) =>
  _hexToBaseExtended(hexString, 10).replace(/^0+/, "");
const HEX2BIN_EXTENDED = (hexString) =>
  _hexToBaseExtended(hexString, 2).replace(/^0+/, "");
const HEX2OCT_EXTENDED = (hexString) =>
  _hexToBaseExtended(hexString, 8).replace(/^0+/, "");

const DEC2MODULAR = (inputNumber, bases) => {
  const cellValue = parseInt(inputNumber, 10);
  const results = bases.map((base) => cellValue % base);
  return `(${results.join(", ")})`;
};

const HEX2BIN_ONLY_INT = (hex) =>
  parseInt(hex, 16).toString(2).replace(/^0+/, "");
const HEX2OCT_ONLY_INT = (hex) =>
  parseInt(hex, 16).toString(8).replace(/^0+/, "");
const HEX2DEC_ONLY_INT = (hex) =>
  parseInt(hex, 16).toString(10).replace(/^0+/, "");
const DEC2BIN_ONLY_INT = (dec) =>
  parseInt(dec, 10).toString(2).replace(/^0+/, "");
const DEC2HEX_ONLY_INT = (dec) =>
  parseInt(dec, 10).toString(16).toUpperCase().replace(/^0+/, "");
const DEC2OCT_ONLY_INT = (dec) =>
  parseInt(dec, 10).toString(8).replace(/^0+/, "");

if (typeof module !== "undefined") {
  module.exports = {
    DEC2HEX_EXTENDED,
    DEC2BIN_EXTENDED,
    DEC2OCT_EXTENDED,
    HEX2DEC_EXTENDED,
    HEX2BIN_EXTENDED,
    HEX2OCT_EXTENDED,
    DEC2MODULAR,
    HEX2BIN_ONLY_INT,
    HEX2OCT_ONLY_INT,
    HEX2DEC_ONLY_INT,
    DEC2BIN_ONLY_INT,
    DEC2HEX_ONLY_INT,
    DEC2OCT_ONLY_INT,
  };
}

// ------------------------------------ PRIVATE ------------------------------------

// Constants
const MAX_FRACTION_DIGITS_DEC_OCT_HEX = 3; // 3 digits after ","
const MAX_FRACTION_DIGITS_BIN = 5; // 5 bits after ","

// Private function to validate input
const _validateInput = (input, delimiter) =>
  typeof input === "string" && input.includes(delimiter);

// Helper function to convert fractional part
const _convertFractional = (fractional, base, maxDigits) => {
  let result = "";
  for (let i = 0; i < maxDigits; i++) {
    fractional *= base;
    result += Math.floor(fractional).toString(base).toUpperCase();
    fractional -= Math.floor(fractional);
  }
  return result;
};

// Private function for decimal to base conversion logic
const _decToBaseExtended = (decString, base) => {
  const maxDigits =
    base === 2 ? MAX_FRACTION_DIGITS_BIN : MAX_FRACTION_DIGITS_DEC_OCT_HEX;

  if (!_validateInput(decString, ",")) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are decimal numbers.';
  }

  const [integerPart, fractionalPart] = decString.split(",").map(parseFloat);
  const result = Math.floor(integerPart).toString(base).toUpperCase();
  const fractional = _convertFractional(`0.${fractionalPart}`, base, maxDigits);

  return `${result},${fractional}`;
};

// Private function for hex to base conversion logic
const _hexToBaseExtended = (hexString, base) => {
  const maxDigits =
    base === 2 ? MAX_FRACTION_DIGITS_BIN : MAX_FRACTION_DIGITS_DEC_OCT_HEX;

  if (!_validateInput(hexString, ",")) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are hexadecimal numbers.';
  }

  const [integerPart, fractionalPart] = hexString.split(",");
  const integer = parseInt(integerPart, 16).toString(base).toUpperCase();
  const fractional =
    parseInt(fractionalPart, 16) / Math.pow(16, fractionalPart.length);
  const fractionalBase = _convertFractional(fractional, base, maxDigits);

  return `${integer},${fractionalBase}`;
};
