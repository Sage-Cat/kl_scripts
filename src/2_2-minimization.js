function decimalToBinaryString(decimalNumber) {
    if (decimalNumber === 0)
        return "00000";

    let binaryString = "";

    while (decimalNumber > 0) {
        binaryString = (decimalNumber % 2).toString() + binaryString;
        decimalNumber = Math.floor(decimalNumber / 2);
    }

    while (binaryString.length < 5)
        binaryString = "0" + binaryString;

    return binaryString;
}

function returnbinaryarray(str){
    let nums = [];
    for (let i = 0; i < str.length; i++){
        if(str[i] === "1" || str[i] === "X"){
            let tmp = decimalToBinaryString(i);
            nums.push(tmp);
        }
    }
    return nums;
}
function ifzero(nums){
  let arr = [];
  if(nums[0] === "00000"){
    let obj = {
        key1: nums[0],
        key2: "-"
    }
    arr.push([obj]);
    nums.splice(0, 1);
    return arr;
  }
  else{
    let counter = 0;
    for(let i = 0; i < nums[0].length; i++){
      if(nums[0][i] === "1"){
        counter++;
      }
    }
    if(counter > 0){
      return;
    }
    if(arr.length === undefined){
      return;
    }
    else{
      let obj = {
        key1: nums[0],
        key2: "-"
      }
      arr.push([obj]);
      return arr;
    }
  }
  
}
function sortbyones(nums) {
    let sorted_ones = [];
    let size = 4;
    let zero = ifzero(nums);
    for(let i = 0; i < size; i++){
        sorted_ones.push([]);
    }
    for(let i = 0; i < nums.length; i++){
        let counter_ones = 0;
        for(let j = 0; j < nums[i].length; j++){ 
            if(nums[i][j] === "1"){
                counter_ones++;
            }
        }
        let obj = {
          key1: nums[i],
          key2: "-"
        }
        let tmp = counter_ones -1;
        if (!sorted_ones[tmp]) {
            sorted_ones[tmp] = [];  // Создаем массив, если его нет
        }
       
        sorted_ones[tmp].push(obj);
    }
    let sorted_nums;
    if(zero === undefined){
      sorted_nums = sorted_ones;
    }
    else{
      sorted_nums = zero.concat(sorted_ones);
    }
    console.log(sorted_nums);
    return sorted_nums;
}
function findDifference(str1, str2) {
    let differenceIndex = 0;
    let index = 0;
    for (let i = 0; i < str1.length; ++i) {
        if (str1[i] !== str2[i]) {
            differenceIndex++;
            index = i;
        }
    }
    if(differenceIndex > 1){
       return -1;
    }
    return index;    
}

function replaceCharAtIndex(str, index, newChar) {
    if (index < 0 || index >= str.length) {
        return str; // индекс находится за пределами строки
    }

    // Формируем новую строку с замененным символом
    return str.substring(0, index) + newChar + str.substring(index + 1);
}

function difference(sorted_ones, sopli){
    let sorted = sorted_ones;
    let implicants = [];
    let diff;
    for (let v = 1; v < sorted.length; v++) {
         for (let x = 0; x < sorted[v - 1].length; ++x) {
            for (let i = 0; i < sorted[v].length; ++i) {
                diff = findDifference(sorted[v - 1][x].key1, sorted[v][i].key1);
                if(diff != -1){
                    sorted[v][i].key2 = "+";
                    sorted[v-1][x].key2  = "+";
                    let tmp = sorted[v][i].key1;
                    let str = replaceCharAtIndex(tmp, diff, "X");
                    let obj = {
                        key1: str,
                        key2: "-"
                    }
                    implicants.push(obj);                   
                }
                else{
                    continue;
                }
            }
        }
    }
    console.log(sorted_ones);
    for(let i = 0; i < sorted.length; i++){
      for(let j = 0; j < sorted[i].length; j++)
        if(sorted[i][j].key2 === "-"){
          sopli.push(sorted[i][j].key1);
        }
    }
    return implicants;
}
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
function gluing (implicants, sopli) {
    let strarr = []
    for(let i = 0; i < implicants.length; i++){
        strarr.push(implicants[i].key1);
    }
    
    let array = sortbyones(strarr);
    let res = difference(array, sopli);
    let cond = true
    let impli = [];
    let counter = 0;
    while(cond) {
        for(let i = 0;i < res.length; i++){
            if(res[i].key2 === "-"){
                impli.push(res[i].key1);
                counter++;
            }
        }
        if(counter !== res.length){
            counter -= 2*counter;
        }
        else{
            cond = false;
            break;
        }
        array = sortbyones(res);
        res = difference(res);
    }
    return impli;
}
function findDifference_forTable(str1, str2) {
    let differenceIndex = 0;
    for (let i = 0; i < str1.length; ++i) {
        if (str2[i] === "X") {
            continue;
        }
        if (str1[i] !== str2[i]) {
            differenceIndex++;
        }
    }
    if (differenceIndex > 1) {
        return -1;
    }
    return differenceIndex;
}
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let row = '';
    for (let j = 0; j < matrix[i].length; j++) {
      row += matrix[i][j] + '\t';
    }
    console.log(row);
  }
}
function create_implicant_table(impli, str) {
    let nums = [];
    for (let i = 0; i < str.length; i++){
        if(str[i] === "1"){
            let tmp = decimalToBinaryString(i);
            nums.push(tmp);
        }
    }
    const numRows = nums.length + 1;
    const numCols = impli.length + 1;

    // Initialize the table with zeros
    const implicant_table = Array.from({ length: numRows }, () => Array(numCols).fill('0'));

    // Fill the first row with implicants
    for (let i = 1; i < numCols; i++) {
        implicant_table[0][i] = impli[i - 1];
    }

    // Fill the first column with nums
    for (let i = 1; i < numRows; i++) {
        implicant_table[i][0] = nums[i - 1];
    }
    // Fill the table based on differences, considering 'X' as matching '0' or '1'
    for (let i = 1; i < numRows; i++) {
        for (let j = 1; j < numCols; j++) {
            const implicantChar = implicant_table[i][0];
            const numChar = implicant_table[0][j];
            let diff = findDifference_forTable(implicantChar, numChar);
            if(diff == 0){
              implicant_table[i][j] = "1";
            }

        }
    }

    let resultArray = [];

    for (let i = 1; i < implicant_table.length; i++) {
        let tmp_arr = [];  // Создаем новый массив для каждой строки

        for (let j = 1; j < implicant_table[i].length; j++) {
            if (implicant_table[i][j] === '1') {
                console.log(implicant_table[0][j]);
                tmp_arr.push([implicant_table[0][j], j]);
            }
        }

        resultArray.push(tmp_arr);
    }
    // Выводим таблицу
    printMatrix(implicant_table);

    return resultArray;
}
function createMap(resultArray){
  const HashMap = new Map();
  for(let i = 0; i < resultArray.length; i++){
    for(let j = 0; j < resultArray[i].length; j++){
      HashMap.set(resultArray[i][j][1], resultArray[i][j][0]);
    }
  }
  console.log("Hash - ", HashMap);
  return HashMap;
}   
function counterNums(num){
  let counter = 0;
    for(let i = 0; i < num.length; i++){

        if(num[i] === "X"){
            continue;
        }
        if(i > 2){
            counter+2;
        }
        counter++;
    }
    return counter;
}

function delete_nums(resultArray){
    let max = 0;
    for(let i = 0; i < resultArray.length; i++){
        max = counterNums(resultArray[i][0][0]);
        for(let j = 0; j < resultArray[i].length; j++){
            let tmp = counterNums(resultArray[i][j][0]);
            if(tmp > max){
                max = tmp;
                resultArray[i].splice(j, 1);
            }
        }
    }
}

class Queue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(item) {
      this.queue.push(item);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return 0;
      }
      return this.queue.shift();
    }
  
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue[0];
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    size() {
      return this.queue.length;
    }
  } 
  function func(que, resultArray, result, indexQue){
    let tmp = que.dequeue();
    for(let i = 0; i < resultArray.length; i++){
      for(let k = 0; k < resultArray[i].length; k++){
        let diff = findDifference(tmp, resultArray[i][k][0]);
        if(diff == 0){
          let indextoremove = resultArray.indexOf(resultArray[i]);
          result.push([[tmp, indexQue.dequeue()]]);
          resultArray.splice(indextoremove, 1);
          break;
        }
      }
    }
    result.push([[tmp, indexQue.dequeue()]]);
  }
  function simplifyImplic(resultArray){
    let result = [];
    let indexQue = new Queue();
    let balance = 0;
    for(let i = 0; i < resultArray.length; i++){
        if(resultArray[i].length == 1){
          indexQue.enqueue(resultArray[i][0][1]);
          let index = resultArray.indexOf(resultArray[i]);
          resultArray.splice(index - balance, 1);
          i--;
        }
    }
    const size = indexQue.size();
      console.log(indexQue.queue);
      console.log("resultArray", resultArray);
      for(let i = 0; i < size; i++){
        let deque = indexQue.dequeue();
        console.log("deque", deque);
        for(let j = 0; j < resultArray.length; j++){
            for(let k = 0; k < resultArray[j].length; k++){
                if(deque == resultArray[j][k][1]){
                    resultArray.splice(j, 1);
                    console.log("after delete", resultArray);
                    j--;
                    break;
                }
            }
        }
        result.push([deque]);
      }
      console.log(resultArray);
      
      for(let i = 0; i < resultArray.length; i++){
        let tmp = [];
        for(let j = 0; j < resultArray[i].length; j++){
          let g = resultArray[i][j][1];
          tmp.push(g);
        }
        result.push(tmp);    
      }
    console.log("result", result);
    return result;
}

function createfExpression(implicant_table){
  let expression = "";
  for(let i = 0; i < implicant_table.length; i++){
    if(implicant_table[i].length == 1){
      expression += "I" + implicant_table[i][0][1].toString();
    }
    else{
      expression += "(" + "I" + implicant_table[i][0][1].toString();
      for(let j = 1; j < implicant_table[i].length; j++){
        expression += " v" + " I" + implicant_table[i][j][1].toString();
      }
      expression += ")";
    }
  }

  return expression;
}

// function multiplyArrays(arr1, arr2, resu, ones) {
//   // let tmpres = [];
//   // for(let i = 0; i < arr1.length; i++){
//   //   tmpres.push(arr1[i]);
//   // }
//   // console.log("tmpres", tmpres);
//     for (let i = 0; i < arr1.length; i++) {
//       let tmp = [];
//       let tmpres = arr1;
//       let tmptmp =[]
//         for (let j = 0; j < arr2.length; j++) {
//             if(tmpres[i] === arr2[j]){
//                 ones.push(arr1[i]);
//                 continue;
//             }
//             else{
//               if(tmpres[i].length > 1){
//                 tmpres[i].push(arr2);
//                 tmp.push(tmpres[i]);
//               }
//               else{
//                 tmp.push(tmpres[i], arr2);
//               }
              
//             }
            
//         }
//     }
//     resu.length = 0;
//     for(let i = 0; i < tmpres.length; i++){
//       resu.push(tmpres[i]);
//     }
// }
function fn(strarr){
  let res = []; 
  let sames = [];
  let tmp = strarr;
  for(let k = 0; k < strarr.length; k++){
    let arr = strarr[0];
    strarr.splice(0, 1);
    k--;
    for(let i = 0; i < strarr.length; i++){
      for(let j = 0; j < arr.length; j++){
        if(arr[j] === strarr[i]){
          sames.push(arr[j]);
          let index = arr.indexOf(arr[j]);
          arr.splice(index);
          j--;
          continue; 
        }
        else{
          if(strarr[i].length > 1){
            strarr[i].push(arr[j]);
          }
          else{
            res.push([strarr[i], arr[j]]);
          }      
        }
      }
    }
  }
  console.log(res);
}
function simplifyExpression(expression) {
    counter = 0;
    for(let i = 0; i < expression.length; i++){
        if(expression[i].length > 1){
            counter++;
        }
    }
    let arr = [];
    if(counter > 1){
        for(let i = 0; i < expression.length; i++){
            let tmp = expression[i].length;
            if(tmp > 1){
                arr.push(expression[i]);
                expression.splice(i, 1);
                i--;
            }
        }
    }
    console.log("arr - ",arr);
    let resu = [];
    let ones = [];
    for(let i = 0; i < arr[0].length; i++){
      resu.push([arr[0][i]]);
    }
    arr.splice(0, 1);
    if (arr.length > 1){
      while(arr.length > 1){
        let arr1 = resu;
        let arr2 = arr[0];
        arr.splice(0, 1);
        multiplyArrays(arr1, arr2,resu, ones);
      }
    }
    console.log("resu", resu);
    console.log("expr", expression);
    if(ones.length > 0){
        for(let i = 0; i < ones.length; i++){
            expression.push([ones[i]]);
        }
    }
    for(let i = 0; i < resu.length; i++){
        expression.push(resu[i]);
    }
    console.log('expression', expression);
}

function cresteexpr(simplified){
  let retr = [];
  let doble = [];
  for(let i = 0; i < simplified.length; i++){
    if(simplified[i].length <= 1){
      retr.push(simplified[i]);
    }
    else{
        doble.push(simplified[i]);
    }
  }
  retr.push(doble);
  console.log("expr", retr);
  return retr;
}
function remove_same_arrs(retr){
  for(let i = 0; i < retr.length; i++){
    for(let j = 0; j < retr.length;j++){
      if(i === j){
        continue;
      }
      let tmp1 = retr[i];
      let tmp2 = retr[j];
      if(tmp1.length === tmp2.length){
        let counter = 0;
        for(let k = 0; k < tmp1.length; k++){
          if(tmp1[k] == tmp2[k]){
            continue;
          }
          counter++;
        }
        if(counter == 0){
          let indextoremove = retr.indexOf(retr[j]);
          retr.splice(indextoremove, 1);
          j--;
        }
      }
    }
  }
  console.log("after removes", retr);
}
function toStr(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let tmp = [];
    for (let j = 0; j < arr[i].length; j++) {
      tmp.push(arr[i][j].toString());
    }
    result.push(tmp);
  }
  console.log("str", result);
  return result;
}

function findAndRemoveDuplicates(strarr){
  let ones = [];
  for(let x = 0; x < strarr.length; x++){
    for(let i = 0; i < strarr[x].length; i++){
    for(let j = 0; j < strarr.length; j++){
      for(let k = 0; k < strarr[j].length;k++){
        let tmp1 = strarr[x][i];
        let tmp2 = strarr[j][k];
        if(x === j && i === k){
          continue;
        }
        if(strarr[x][i] === strarr[j][k]){
          ones.push(strarr[x][i]);
          let index = strarr[x].indexOf(strarr[x][i]);
          strarr[x].splice(index, 1);
          let index2 = strarr[j].indexOf(strarr[j][k]);
          strarr[j].splice(index2, 1);
          k--;
          break;
        }
      }
    }
  }
  }
  
  console.log(ones);
  console.log(strarr);
}
function main() {
  let str = 'X11X01X10X11X01X01X00X1X01X10X11';
  let binaryarray = returnbinaryarray(str);
  let res = sortbyones(binaryarray);
  let sopli = [];
  console.log(sopli);
  let implicants = difference(res, sopli);
  let glued = gluing(implicants, sopli);
  console.log(sopli);
  let rowarr = glued.concat(sopli);
  rowarr = removeDuplicates(rowarr);
  console.log(rowarr);
  let implicant_table = create_implicant_table(rowarr, str);
  console.log(implicant_table);
  let Hashs = createMap(implicant_table);
  let expression = createfExpression(implicant_table);
  console.log(expression);
  let tr = simplifyImplic(implicant_table);
  console.log(tr);
  removeDuplicates(tr);
  remove_same_arrs(tr);
  let strw = toStr(tr);
  findAndRemoveDuplicates(strw);

}
