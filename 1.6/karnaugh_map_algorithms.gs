// ------------------------------ PUBLIC ------------------------------
const { HEX2BIN_EXTENDED } = require("./base_converts");

// Функція GET_ALL_ERROR_SEQUENCES використовує метод Карт Карно для знаходження помилкових кодів на вхідному шістнадцятковому рядку.
// Вона розбиває рядок на бінарний рядок, будує карту Карно для кожного розряду і знаходить помилкові коди.
function GET_ALL_ERROR_SEQUENCES(hexInput) {
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

// Експорт функції GET_ALL_ERROR_SEQUENCES
module.exports = {
    GET_ALL_ERROR_SEQUENCES
};
