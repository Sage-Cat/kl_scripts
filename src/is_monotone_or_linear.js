const { HEX2BIN_EXTENDED } = require("./base_converts");
/**
 *
 * @param {number} number число, що тре переавести
 * @param {number} length довжина(к-сть розрядів) числа-результату
 * @param {number} radix Система числення, в яку тре перевести
 * @return {string}str результат завдовжки length, в системі числення radix
 * @constructor
 */
function DecTo(number, length, radix)
{
    let str = HEX2BIN_EXTENDED(number);
    while (str.length < length)
        str = "0" + str;
    return str;
}

/**
 *перевіряє функцію булевої алгебри на монотонніст
 * @param {string} data текст у вигляді двох цифр “12”
 * @constructor
 * @return {boolean} mono
 */
function IS_F_MONOTONE(data){
let str = DecTo(parseInt(data[0]), 4, 2) + DecTo(parseInt(data[1]), 4, 2);
let monotone = (
    (str[0] <= str[1])
    && (str[1] <= str[3])
    && (str[3] <= str[7])
    && (str[1] <= str[5])
    && (str[5] <= str[7])
    && (str[0] <= str[2])
    && (str[2] <= str[3])
    && (str[2] <= str[6])
    && (str[6] <= str[7])
    && (str[0] <= str[4])
    && (str[4] <= str[5])
    && (str[4] <= str[6])
);

return monotone;
}

/**
 *
 * @param {string}data текст у вигляді двох цифр “12”
 * @return {boolean}
 * @constructor
 */
function IS_F_LINEAR(data)
{
    let str = DecTo(parseInt(data[0]), 4, 2) + DecTo(parseInt(data[1]), 4, 2);
    let linear = true;
    for(let i = 0; i <= 7; ++i)
        for(let j = 0; j <= 7; ++j)
            if(parseInt(str[i^j]) != (parseInt(str[i]) ^ parseInt(str[j])))
            {
                linear = false;
                break;
            }
    return linear;
}
