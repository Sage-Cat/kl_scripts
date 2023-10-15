//=============================PUBLIC============================================
/** Підраховує к-сть необхідних елеменів для релізації функції у базисі Буля
 * @param {string} str 
 * @returns {string}
 */
function ELEMENTCOUNTER31(str)
{
    str += "";
    let result = new Map();

    let implicants = str.split('v');

    let andCounter = _andCounter(implicants);

    result.set("1НЕ", _notCounter(str));
    for(let i = 0; i < andCounter.length; ++i)
        result.set(i + 1 + "I", andCounter[i]);
    result.set(implicants.length + "АБО", 1);

    return result;
}

console.log(ELEMENTCOUNTER31("!abcdvab"));

module.exports = 
{
    ELEMENTCOUNTER31
};

//=============================PRIVATE============================================
/**Лічильник "НЕ"
 * @param {string} str 
 * @returns {number}
 */
function _notCounter(str)
{
    let counter = 0;
    if(str.includes("!ab"))
        ++counter;
    if(str.includes("!cd"))
        ++counter;
    if(str.includes("!e"))
        ++counter;
    if(str.includes("!g"))
        ++counter
    if(str.includes("!h"))
        ++counter;

    return counter;
}

/**Лічильник "I"
 * @param {string[]} implicants 
 * @returns {number[]}
 */
function _andCounter(implicants)
{
    let tmp = [];
    let result = [0,0,0,0,0];

    for(let i = 0; i < implicants.length; ++i)
    {
        let counter = 0;

        if(implicants[i].includes("ab"))
            ++counter;
        if(implicants[i].includes("cd"))
            ++counter;
        if(implicants[i].includes("e"))
            ++counter;
        if(implicants[i].includes("g"))
            ++counter;
        if(implicants[i].includes("h"))
            ++counter;
        tmp.push(counter);
    }

    for(let i = 0; i < tmp.length; ++i)
        ++result[tmp[i]-1];

    return result;
}