// ------------------------------ PUBLIC ------------------------------

// Імпортуємо необхідний модуль для HEX2BIN_TETRAD
const { HEX2BIN_TETRAD } = require("./base_converts");

// Публічна функція для отримання кодів помилок між послідовними HEX значеннями
function GET_KARNAUGH_ERROR_CODES(hexSequence) {
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

// Експорт функції GET_KARNAUGH_ERROR_CODES для використання її в інших модулях
if (typeof module !== "undefined") {
  module.exports = {
    GET_KARNAUGH_ERROR_CODES,
  };
}

// ------------------------------------ PRIVATE ------------------------------------

// Функція для обчислення відстані Хеммінга між двома рядками a і b
function _hammingDistance(a, b) {
  let distance = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      distance++;
    }
  }
  return distance;
}

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
