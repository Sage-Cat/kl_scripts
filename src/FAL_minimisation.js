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


    //сортування
    let temp = [];

    for(let i = 0; i <= codes[0].length; ++i) {
        temp[i] = [];
        let count = 0;
        for (let j = 0; j < codes.length; ++j)
            if (Counter(codes[j], radix) == i) {
                temp[i][count++] = codes[j];
            }
    }

    //усунення порожніх підмасивів
    for(let i = 0; i < temp.length; ++i)
        if(temp[i].length == 0)
            temp.splice(i, 1);
    codes = temp;
    temp.splice(0,temp.length);

    /*
    //власне, мінімізація
    for(let i = 1; i < codes.length - 1; ++i)
        for(let j = 0; j < codes[i].length; ++i)
            for(let k = 0; k < codes[i+1].length; ++k)
            {
                let position = dif(codes[i][j],codes[i+1][k]);
                let code = "";
                if(position != -1) {
                    code = codes[i][j];
                    code[position] = "-";
                    temp.push(code);
                }
            }
*/

    return codes;
}

console.log(_fal_minimisation("FE"));
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
 *
 * @param {string}code1
 * @param {string}code2
 * @return {number}
 */
function dif(code1, code2)
{
    let counter = 0;
    let position = 0;
    for(let i = 0; i < code1.length; ++i)
    if(code1[i] != code2[i])
    {
        ++counter;
        position = i;
    }

    if(counter == 1)
        return position;
    else
        return -1;
}