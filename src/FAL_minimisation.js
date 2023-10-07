const { HEX2BIN_TETRAD, DEC2BIN_TRIAD } = require("./base_converts");

/**
 *
 * @param {string}fun функція задана рядком цифри шфтнадцяткоіої системи
 * @param {number}radix мінімізація за 1/0
 * @constructor
 * @return {string}text
 */
function _fal_minimisation(fun, radix = 1)
{
    let res = [];
    if(typeof fun != "string")
        fun = "" + fun;
    fun = HEX2BIN_TETRAD(fun);

    //відбір "цікавих" наборів
    let codes = [];
    for(let i =0; i < fun.length; ++i)
        if(fun[i] == radix)
        codes.push(DEC2BIN_TRIAD(i.toString()));


    //сортування
    let temp = [];

    for(let i = 0; i <= codes[0].length; ++i) {
        temp[i] = ["empty"];
        let count = 0;
        for (let j = 0; j < codes.length; ++j)
            if (Counter(codes[j], radix) == i) {
                temp[i][count++] = codes[j];
            }
    }

    codes = temp;

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