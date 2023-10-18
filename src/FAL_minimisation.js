const { HEX2BIN_TETRAD, DEC2BIN_TRIAD } = require("./base_converts");

//________________________Public_____________________

/**Мінімізує за 1
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
            result += "+";
    }
    return result;
}

/**Мінімізує за 0
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
            result = _removeSymbol(result, i + 1);
            --i;
        }


    for (let i = 0; i < result.length; ++i)
        if(
            result[i] == "+" && result[i+1] == ")"
        )
        {
            result = _removeSymbol(result, i);
            --i;
        }

    for (let i = 0; i < result.length; ++i)
        if(
            result[i] == "(" && result[i+2] == ")"
        )
        {
            result = _removeSymbol(result, i + 2);
            result = _removeSymbol(result, i );
            i += -2;
        }

    for (let i = 0; i < result.length; ++i)
        if(
            result[i] == "(" && result[i+1] == "!" && result[i+3] == ")"
        )
        {
            result = _removeSymbol(result, i + 3);
            result = _removeSymbol(result, i );
            i += -2;
        }
//*/
    return result;

}

module.exports = {
    MINIMIZATION41,
    MINIMIZATION40
};

/**Перебирає усі комбінації ДНФ (завд 2.3)
*@customfunction
* @param {text} текст, який перевіряють
* @param {text} текст, який є правильним
* @return {bool} результат перевірки
* @constructor
*/
function CheckForKNF(text, res)
{  
  let starttext = text.split(")")
  let impl = []

  for (i = 0; i < starttext.length - 1; i++)
  {
    impl[i] = starttext[i].replace("(", "")
  }

  resAr = []
  comb = get_permutations(impl, impl.length); //функція для комбінацій
  for(i = 0; i < comb.length; i++) // цикл для запису із +
  {
    let restext = "(" + comb[i][0];
    for(j = 1; j < impl.length; j++)
    {
      restext += ")(" + comb[i][j];
    }
    restext += ")";
    resAr[i] = restext;
  }
  resret = false; // немає збігу
  for(i = 0; i < resAr.length; i++)
  {
    if(resAr[i] === res)
    {
      resret = true; // якщо є збіг з комбінацій - переставляє, інакше - не змінюється
    }
  }
  
  return resret; 
 
}

/**Перебирає усі комбінації КНФ (завд 2.4)
*@customfunction
* @param {text} текст, який перевіряють
* @param {text} текст, який є правильним
* @return {bool} результат перевірки
* @constructor
*/

function CheckForDNF(text, res)
{
  let impl = text.split("+"); //сплітає +
  resAr = []
  comb = get_permutations(impl, impl.length); //функція для комбінацій
  for(i = 0; i < comb.length; i++) // цикл для запису із +
  {
    let restext = comb[i][0];
    for(j = 1; j < impl.length; j++)
    {
      restext += "+" + comb[i][j];
    }
    resAr[i] = restext;
  }
   resret = false; // немає збігу
  for(i = 0; i < resAr.length; i++)
  {
    if(resAr[i] === res)
    {
      resret = true; // якщо є збіг з комбінацій - переставляє, інакше - не змінюється
    }
  }
  return resret;
}

//_________________________PRIVATE_________________

/**мінімізує функцію задану str за radix
 * @param {string}str FF
 * @param {string}radix 1/0
 * @return {any[]} Масив простих імплікант
 */
function _minimization(str, radix)
{
    str = "" + str;
    radix = '' + radix;

    let interestCodes = _getInterestCode(str, radix);

    let commonImplicants = [];
    let implicants = _sortPerCount(interestCodes);
    
    do {
        let values
            = _getImplicants(implicants, commonImplicants);

        implicants = values.implicants;
        commonImplicants = values.commonImplicants;

    } while (implicants.length != 0)
//*/

    let coverMatrix = _coverMatrix(interestCodes, commonImplicants);

    return _getMDNF(coverMatrix, commonImplicants);
}

/**Виділення "цікавих" кодів
 * @param {string}str код у 16
 * @param {string}radix 1/0
 * @return {*[]}
 */
function _getInterestCode(str, radix)
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

/**Повертає к-сть 1 у str
 * @param {string}str
 * @constructor
 */
function _counter(str)
{
    let counter = 0;

    for(let i = 0; i < str.length; ++i)
        if(str[i] == "1")
            ++counter;

    return counter;
}

/**прибирає порожні підмасиви
 * @param {any[][]}array
 * @return {any[][]} повертає ТОЙ ЖЕ масив без порожніх підмасивів
 * @constructor
 */
function _removeSpaces(array)
{
    for(let i = 0; i < array.length; ++i)
        if(array[i].length == 0) {
            array.splice(i, 1);
            --i;
        }

    return array;
}

/**Сортує масив за к-стю 1 в коді
 * @param {string[]}unsortedArrayOfCodes
 * @return {any[][]}
 */
function _sortPerCount(unsortedArrayOfCodes)
{
    let result = [];
    if(unsortedArrayOfCodes.length > 0)
    for(let i = 0; i <= unsortedArrayOfCodes[0].length; ++i) {
        result[i] = [];
        for(let j = 0; j < unsortedArrayOfCodes.length; ++j)
            if(_counter(unsortedArrayOfCodes[j]) == i)
                result[i].push(unsortedArrayOfCodes[j]);
    }

    //_removeSpaces(result);

    return _removeSpaces(result);
}

/**Порівнює 2 рядки, якщо є 1 відмінність,
 * то повертає її позицію. Якщо їх нема,
 * або > 1, то повертає -1
 * @param {string}str1
 * @param {string}str2
 * @return {number}
 */
function _compare(str1, str2)
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

/**Заміняє position-ий символ рядка на заданий символ
 * @param {string}str рядок
 * @param {number}position позиція
 * @param {string}symbol символ
 * @return {string}
 * @constructor
 */
function _replaceAt(str, position, symbol)
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

/**Прибирає елементи, що повторюються
 * @param {any[]}array
 * @return {*[]}
 * @constructor
 */
function _removeTheSame(array)
{
    let result = [];
    for (let i = 0; i < array.length; ++i)
        if(!result.includes(array[i]))
            result.push(array[i]);
    return result;
}

/**Знаходить прості та звичайні імпліканти
 * @param {any[]}codes масив кодів (імплікант)
 * @param commonImplicants прості імпліканти
 * @return {{implicants: *[], commonImplicants: *[]}} об♥єкт {звичайні імпліканти, проті імпліканти}
 * @constructor
 */
function _getImplicants(codes, commonImplicants)
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
                let position = _compare(codes[i][j], codes[i + 1][k]);
                if(position != -1)
                {
                    implicants.push(_replaceAt(codes[i][j], position, "-"));
                    BoolMatrix[i][j] = 1;
                    BoolMatrix[i + 1][k] = 1;
                }
            }
        }

    implicants = _sortPerCount(_removeTheSame(implicants));

    for(let i = 0; i < BoolMatrix.length; ++i)
        for(let j = 0; j < BoolMatrix[i].length; ++j)
            if(BoolMatrix[i][j] === 0)
                commonImplicants.push(codes[i][j]);

    return{implicants, commonImplicants};
}

/**Усуває possition елемент
 * @param {string}str
 * @param {number}position
 * @return {string}
 * @constructor
 */
function _removeSymbol(str, position)
{
    let result = '';
    for(let i = 0; i < str.length; ++i)
        if(i != position)
            result += str[i];
    return result;
}

/**Перевіряє, чи implicant перекриває code
 * @param {string} code 
 * @param {string} implicant 
 * @returns {boolean} true|false
 */
function _isCover(code, implicant) {
    let result = true;
    for(let i = 0; i < code.length; ++i){
        //console.log(i);
        if(!(code[i] == implicant[i] || implicant[i] == "-"))
            result = false;}
    return result;
}

/** Повертає матрицю покриття
 * @param {string[]} codes 
 * @param {string[]} implicants 
 * @returns {boolean[][]}
 */
function _coverMatrix(codes, implicants)
{
    let coverMatrix = [];

    for(let i = 0; i < codes.length; ++i){
            coverMatrix[i] = [];
            for(let j = 0; j < implicants.length; ++j)
                coverMatrix[i][j] = _isCover(codes[i], implicants[j]);
    }

    return coverMatrix;
}

/** Повертає МДНФ
 * @param {boolean[][]} coverMatrix 
 * @param {string[]} implicant 
 * @returns {string[]}
 */
function _getMDNF(coverMatrix, implicants)
{
    for(let i = 0; i < coverMatrix.length; ++i)
    {
        let counter = 0;
        for(let j = 0; j < coverMatrix[i].length; ++j)
            if(coverMatrix[i][j])
                counter++;

        if(counter == 1)
        {
            let position = -1;
            for(let j = 0; j < coverMatrix[i].length; ++j)
                if(coverMatrix[i][j])
                {
                    position = j;
                    break;
                }
                
            for(let k = coverMatrix.length - 1; k >= 0; --k)
                if(coverMatrix[k][position] && k != i)
                    coverMatrix.splice(k, 1);
        }
    }

    let forDelete = [];

    for(let j = coverMatrix[0].length - 1; j >= 0; j--)
        for(let i = 0; i < coverMatrix.length; ++i)
            if(coverMatrix[i][j] && !forDelete.includes(j))
            {
                for(let k = i; k < coverMatrix.length; ++k)
                    if(coverMatrix[k][j])
                        for(let l = 0; l < coverMatrix[k].length; ++l)
                            if(l != j && coverMatrix[k][l] && !forDelete.includes(l))
                                forDelete.push(l);
            }    
            
    for(let i = implicants.length - 1; i >= 0; --i)
        if(forDelete.includes(i))
            implicants.splice(i,1);

    return implicants;
}

// приватна функція (до CheckForKNF та CheckForDNF)
function get_permutations(arr, select) {
    if (select === 0) {
        return [[]]; // Пустий масив - одна можлива комбінація
    }

    if (arr.length < select) {
        return []; // Немає можливих комбінацій
    }

    if (select === 1) {
        return arr.map(function(item) {
            return [item];
        });
    }

    var permutations = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var rest = arr.slice(0, i).concat(arr.slice(i + 1));
        var subPermutations = get_permutations(rest, select - 1);
        for (var j = 0; j < subPermutations.length; j++) {
            permutations.push([item].concat(subPermutations[j]));
        }
    }
    return permutations;
}
