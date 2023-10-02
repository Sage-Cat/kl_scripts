// Імпортуємо необхідний модуль для HEX2BIN_TETRAD
const { HEX2BIN_TETRAD } = require("./base_converts");

// ------------------------------ PUBLIC ------------------------------
// Публічна функція для отримання кодів помилок між послідовними HEX значеннями
function GET_ERROR_CODES(hexSequence) {
  const allErrorCodes = [];
  for (let i = 0; i < hexSequence.length - 1; i++) {
    const startHex = hexSequence[i];
    const endHex = hexSequence[i + 1];
    const startBinary = HEX2BIN_TETRAD(startHex);
    const endBinary = HEX2BIN_TETRAD(endHex);
    const errorCodes = _calculateErrorCodes(
      startBinary.split(""),
      endBinary.split("")
    );
    // Формуємо рядок з результатами та додаємо його до масиву
    allErrorCodes.push(
      `${startHex}(${startBinary})->${endHex}(${endBinary}): ${errorCodes.join(
        ", "
      )}`
    );
  }
  return [allErrorCodes];
}

function GET_KBITS(inputText) {
  if (typeof inputText !== "string") return "Not a text!";
  if (inputText.length !== 16)
    return "Message must be 16 characters without spaces";

  const inputBits = Array.from(inputText).map(Number);
  return _calculateKBits(inputBits);
}

function GENERATE_HEMMING_CODE(inputText) {
  if (typeof inputText !== "string") return "Not a text!";
  if (inputText.length !== 16)
    return "Message must be 16 characters without spaces";

  const inputBits = Array.from(inputText).map(Number);
  const k_bits = _calculateKBits(inputBits);
  return _assembleMessage(inputBits, k_bits);
}

// Test Hemming code for errors
function TEST_HEMMING_CODE(code) {
  if (typeof code !== "string") return "NaN";
  if (code.length !== 21) return "Incorrect code length"; //  (16 info bits + 5 control bits)

  const arr = [0, ...Array.from(code).map(Number)];
  const k_bits = _calculateErrorBits(arr);
  return _findErrorPosition(k_bits, arr);
}

// Export public functions
if (typeof module !== "undefined") {
  module.exports = {
    GET_ERROR_CODES,
    GET_KBITS,
    GENERATE_HEMMING_CODE,
    TEST_HEMMING_CODE,
  };
}

// ------------------------------ PRIVATE ------------------------------

// Функція для обчислення можливих кодів помилок між двома рядками start і end
function _calculateErrorCodes(start, end) {
  let differingBits = [];
  for (let i = 0; i < start.length; i++) {
    if (start[i] !== end[i]) {
      differingBits.push(i);
    }
  }

  const n = differingBits.length;
  let errorCodes = new Set();

  if (n === 4) {
    // Якщо відстань Хеммінга дорівнює 4, генеруємо всі можливі коди помилок
    for (let i = 0; i < 16; i++) {
      const errorCode = i.toString(2).padStart(4, "0");
      if (errorCode !== start.join("") && errorCode !== end.join("")) {
        errorCodes.add(errorCode);
      }
    }
  } else {
    // Якщо відстань Хеммінга відмінна від 4, генеруємо коди помилок для окремих бітів
    for (const index of differingBits) {
      let flippedStart = [...start];
      let flippedEnd = [...end];
      flippedStart[index] = end[index];
      flippedEnd[index] = start[index];
      errorCodes.add(flippedStart.join(""));
      errorCodes.add(flippedEnd.join(""));
    }
  }

  return Array.from(errorCodes);
}

function _calculateKBits(inputBits) {
  const k_bits = [];
  k_bits[0] = _calculateKBit(inputBits, [0, 1, 3, 4, 6, 8, 10, 11, 13, 15]);
  k_bits[1] = _calculateKBit(inputBits, [0, 2, 3, 5, 6, 9, 10, 12, 13]);
  k_bits[2] = _calculateKBit(inputBits, [1, 2, 3, 7, 8, 9, 10, 14, 15]);
  k_bits[3] = _calculateKBit(inputBits, [4, 5, 6, 7, 8, 9, 10]);
  k_bits[4] = _calculateKBit(inputBits, [11, 12, 13, 14, 15]);
  return k_bits;
}

function _calculateKBit(inputBits, indices) {
  return indices.reduce((acc, i) => acc ^ inputBits[i], 0);
}

function _assembleMessage(inputBits, k_bits) {
  let message = "";
  let kIndex = 0;
  let bIndex = 0;

  for (let i = 1; i <= 21; i++) {
    if (Math.log2(i) % 1 === 0) {
      message += k_bits[kIndex++];
    } else {
      message += inputBits[bIndex++];
    }
  }

  return message;
}

// Calculate error bits for testing Hemming code
function _calculateErrorBits(arr) {
  const k = [];
  k[1] = _calculateKBit(arr, [3, 5, 7, 9, 11, 13, 15, 17, 19, 21]);
  k[2] = _calculateKBit(arr, [3, 6, 7, 10, 11, 14, 18, 19]);
  k[4] = _calculateKBit(arr, [5, 6, 7, 12, 13, 14, 15, 20, 21]);
  k[8] = _calculateKBit(arr, [9, 10, 11, 12, 13, 14, 15]);
  k[16] = _calculateKBit(arr, [17, 18, 19, 20, 21]);
  return k;
}

// Find the error position based on k_bits and arr
function _findErrorPosition(k_bits, arr) {
  const res =
    "" +
    ((k_bits[16] + arr[16]) % 2) +
    ((k_bits[8] + arr[8]) % 2) +
    ((k_bits[4] + arr[4]) % 2) +
    ((k_bits[2] + arr[2]) % 2) +
    ((k_bits[1] + arr[1]) % 2);
  return parseInt(res, 2);
}
