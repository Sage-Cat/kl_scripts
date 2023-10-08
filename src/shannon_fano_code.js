const { VARIANTS } = require("./string_manip");

// ------------------------------ PUBLIC ------------------------------

function GENERATE_SHANNON_FANO(inputString) {
  const frequencyCounts = {};

  for (const char of inputString) {
    if (!frequencyCounts[char]) {
      frequencyCounts[char] = 0;
    }
    frequencyCounts[char] += _getValue(char);
  }

  const sortedEntries = Object.entries(frequencyCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const probabilities = _getProbabilities(sortedEntries);
  const encodings = {};

  function buildCodes(array, code = "") {
    if (array.length === 1) {
      encodings[array[0][0]] = code;
      return;
    }

    let total = 0;
    let index = 0;
    let leftSum = 0;
    let rightSum = array.reduce((acc, [, value]) => acc + value, 0);

    while (leftSum < rightSum) {
      leftSum += array[index][1];
      rightSum -= array[index][1];
      total += array[index][1];
      index++;
    }

    buildCodes(array.slice(0, index), code + "0");
    buildCodes(array.slice(index), code + "1");
  }

  // Build the Shannon-Fano codes
  buildCodes(sortedEntries);

  // Collect just the codes into an array
  const encodingArray = Object.values(encodings);

  return [encodingArray];
}

if (typeof module !== "undefined") {
  module.exports = {
    GENERATE_SHANNON_FANO,
  };
}

// ------------------------------ PRIVATE ------------------------------

function _getValue(letter) {
  const variant = VARIANTS.find((entry) => entry[0] === letter);
  return variant ? parseInt(variant[1] + variant[2]) : 0;
}

// Calculate probabilities based on array of values
function _getProbabilities(valuesArray) {
  const totalSum = valuesArray.reduce((sum, [value]) => sum + value, 0);
  return valuesArray.map(([value]) => [+(value / totalSum).toFixed(2)]);
}
