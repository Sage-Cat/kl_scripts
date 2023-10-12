/** Підраховує к-сть необхідних елеменів для релізації функції у базисі Буля
 * @param {string} str 
 * @returns {string}
 */
function ElementCounter(str)
{
    str += "";
    let result = new Map();

    let implicants = str.split('v');

    let andCounter = AndCounter(implicants);

    result.set("1НЕ", NotCounter(str));
    for(let i = 0; i < andCounter.length; ++i)
        result.set(i + 1 + "АБО", andCounter[i]);
    result.set(implicants.length + "І", 1);

    return result;
}

//console.log(ElementCounter("ghvab!ehv!abcd!egvcdehvabh!cd"));

/**Лічильник "НЕ"
 * @param {string} str 
 * @returns {number}
 */
function NotCounter(str)
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
function AndCounter(implicants)
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