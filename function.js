/**
 * Функція GET_ENTROPY призначена для обчислення ентропії масиву чисел.
 * @customfunction
 * @param {number[]} arr ймовірностей зустріти символ у повідомленні
 * @return {number|string}entropy ентропія
 *
 */
function GET_ENTROPY(arr) {
    // Перевірка, чи аргумент є масивом
    if (Array.isArray(arr)) {
        let entropy = 0;
        // Обчислення ентропії на основі формули Шеннона
        for (let i = 0; i < arr.length; i++) {
            entropy += arr[i] * Math.log2(arr[i]);
        }
        // Змінній entropy надається обернене значення як результат.
        return -entropy;
    } else {
        // Якщо аргумент не є масивом, повертається "NaN".
        return "NaN";
    }
}

/**
 * Функція GET_AVERAGE_LENGTH обчислює середню довжину рядків у відповідності до їх шансів.
 * @customfunction
 * @param {string[]} CodeArr масив кодів у текстовому представленні "0010"
 * @param {number[]} ChanceArr масив ймовірностей зустріти літеру у повідомленні
 * @return {number|string} averageLength середня довжина повідолмення
 */
function GET_AVERAGE_LENGTH(CodeArr, ChanceArr) {
    if (
        Array.isArray(CodeArr) &&
        Array.isArray(ChanceArr) &&
        CodeArr.length === ChanceArr.length
    ) {
        let averageLength = 0;
        // Обчислення середньої довжини
        for (let i = 0; i < CodeArr.length; ++i) {
            averageLength += CodeArr[i].toString().length * ChanceArr[i];
        }
        return averageLength;
    } else {
        // Якщо один із аргументів не є масивом або вони різної довжини, повертається "NaN".
        return "NaN";
    }
}

/** Функція TEST_HEMMING_CODE перевіряє рядок на наявність помилок за алгоритмом кодування геммінга(Hemming).
 *
 * @param {string} code Код Геммінга, що мість помилку
 * @return {number|string} номер розряду, що містить помилку
 */
function TEST_HEMMING_CODE(code) {
    if (typeof code !== "string") {
        // Якщо вхідний аргумент не є рядком, повертається "NaN".
        return "NaN";
    }
    else if(code.length === 21)
    {
        let arr = [0];
        // Перетворення рядка у масив бітів
        for (let i = 0; i < code.length; ++i)
            arr.push(parseInt(code[i]));

        // Обчислення контрольних бітів
        let k1 = (arr[3] + arr[5] + arr[7] + arr[9] + arr[11] + arr[13] + arr[15] + arr[17] + arr[19] + arr[21]) % 2;
        let k2 = (arr[3] + arr[6] + arr[7] + arr[10] + arr[11] + arr[14] + arr[18] + arr[19]) % 2;
        let k4 = (arr[5] + arr[6] + arr[7] + arr[12] + arr[13] + arr[14] + arr[15] + arr[20] + arr[21]) % 2;
        let k8 = (arr[9] + arr[10] + arr[11] + arr[12] + arr[13] + arr[14] + arr[15]) % 2;
        let k16 = (arr[17] + arr[18] + arr[19] + arr[20] + arr[21]) % 2;

        // Побітове обчислення результату
        let res = ""
            + (k16 + arr[16]) % 2
            + (k8 + arr[8]) % 2
            + (k4 + arr[4]) % 2
            + (k2 + arr[2]) % 2
            + (k1 + arr[1]) % 2;
        // Перетворення результату у десяткове число
        return parseInt(res, 2);
    }
    else
        return "Неправильна довжина коду (16 інформційних розрядів + 5 контрольних)";
}
