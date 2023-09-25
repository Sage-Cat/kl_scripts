// ------------------------------ PUBLIC ------------------------------

// Function to get k-bits array
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
  module.exports = { GENERATE_HEMMING_CODE, TEST_HEMMING_CODE };
}

// ------------------------------ PRIVATE ------------------------------

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
