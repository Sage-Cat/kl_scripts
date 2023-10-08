const { HEX2BIN_TETRAD, DEC2BIN_TRIAD } = require("./base_converts");

/**
 *
 * @param {string}fun функція задана рядком цифри шфтнадцяткоіої системи
 * @param {number}radix мінімізація за 1/0
 * @constructor
 * @return {string}text
 */
function _fal_minimisation(fal, radix = 1)
{
    let res = [];
    if(typeof fal != "string")
        fal = "" + fal;
    fal = HEX2BIN_TETRAD(fal);

    //відбір "цікавих" наборів
    let codes = [];
    for(let i =0; i < fal.length; ++i)
        if(fal[i] == radix)
        codes.push(DEC2BIN_TRIAD(i.toString()));

    codes = BetterSort(codes, radix);

    let implicants = [];
    let commonImplicants = [];
    //власне, мінімізація
    for(let i = 0; i < codes.length - 1; ++i)
    {
        //console.log("i = " + i);
        for (let j = 0; j < codes[i].length; ++j) {
            //console.log("j = " + j)
            for (let k = 0; k < codes[i + 1].length; ++k) {
                //console.log("k = " + k)
                let position = dif(codes[i][j], codes[i + 1][k]);
                let code = "";
                if (position != -1 && position != codes[i][j].length) {
                    code = codes[i][j];
                    implicants.push(replaceAt(code, position, "-"));
                }
            }
        }
    }

    return GetCommonImplicants(BetterSort(implicants, radix),implicants);



}

console.log(_fal_minimisation("81"));
//console.log(Counter("01010",1));

/**
 * рахує к-сть 1/0 в наборі
 * @param {string}code
 * @param {string}radix
 * @return {number} к-сть 1\0 у наборі
 */
function Counter(code, radix)
{
    code = "" + code;
    radix = "" + radix;

    let counter = 0;
    for(let i =0; i < code.length; ++i)
        if(code[i] == radix)
            ++counter;
    return counter;
}

/**
 *  якщо відмінність одна, то повертає позицію відмінності,
 *  якщо більше, то -1,
 *  якщо нема, то довжину рядка
 * @param {string}code1
 * @param {string}code2
 * @return {number}
 */
function dif(code1, code2)
{
    //console.log(code1 + " " + code2)
    let counter = 0;
    let position = 0;
    for(let i = 0; i < code1.length; ++i)
    if(code1[i] != code2[i])
    {
        ++counter;
        position = i;
        //console.log(code1[i] + " " + code2[i])
    }

    if(counter == 1)
        return position;
    if(counter == 0)
        return code1.length
    return -1;
}

/**
 *
 * @param {string}str
 * @param {number}pos
 * @param {string}sym
 * @return {string}
 */
function replaceAt(str, pos, sym)
{
    let res = "";
    let i = 0;

    while(i < str.length)
    {
        if(pos != i)
            res += str[i];
        else
            res += sym;
        ++i;
    }
    return res;
}

/**
 *
 * @param {any[]}codes
 * @param {string}radix
 * @return {*[]}
 * @constructor
 */
function BetterSort(codes, radix)
{

    console.log(codes);

    let temp = [];
    let tmp = [];

    for(let i = 0; i <= codes[0].length; ++i) {
        temp[i] = [];
        let count = 0;
        for (let j = 0; j < codes.length; ++j)
            if (Counter(codes[j], radix) == i) {
                temp[i][count++] = codes[j];
            }
    }

    //усунення порожніх підмасивів
    for(let i = 0; i < temp.length; ++i) {
        //console.log(i + " " + temp[i]);
        if (temp[i].length != 0)
            tmp.push(temp[i]);
    }

    return tmp;
}

/**
 *
 * @param {any[]}codes
 * @param {string[]}implicants
 * @return {string[]}
 * @constructor
 */
    function GetCommonImplicants(codes, implicants)
    {
        let commonImplicants = [];
        let tmp = [];

        for(let i = 0; i < codes.length; ++i)
            for(let j = 0; j < codes[i].length; ++j)
                tmp.push(codes[i][j]);

        for(let i = 0; i < tmp.length; ++i)
            for(let j = 0; j < implicants.length; ++j)
                if(dif(tmp[i], implicants[j]) != -1)
                    commonImplicants.push(tmp[i]);
        return commonImplicants;
    }