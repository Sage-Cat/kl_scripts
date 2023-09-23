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

function HEX2BIN_ONLY_INT(hex) {
  var bin = "";
  for (var i = 0; i < hex.length; i++) {
    var hexDigit = parseInt(hex[i], 16);
    var binDigit = hexDigit.toString(2).padStart(4, '0');
    bin += binDigit;
  }
  return bin;
}

function GENERATE_ERR_COD(inputHex) {
  const inputText = HEX2BIN_EXTENDED(inputHex);
  const erroneousCodes = [];

  if (inputText.length !== 21) {
    return erroneousCodes;
  }

  for (let i = 0; i < inputText.length - 1; i++) {
    let code = inputText;
    // Flip the bits between i and i+1
    code = code.substring(0, i) + (code[i] === '0' ? '1' : '0') + (code[i + 1] === '0' ? '1' : '0') + code.substring(i + 2);
    erroneousCodes.push((i + 1) + "->" + (i + 2) + " : " + code);
  }

  return erroneousCodes;
}

// Rest of your code remains unchanged
