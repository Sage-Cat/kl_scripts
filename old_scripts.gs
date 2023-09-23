function DEC2HEX_EXTENDED(decString) {
  if (typeof decString !== 'string' || !decString.includes(',')) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are decimal numbers.';
  }
  
  var parts = decString.split(",");
  var integerPart = parseInt(parts[0], 10).toString(16);
  
  var fractionalPartDec = parseFloat("0." + parts[1]);
  var fractionalPartHex = '';
  for (var i = 0; i < 5; i++) {
    fractionalPartDec *= 16;
    var hexDigit = Math.floor(fractionalPartDec).toString(16);
    fractionalPartHex += hexDigit;
    fractionalPartDec -= Math.floor(fractionalPartDec);
  }
  
  return integerPart + ',' + fractionalPartHex;
}


function DEC2BIN_EXTENDED(decString) {
  if (typeof decString !== 'string' || !decString.includes(',')) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are decimal numbers.';
  }
  
  var parts = decString.split(",");
  var integerPart = parseInt(parts[0], 10).toString(2);
  
  var fractionalPartDec = parseFloat("0." + parts[1]);
  var fractionalPartBin = '';
  for (var i = 0; i < 5; i++) {
    fractionalPartDec *= 2;
    var binDigit = Math.floor(fractionalPartDec).toString(2);
    fractionalPartBin += binDigit;
    fractionalPartDec -= Math.floor(fractionalPartDec);
  }
  
  return integerPart + ',' + fractionalPartBin;
}

function DEC2OCT_EXTENDED(decString) {
  if (typeof decString !== 'string' || !decString.includes(',')) {
    return 'Invalid input format. Please use the format "X,Y" where X and Y are decimal numbers.';
  }
  
  var parts = decString.split(",");
  var integerPart = parseInt(parts[0], 10).toString(8);
  
  var fractionalPartDec = parseFloat("0." + parts[1]);
  var fractionalPartOct = '';
  for (var i = 0; i < 5; i++) {
    fractionalPartDec *= 8;
    var octDigit = Math.floor(fractionalPartDec).toString(8);
    fractionalPartOct += octDigit;
    fractionalPartDec -= Math.floor(fractionalPartDec);
  }
  
  return integerPart + ',' + fractionalPartOct;
}

function HEX2DEC_EXTENDED(hexString) {
  if (hexString === undefined || hexString === null || typeof hexString !== "string") {
    return "Invalid input";
  }

  var parts = hexString.split(",");
  if (parts.length !== 2) {
    return "Invalid input format. Please use the format 'X,Y' where X and Y are hexadecimal numbers.";
  }

  var integerPart = parseInt(parts[0], 16);
  if (isNaN(integerPart)) {
    return "Invalid integer part";
  }
  var integerDec = integerPart.toString(10);

  var fractionalPart = parseInt(parts[1], 16) / Math.pow(16, parts[1].length);
  
  var fractionalDec = parseFloat(fractionalPart.toString()).toFixed(3).substring(1);

  return integerDec + fractionalDec.replace('.', ',');
}



function HEX2BIN_EXTENDED(hexString) {
  if (hexString === undefined || hexString === null || typeof hexString !== "string") {
    return "Invalid input";
  }

  var parts = hexString.split(",");
  if (parts.length !== 2) {
    return "Invalid input format. Please use the format 'X,Y' where X and Y are hexadecimal numbers.";
  }

  var integerPart = parseInt(parts[0], 16);
  if (isNaN(integerPart)) {
    return "Invalid integer part";
  }
  var integerBinary = integerPart.toString(2);

  var fractionalPart = parseInt(parts[1], 16) / Math.pow(16, parts[1].length);
  var fractionalBinary = '';
  for (var i = 0; i < 5; i++) {
    fractionalPart *= 2;
    fractionalBinary += Math.floor(fractionalPart).toString();
    fractionalPart -= Math.floor(fractionalPart);

    if (fractionalPart === 0) {
      break;
    }
  }

  return integerBinary + ',' + fractionalBinary;
}


function HEX2OCT_EXTENDED(hexString) {
  if (hexString === undefined || hexString === null || typeof hexString !== "string") {
    return "Invalid input";
  }

  var parts = hexString.split(",");
  if (parts.length !== 2) {
    return "Invalid input format. Please use the format 'X,Y' where X and Y are hexadecimal numbers.";
  }

  var integerPart = parseInt(parts[0], 16);
  if (isNaN(integerPart)) {
    return "Invalid integer part";
  }
  var integerOctal = integerPart.toString(8);

  var fractionalPart = parseInt(parts[1], 16) / Math.pow(16, parts[1].length);
  var fractionalOctal = '';
  for (var i = 0; i < 5; i++) {
    fractionalPart *= 8;
    fractionalOctal += Math.floor(fractionalPart).toString();
    fractionalPart -= Math.floor(fractionalPart);

    if (fractionalPart === 0) {
      break;
    }
  }

  return integerOctal + ',' + fractionalOctal;
}

function TRANSFORM_NUMBER_TO_MODULAR(inputNumber, bases) {
  var cellValue = parseInt(inputNumber, 10);

  var results = bases.map(function(base) {
    return cellValue % base;
  });
  
  return "(" + results.join(", ") + ")";
}

function GET8_UNIQUE_LETTERS(inputString) {
  inputString = String(inputString).toUpperCase();
  
  var uniqueLetters = "";
  var encounteredLetters = {};

  for (var i = 0; i < inputString.length; i++) {
    var letter = inputString[i];
    if (!encounteredLetters[letter] && /[А-ЯІЇЄҐ]/.test(letter)) {
      uniqueLetters += letter;
      encounteredLetters[letter] = true;
    }

    if (uniqueLetters.length === 8) {
      break;
    }
  }
  
  return uniqueLetters;
}

function GET8_UNIQUE_LETTERS(inputString) {
  inputString = String(inputString).toUpperCase();
  
  var uniqueLetters = "";
  var encounteredLetters = {};

  for (var i = 0; i < inputString.length; i++) {
    var letter = inputString[i];
    if (!encounteredLetters[letter] && /[А-ЯІЇЄҐ]/.test(letter)) {
      uniqueLetters += letter;
      encounteredLetters[letter] = true;
    }

    if (uniqueLetters.length === 8) {
      break;
    }
  }
  
  return uniqueLetters;
}

function FIND_SMALLEST_LARGER_NUMBER(rangeValues, threshold) {
  var minLargerValue = null;

  if (!Array.isArray(rangeValues)) {
    throw new Error('rangeValues має бути масивом');
  }

  for (var i = 0; i < rangeValues.length; i++) {
    if (rangeValues[i][0] > threshold) {
      if (minLargerValue === null || rangeValues[i][0] < minLargerValue) {
        minLargerValue = rangeValues[i][0];
      }
    }
  }

  return minLargerValue;
}

function COMPARE_T2(value1, value2) {
  var tolerance = 0.0101;
  
  if (typeof value1 !== 'number' || typeof value2 !== 'number') {
    return "Input values must be numbers";
  }

  var difference = Math.abs(value1 - value2);
  return difference <= tolerance;
}


function GET_RANGE_OF_PRIMES(number) {
  var primes = [2, 3, 5, 7, 11, 13, 17, 19];
  var result = [];

  for (var i = 0; i < primes.length; i++) {
    while (number % primes[i] === 0) {
      result.push(primes[i]);
      number = number / primes[i];
    }
  }
  
  return result;
}

function CREATE_ARRAY_OF_PAIRS(stringData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var tableData = sheet.getRange("$R$2:$U$33").getValues();
  var charValuesMap = {};

  // Creating a map of character-values from the table data
  tableData.forEach(function(row) {
    charValuesMap[row[0]] = parseInt(row[3], 10); // Ensure values are numeric
  });

  // Creating an array of values with characters from the string data and their associated values from the table
  var valuesArray = [];
  var stringDataArray = stringData.split('');
  
  stringDataArray.forEach(function(char) {
    if(charValuesMap[char]) {
      valuesArray.push([charValuesMap[char]]);
    }
  });

  return valuesArray;
}

function GET_PROBABILITIES(valuesArray) {
  var totalSum = valuesArray.reduce((sum, value) => sum + value[0], 0);
  
  return valuesArray.map(value => [parseFloat((value[0] / totalSum).toFixed(2))]);
}

function HUFFMAN_ENCODING(text, probabilities) {
  // Створення масиву вузлів
  var nodes = [];
  for (var i = 0; i < text.length; i++) {
    nodes.push({char: text[i], prob: probabilities[i][0], code: ''});
  }
  
  while (nodes.length > 1) {
    // Сортування вузлів за ймовірністю
    nodes.sort(function(a, b) {
      return b.prob - a.prob;
    });
    
    // Об'єднання двох вузлів з найменшою ймовірністю
    var node1 = nodes.pop();
    var node2 = nodes.pop();
    
    // Створення нового вузла з об'єднаними ймовірностями та символами
    var newNode = {
      char: node1.char + node2.char,
      prob: node1.prob + node2.prob,
      left: node1,
      right: node2,
    };
    nodes.push(newNode);
  }
  
  // Отримання дерева Хаффмана
  var tree = nodes[0];
  tree.code = '';  // Initialize the root node's code to an empty string
  
  // Створення таблиці кодування
  var codes = {};
  var stack = [tree];
  while (stack.length > 0) {
    var node = stack.pop();
    if (node.left) {
      node.left.code = node.code + '0';
      stack.push(node.left);
    }
    if (node.right) {
      node.right.code = node.code + '1';
      stack.push(node.right);
    }
    if (!node.left && !node.right) {
      codes[node.char] = node.code;
    }
  }
  
  // Кодування тексту
  var encodedText = [];
  for (var i = 0; i < text.length; i++) {
    encodedText.push(codes[text[i]]);
  }
  
  return [encodedText];
}

function CALCULATE_ENTROPY(probabilitiesArray) {
  var entropy = 0;

  for (var i = 0; i < probabilitiesArray.length; i++) {
    var probability = probabilitiesArray[i][0];
    if (probability > 0) {
      entropy += -probability * Math.log2(probability);
    }
  }

  return entropy;
}

function GET8_UNIQUE_LETTERS(inputString) {
  inputString = String(inputString).toUpperCase();
  
  var uniqueLetters = "";
  var encounteredLetters = {};

  for (var i = 0; i < inputString.length; i++) {
    var letter = inputString[i];
    if (!encounteredLetters[letter] && /[А-ЯІЇЄҐ]/.test(letter)) {
      uniqueLetters += letter;
      encounteredLetters[letter] = true;
    }

    if (uniqueLetters.length === 8) {
      break;
    }
  }
  
  return uniqueLetters;
}

// Глобальний масив для зберігання таблиці
var table = [
  ['А', '7', '8'],
  ['Б', '5', '8'],
  ['В', '3', '8'],
  ['Г', '1', '8'],
  ['Д', '2', '8'],
  ['Е', '4', '8'],
  ['Є', '7', '1'],
  ['Ж', '5', '1'],
  ['З', '3', '1'],
  ['И', '1', '1'],
  ['І', '2', '1'],
  ['Ї', '4', '1'],
  ['Й', '7', '3'],
  ['К', '5', '3'],
  ['Л', '3', '3'],
  ['М', '1', '3'],
  ['Н', '2', '3'],
  ['О', '4', '3'],
  ['П', '7', '5'],
  ['Р', '5', '5'],
  ['С', '3', '5'],
  ['Т', '1', '5'],
  ['У', '2', '5'],
  ['Ф', '4', '5'],
  ['Х', '7', '7'],
  ['Ц', '5', '7'],
  ['Ч', '3', '7'],
  ['Ш', '1', '7'],
  ['Щ', '2', '7'],
  ['Ю', '4', '7'],
  ['Я', '7', '9'],
  ['Ь', '5', '9']
];

// Function to get the most significant digit
function GET_1_DIGIT(variant, position) {
  var letter = variant.charAt(position - 1);
  for (var i = 0; i < table.length; i++) {
    if (table[i][0] === letter) {
      return Number(table[i][1]);
    }
  }
  return "Letter not found";
}

// Function to get the least significant digit
function GET_2_DIGIT(variant, position) {
  var letter = variant.charAt(position - 1);
  for (var i = 0; i < table.length; i++) {
    if (table[i][0] === letter) {
      return Number(table[i][2]);
    }
  }
  return "Letter not found";
}

// Function to get the full number
function GET_FULL_NUMBER(variant, position) {
  return GET_1_DIGIT(variant, position) * 10 + GET_2_DIGIT(variant, position);
}

function HEX2BIN_ONLY_INT(hex) {
  var bin = "";
  for (var i = 0; i < hex.length; i++) {
    var hexDigit = parseInt(hex[i], 16);
    var binDigit = hexDigit.toString(2).padStart(4, '0');
    bin += binDigit;
  }
  return bin;
}
