// Функція GetEntropy призначена для обчислення ентропії масиву чисел.
function GetEntropy(arr) {
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

// Функція GetAverageLength обчислює середню довжину рядків у відповідності до їх шансів.
function GetAverageLength(CodeArr, ChanceArr) {
    if (
        Array.isArray(CodeArr) &&
        Array.isArray(ChanceArr) &&
        CodeArr.length == ChanceArr.length
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

// Функція TestHemmingCode перевіряє рядок на наявність помилок за алгоритмом кодування геммінга(Hemming).
function TestHemmingCode(code) {
    if (typeof code == "string") {
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
    } else {
        // Якщо вхідний аргумент не є рядком, повертається "NaN".
        return "NaN";
    }
}
