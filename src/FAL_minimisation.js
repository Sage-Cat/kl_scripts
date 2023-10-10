const { HEX2BIN_TETRAD, DEC2BIN_TRIAD } = require("./base_converts");
//________________________Public_____________________

/**
 * Мінімізує за 1
 * @param {string}str "FF"
 * @return {string} "!a + !c"
 * @constructor
 */
function MINIMIZATION41(str) {
    let result = "";
    let variables = "abc";
    let commonImplicans = _minimization(str, 1);
    for(let i = 0; i < commonImplicans.length; ++i)
    {
        for(let j = 0; j < variables.length; ++j) {

            if (commonImplicans[i][j] == '1')
                result += variables[j];
            if (commonImplicans[i][j] == '0')
                result += '!' + variables[j];
        }
        if(i != commonImplicans.length - 1)
            result += " + ";
    }
    return result;
}


/**
 * Мінімізує за 0
 * @param {string}str "FF"
 * @return {string} "c!b!a"
 * @constructor
 */
function MINIMIZATION40(str)
{
    let result = "";
    let variables = "abc";
    let commonImplicans = _minimization(str, 0);
    for(let i = 0; i < commonImplicans.length; ++i)
    {
        result += "(";
        for(let j = 0; j < variables.length; ++j) {

            if (commonImplicans[i][j] == '0')
                result += variables[j];
            if (commonImplicans[i][j] == '1')
                result += '!' + variables[j];
            result += "+";
        }
            result += ")";
    }


    for (let i = 0; i < result.length; ++i)
        if (
            result[i] == "(" && result[i + 1] == "+" ||
            result[i] == "+" && result[i + 1] == "+"
        ) {
            result = RemoveSymbol(result, i + 1);
            --i;
        }


    for (let i = 0; i < result.length; ++i)
        if(
            result[i] == "+" && result[i+1] == ")"
        )
        {
            result = RemoveSymbol(result, i);
            --i;
        }

    for (let i = 0; i < result.length; ++i)
        if(
            result[i] == "(" && result[i+2] == ")"
        )
        {
            result = RemoveSymbol(result, i + 2);
            result = RemoveSymbol(result, i );
            i += -2;
        }

    for (let i = 0; i < result.length; ++i)
        if(
            result[i] == "(" && result[i+1] == "!" && result[i+3] == ")"
        )
        {
            result = RemoveSymbol(result, i + 3);
            result = RemoveSymbol(result, i );
            i += -2;
        }
//*/
    return result;

}

module.exports = {
    MINIMIZATION41,
    MINIMIZATION40
};

//_________________________PRIVATE_________________

/**
 * мінімізує функцію задану str за radix
 * @param {string}str FF
 * @param {string}radix 1/0
 * @return {any[]} Масив простих імплікант
 */
function _minimization(str, radix)
{
    str = "" + str;
    radix = '' + radix;

    let interestCodes = GetInterestCode(str, radix);

    let commonImplicants = [];
    let implicants = SortPerCount(interestCodes);

    //console.log(GetImplicants(implicants,commonImplicants));


    do {
        let values
            = GetImplicants(implicants, commonImplicants);

        implicants = values.implicants;
        commonImplicants = values.commonImplicants;

    } while (implicants.length != 0)
//*/

    //console.log(commonImplicants);
    //console.log(implicants);
    //console.log(HEX2BIN_TETRAD(str));

    return commonImplicants;
}

/**
 * Виділення "цікавих" кодів
 * @param {string}str код у 16
 * @param {string}radix 1/0
 * @return {*[]}
 */
function GetInterestCode(str, radix)
{
    str = "" + str;
    radix = "" + radix;

    //конвертація 16 до 2
    str = HEX2BIN_TETRAD(str);

    //власне пошук
    let result = [];
    for(let i =0; i < str.length; ++i)
        if(str[i] == radix)
            result.push(DEC2BIN_TRIAD(''+ i));

    return result;
}

/**
 * Повертає к-сть 1 у str
 * @param {string}str
 * @constructor
 */
function Counter(str)
{
    let counter = 0;

    for(let i = 0; i < str.length; ++i)
        if(str[i] == "1")
            ++counter;

    return counter;
}

/**
 * прибирє порожні підмасиви
 * @param {any[][]}array
 * @return {any[][]} повертає ТОЙ ЖЕ масив без порожніх підмасивів
 * @constructor
 */
function RemoveSpaces(array)
{
    for(let i = 0; i < array.length; ++i)
        if(array[i].length == 0) {
            array.splice(i, 1);
            --i;
        }

    return array;
}

/**
 * Сортує масив за к-стю 1 в коді
 * @param {string[]}unsortedArrayOfCodes
 * @return {any[][]}
 */
function SortPerCount(unsortedArrayOfCodes)
{
    let result = [];
    if(unsortedArrayOfCodes.length > 0)
    for(let i = 0; i <= unsortedArrayOfCodes[0].length; ++i) {
        result[i] = [];
        for(let j = 0; j < unsortedArrayOfCodes.length; ++j)
            if(Counter(unsortedArrayOfCodes[j]) == i)
                result[i].push(unsortedArrayOfCodes[j]);
    }

    //RemoveSpaces(result);

    return RemoveSpaces(result);
}

/**
 * Порівнює 2 рядки, якщо є 1 відмінність,
 * то повертає її позицію. Якщо їх нема,
 * або > 1, то повертає -1
 * @param {string}str1
 * @param {string}str2
 * @return {number}
 */
function Compare(str1, str2)
{
    let counter = 0;
    let position = -1;

    for(let i = 0; i < str1.length; ++i)
        if(str1[i] != str2[i])
        {
            counter++;
            position = i;
        }

    if(counter == 1)
        return position;
    if(counter != 1)
        return -1;
}

/**
 * Заміняє position-ий символ рядка на заданий символ
 * @param {string}str рядок
 * @param {number}position позиція
 * @param {string}symbol символ
 * @return {string}
 * @constructor
 */
function ReplaceAt(str, position, symbol)
{
    str = "" + str;
    symbol = "" + symbol;

    let result = "";
    for(let i = 0; i < str.length; ++i)
        if(i == position)
          result += symbol;
        else
            result += str[i];
    return result;
}

/**
 * Прибирає елементи, що повторюються
 * @param {any[]}array
 * @return {*[]}
 * @constructor
 */
function RemoveTheSame(array)
{
    let result = [];
    for (let i = 0; i < array.length; ++i)
        if(!result.includes(array[i]))
            result.push(array[i]);
    return result;
}

/**
 * Знаходить прості та звичайні імпліканти
 * @param {any[]}codes масив кодів (імплікант)
 * @param commonImplicants прості імпліканти
 * @return {{implicants: *[], commonImplicants: *[]}} об♥єкт {звичайні імпліканти, проті імпліканти}
 * @constructor
 */
function GetImplicants(codes, commonImplicants)
{
    let BoolMatrix = [];

    for(let i = 0; i < codes.length; ++i)
    {
        BoolMatrix[i] = [];
        for(let j = 0; j < codes[i].length; ++j)
            BoolMatrix[i][j] = 0;
    }


    //let commonImplicants = [];
    let implicants = [];

    for(let i =0; i < codes.length - 1; ++i)
        for(let j = 0; j < codes[i].length; ++j)
        {

            for(let k = 0; k < codes[i + 1].length; ++k) {
                //console.log(codes[i][])
                let position = Compare(codes[i][j], codes[i + 1][k]);
                if(position != -1)
                {
                    implicants.push(ReplaceAt(codes[i][j], position, "-"));
                    BoolMatrix[i][j] = 1;
                    BoolMatrix[i + 1][k] = 1;
                }
            }
        }

    implicants = SortPerCount(RemoveTheSame(implicants));

    for(let i = 0; i < BoolMatrix.length; ++i)
        for(let j = 0; j < BoolMatrix[i].length; ++j)
            if(BoolMatrix[i][j] === 0)
                commonImplicants.push(codes[i][j]);

    /*
    console.log(codes);
    console.log(BoolMatrix);
    console.log(SortPerCount(implicants));
    console.log(commonImplicants);
*/

    return{implicants, commonImplicants};
}

/**
 *  Усуває possition елемент
 * @param {string}str
 * @param {number}position
 * @return {string}
 * @constructor
 */
function RemoveSymbol(str, position)
{
    let result = '';
    for(let i = 0; i < str.length; ++i)
        if(i != position)
            result += str[i];
    return result;
}
//console.log(GetInterestCode("F0", 1))