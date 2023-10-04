const { HEX2BIN_TETRAD } = require("./base_converts");
/**
 *перевіряє функцію булевої алгебри на монотонніст
 * @param {string} data текст у вигляді двох цифр “12”
 * @constructor
 * @return {boolean} mono
 */
function IS_F_MONOTONE(data){
  if(typeof(data != "string"))
    data = "" + data;
let str = HEX2BIN_TETRAD(data);
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
  if(typeof(data != "string"))
    data = "" + data;
    let str = HEX2BIN_TETRAD(data);
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