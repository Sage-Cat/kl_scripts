// ------------------------------ PUBLIC ------------------------------
// global VARIANTS with variants
var VARIANTS = [
  ["А", "7", "8"],
  ["Б", "5", "8"],
  ["В", "3", "8"],
  ["Г", "1", "8"],
  ["Д", "2", "8"],
  ["Е", "4", "8"],
  ["Є", "7", "1"],
  ["Ж", "5", "1"],
  ["З", "3", "1"],
  ["И", "1", "1"],
  ["І", "2", "1"],
  ["Ї", "4", "1"],
  ["Й", "7", "3"],
  ["К", "5", "3"],
  ["Л", "3", "3"],
  ["М", "1", "3"],
  ["Н", "2", "3"],
  ["О", "4", "3"],
  ["П", "7", "5"],
  ["Р", "5", "5"],
  ["С", "3", "5"],
  ["Т", "1", "5"],
  ["У", "2", "5"],
  ["Ф", "4", "5"],
  ["Х", "7", "7"],
  ["Ц", "5", "7"],
  ["Ч", "3", "7"],
  ["Ш", "1", "7"],
  ["Щ", "2", "7"],
  ["Ю", "4", "7"],
  ["Я", "7", "9"],
  ["Ь", "5", "9"],
];

// Get 8 unique letters from the input string
function GET8_UNIQUE_LETTERS(inputString) {
  return _getUniqueLetters(String(inputString).toUpperCase(), 8);
}

// Get the most significant digit
function GET_1_DIGIT(variant, position) {
  return _getDigitFromVARIANTS(variant, position, 1);
}

// Get the least significant digit
function GET_2_DIGIT(variant, position) {
  return _getDigitFromVARIANTS(variant, position, 2);
}

// Get the full number
function GET_FULL_NUMBER(variant, position) {
  return GET_1_DIGIT(variant, position) * 10 + GET_2_DIGIT(variant, position);
}

// Create an array of pairs
function CREATE_ARRAY_OF_PAIRS(stringData) {
  const charValuesMap = _createCharValuesMap(VARIANTS);
  return _createValuesArray(stringData, charValuesMap);
}

// Export public functions
module.exports = {
  GET8_UNIQUE_LETTERS,
  GET_1_DIGIT,
  GET_2_DIGIT,
  GET_FULL_NUMBER,
  CREATE_ARRAY_OF_PAIRS,
  VARIANTS,
};

// ------------------------------ PRIVATE ------------------------------

// Get unique letters up to a limit
function _getUniqueLetters(str, limit) {
  let uniqueLetters = "";
  const encounteredLetters = {};

  for (const letter of str) {
    if (uniqueLetters.length >= limit) break;
    if (!encounteredLetters[letter] && /[А-ЯІЇЄҐ]/.test(letter)) {
      uniqueLetters += letter;
      encounteredLetters[letter] = true;
    }
  }

  return uniqueLetters;
}

// Get a digit from the VARIANTS based on the letter and position
function _getDigitFromVARIANTS(variant, position, digitIndex) {
  const letter = variant.charAt(position - 1);
  const row = VARIANTS.find((row) => row[0] === letter);
  return row ? Number(row[digitIndex]) : "Letter not found";
}

// Create a map of character-values from the VARIANTS data
function _createCharValuesMap(VARIANTSData) {
  const charValuesMap = {};
  VARIANTSData.forEach((row) => {
    charValuesMap[row[0]] = parseInt(row[3], 10);
  });
  return charValuesMap;
}

// Create a map of character-values from the VARIANTS data
function _createCharValuesMap(VARIANTSData) {
  const charValuesMap = {};
  VARIANTSData.forEach((row) => {
    charValuesMap[row[0]] = parseInt(row[1], 10); // Changed to row[1] to match VARIANTS structure
  });
  return charValuesMap;
}

// Create an array of values based on the string data and character-values map
function _createValuesArray(stringData, charValuesMap) {
  return Array.from(stringData)
    .filter((char) => charValuesMap[char])
    .map((char) => [charValuesMap[char]]);
}
