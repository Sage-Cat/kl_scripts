const { VARIANTS } = require("./string_manip");

// ------------------------------ PUBLIC ------------------------------

// Calculate entropy directly from a string
function GET_ENTROPY(inputString) {
  const frequencyCounts = {};
  let totalFrequency = 0;

  for (const char of inputString) {
    if (!frequencyCounts[char]) {
      frequencyCounts[char] = 0;
    }
    frequencyCounts[char] += _getValue(char); // Get value from VARIANTS
    totalFrequency += _getValue(char);
  }

  const probabilities = Object.values(frequencyCounts).map(
    (count) => count / totalFrequency
  );

  if (Array.isArray(probabilities) && probabilities.length > 0) {
    return probabilities.reduce(
      (entropy, prob) => entropy - prob * Math.log2(prob),
      0
    );
  }

  return "NaN";
}

// Calculate average length of codes based on probabilities
function GET_AVERAGE_LENGTH(inputString, CodeArr) {
  const frequencyCounts = {};

  for (const char of inputString) {
    if (!frequencyCounts[char]) {
      frequencyCounts[char] = 0;
    }
    frequencyCounts[char] += _getValue(char); // Get value from VARIANTS
  }

  // Calculating the probabilities
  const totalFrequency = Object.values(frequencyCounts).reduce(
    (a, b) => a + b,
    0
  );
  const sortedEntries = Object.entries(frequencyCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const ChanceArr = sortedEntries.map(([_, freq]) => freq / totalFrequency);

  if (
    Array.isArray(CodeArr) &&
    Array.isArray(ChanceArr) &&
    CodeArr.length === ChanceArr.length
  ) {
    return CodeArr.reduce(
      (avgLength, code, i) => avgLength + code.length * ChanceArr[i],
      0
    );
  }
  return "NaN";
}

// Get range of prime factors for a number
function GET_RANGE_OF_PRIMES(number) {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19];
  const result = [];

  for (const prime of primes) {
    while (number % prime === 0) {
      result.push(prime);
      number /= prime;
    }
  }

  return result;
}

// Find smallest number in array larger than a threshold
function FIND_SMALLEST_LARGER_NUMBER(rangeValues, threshold) {
  if (!Array.isArray(rangeValues)) {
    throw new Error("rangeValues must be an array");
  }

  return rangeValues.reduce((minLargerValue, [value]) => {
    return value > threshold &&
      (minLargerValue === null || value < minLargerValue)
      ? value
      : minLargerValue;
  }, null);
}

// Node.js export
if (typeof module !== "undefined") {
  module.exports = {
    GET_ENTROPY,
    GET_AVERAGE_LENGTH,
    GET_RANGE_OF_PRIMES,
    FIND_SMALLEST_LARGER_NUMBER,
  };
}

// ------------------------------ PRIVATE ------------------------------

function _getValue(letter) {
  const variant = VARIANTS.find((entry) => entry[0] === letter);
  return variant ? parseInt(variant[1] + variant[2]) : 0;
}
