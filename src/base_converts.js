// ------------------------------------ PUBLIC ------------------------------------

const DEC2HEX_EXTENDED = (decString) => _decToBaseExtended(decString, 16);
const DEC2BIN_EXTENDED = (decString) => _decToBaseExtended(decString, 2);
const DEC2OCT_EXTENDED = (decString) => _decToBaseExtended(decString, 8);

const HEX2DEC_EXTENDED = (hexString) => _hexToBaseExtended(hexString, 10);
const HEX2BIN_EXTENDED = (hexString) => _hexToBaseExtended(hexString, 2);
const HEX2OCT_EXTENDED = (hexString) => _hexToBaseExtended(hexString, 8);

const DEC2MODULAR = (inputNumber, bases) => {
  const cellValue = parseInt(inputNumber, 10);
  const results = bases.map((base) => cellValue % base);
  return `(${results.join(", ")})`;
};

// Additional conversion functions
const HEX2BIN_ONLY_INT = (hex) => parseInt(hex, 16).toString(2);
const HEX2OCT_ONLY_INT = (hex) => parseInt(hex, 16).toString(8);
const HEX2DEC_ONLY_INT = (hex) => parseInt(hex, 16).toString(10);
const DEC2BIN_ONLY_INT = (dec) => parseInt(dec, 10).toString(2);
const DEC2HEX_ONLY_INT = (dec) => parseInt(dec, 10).toString(16).toUpperCase();
const DEC2OCT_ONLY_INT = (dec) => parseInt(dec, 10).toString(8);

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

// ------------------------------------ PRIVATE ------------------------------------

// Constants
const MAX_FRACTION_DIGITS = 5;

// Private function to validate input
const _validateInput = (input, delimiter) =>
  typeof input === "string" && input.includes(delimiter);

// Helper function to convert fractional part
const _convertFractional = (fractional, base, maxDigits) => {
  let result = "";
  for (let i = 0; i < maxDigits; i++) {
    fractional *= base;
    result += Math.floor(fractional).toString(base);
    fractional -= Math.floor(fractional);
  }
  return result;
};

// Private function for decimal to base conversion logic
const _decToBaseExtended = (decString, base) => {
  if (!_validateInput(decString, ",")) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are decimal numbers.';
  }

  const [integerPart, fractionalPart] = decString.split(",").map(parseFloat);
  const result = Math.floor(integerPart).toString(base);
  const fractional = _convertFractional(
    `0.${fractionalPart}`,
    base,
    MAX_FRACTION_DIGITS
  );

  return `${result}${fractional}`;
};

// Private function for hex to base conversion logic
const _hexToBaseExtended = (hexString, base) => {
  if (!_validateInput(hexString, ",")) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are hexadecimal numbers.';
  }

  const [integerPart, fractionalPart] = hexString.split(",");
  const integer = parseInt(integerPart, 16).toString(base);
  const fractional =
    parseInt(fractionalPart, 16) / Math.pow(16, fractionalPart.length);
  const fractionalBase = _convertFractional(
    fractional,
    base,
    MAX_FRACTION_DIGITS
  );

  return `${integer},${fractionalBase}`;
};
