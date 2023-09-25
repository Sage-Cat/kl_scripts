// Функція HEX2BIN_EXTENDED перетворює шістнадцятковий рядок у вигляді 'X,Y' в бінарний рядок.
// Перевіряє валідність вхідних даних та повертає бінарний рядок 'X,Y' у вигляді 'X_binary,Y_binary'.
function HEX2BIN_EXTENDED(hexString) {
  // Перевірка на валідність вхідних даних
  if (hexString === undefined || hexString === null || typeof hexString !== "string") {
    return "Invalid input";
  }

  // Розділення вхідного рядка на дві частини 'X' та 'Y'
  var parts = hexString.split(",");
  if (parts.length !== 2) {
    return "Invalid input format. Please use the format 'X,Y' where X and Y are hexadecimal numbers.";
  }

  // Перетворення першої частини (X) в бінарний рядок
  var integerPart = parseInt(parts[0], 16);
  if (isNaN(integerPart)) {
    return "Invalid integer part";
  }
  var integerBinary = integerPart.toString(2);

  // Перетворення другої частини (Y) в бінарний рядок
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

  // Повертає бінарний рядок 'X_binary,Y_binary'
  return integerBinary + ',' + fractionalBinary;
}

// Функція FIND_ERR_CODE використовує метод Карт Карно для знаходження помилкових кодів на вхідному шістнадцятковому рядку.
// Вона розбиває рядок на бінарний рядок, будує карту Карно для кожного розряду і знаходить помилкові коди.
function FIND_ERR_CODE(hexInput) {
    const errorCodes = [];

    // Перетворення вхідного шістнадцяткового рядка в бінарний рядок
    const binaryInput = HEX2BIN_EXTENDED(hexInput);

    // Побудова карт Карно для кожного розряду
    const karnaughMaps = Array.from({ length: 16 }, () =>
        Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0))
    );

    // Заповнення карт Карно значеннями з бінарного рядка
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                const row = j;
                const col = k;
                karnaughMaps[i][row][col] = parseInt(binaryInput[i]);
            }
        }
    }

    // Знаходження помилкових кодів на картах Карно для кожного розряду
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                if (karnaughMaps[i][j][k] === 1) {
                    let errorCount = 0;
                    let errorCodesStr = "";

                    // Знаходження розрядів, які відрізняються від поточного розряду
                    for (let l = 0; l < 4; l++) {
                        if (l !== j) {
                            errorCount++;
                            errorCodesStr += l.toString();
                        }
                    }

                    // Додавання знайденого помилкового коду до списку
                    errorCodes.push(`${i}->${j} : ${errorCodesStr}`);
                }
            }
        }
    }

    // Повертає список помилкових кодів
    return errorCodes;
}

// Зчитуємо вхідний шістнадцятковий рядок від користувача
const hexInput = prompt("Введіть 16-ковий рядок: ");

// Знаходимо помилкові коди за допомогою Карт Карно для кожного розряду
const errorCodes = FIND_ERR_CODE(hexInput);

// Виводимо результат в консоль
console.log("Помилкові коди:");
errorCodes.forEach((code) => {
    console.log(code);
});
