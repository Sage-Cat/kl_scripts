// ------------------------------------ PUBLIC ------------------------------------
const { HEX2BIN_TETRAD } = require("./base_converts");

function CHECK_FAL_FOR_ALL(n1, n2) {
    let constZero = false;
    let constOne = false;
  
    const str_n1 = (n1 >>> 0).toString(2).padStart(4, "0");
    const str_n2 = (n2 >>> 0).toString(2).padStart(4, "0");
  
    if (str_n1[0] === "0") {
      constZero = true;
    }
  
    if (str_n2[3] === "1") {
      constOne = true;
    }
  
    const str_x = str_n1.slice(1);
    const str_y = str_n2.slice(0, 3);
  
    const str_result = str_x + str_y;
  
 
    let monotoneResult = _is_f_monotone(str_result);
    let linearResult = _is_f_linear(str_result)
    let selfDualityResult = _selfDuality(str_n1, str_n2);
  
    const result = `Function : const0 = ${constZero}, const1 = ${constOne}, Monotone: ${monotoneResult}, Linear: ${linearResult}, Selfduality : ${selfDualityResult}`;
    console.log(result);
  }

  if (typeof module !== "undefined") {
    module.exports = {
      _is_f_monotone,
      _is_f_linear,
      _selfDuality,
      CHECK_FAL_FOR_ALL
    };
  }
  // ------------------------------------ PRIVATE ------------------------------------

  function _selfDuality(inputStr, compareStr) {
    const invertedStr = inputStr
      .split("")
      .map((char) => (char === "0" ? "1" : "0"))
      .reverse()
      .join("");
    return invertedStr === compareStr;
  }
  function _is_f_monotone(data){
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
function _is_f_linear(data)
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
CHECK_FAL_FOR_ALL(3,2)