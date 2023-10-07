const { HEX2BIN_TETRAD, DEC2BIN_TRIAD } = require("./base_converts");

/**
 *
 * @param {string}text
 * @constructor
 * @return {string}text
 */
function FAL_MIN_1(text)
{
    let res = "";
    if(typeof text != "string")
        text = "" + text;

    let array = [];
    for(let i =0; i < 9; ++i)
        array.unshift(DEC2BIN_TRIAD(i));


    return array;
}

console.log(FAL_MIN_1(1));
