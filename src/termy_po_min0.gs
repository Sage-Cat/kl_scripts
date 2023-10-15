/**
 * Перебирає усі комбінації
 *@customfunction
 * @param {text} текст, який перевіряють
 * @param {text} текст результат
 * @return {text} результат перестановки
 * 
 * 
 */
function sortTermMin0(text, res)
{  
  let starttext = text.split(")")
  let impl = []

  for (i = 0; i < starttext.length - 1; i++)
  {
    impl[i] = starttext[i].replace("(", "")
  }

  resAr = []
  comb = getPermutations(impl, impl.length); //функція для комбінацій
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
  resret = text; //дорівнює тексту на вході
  for(i = 0; i < resAr.length; i++)
  {
    console.log(resAr[i])
    if(resAr[i] === res)
    {
      console.log("є сигнал");
      resret = resAr[i]; // якщо є збіг з комбінацій - переставляє, інакше - текст не змінюється
    }
  }
  console.log(comb);
  console.log(resAr);
  console.log(resret);
  return resret; 
  
  console.log(impl);
  
}

function getPermutations(arr, select) {
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
        var subPermutations = getPermutations(rest, select - 1);
        for (var j = 0; j < subPermutations.length; j++) {
            permutations.push([item].concat(subPermutations[j]));
        }
    }
    return permutations;
}
