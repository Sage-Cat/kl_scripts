// ------------------------------ PUBLIC ------------------------------

// Calculate entropy of an array of probabilities
function GET_ENTROPY(arr) {
  if (Array.isArray(arr)) {
    return arr.reduce((entropy, prob) => entropy - prob * Math.log2(prob), 0);
  }
  return "NaN";
}

// Calculate average length of codes based on probabilities
function GET_AVERAGE_LENGTH(CodeArr, ChanceArr) {
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

// Calculate probabilities based on array of values
function GET_PROBABILITIES(valuesArray) {
  const totalSum = valuesArray.reduce((sum, [value]) => sum + value, 0);
  return valuesArray.map(([value]) => [+(value / totalSum).toFixed(2)]);
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
    GET_PROBABILITIES,
    FIND_SMALLEST_LARGER_NUMBER,
  };
}
