const { HEX2BIN_TETRAD } = require("./base_converts");

function CHECK_FOR_FULLFUNC(n1, n2){
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
  
 
    let monotoneResult = IS_F_MONOTONE(str_result);
    let linearResult = IS_F_LINEAR(str_result)
    let selfDualityResult = IS_F_SELFDUAL(str_n1, str_n2);
  
    const result = `Function : const0 = ${constZero}, const1 = ${constOne}, Monotone: ${monotoneResult}, Linear: ${linearResult}, Selfduality : ${selfDualityResult}`;
    console.log(result);
  }

  if (typeof module !== "undefined"){
    module.exports = {
      IS_F_MONOTONE,
      IS_F_LINEAR,
      IS_F_SELFDUAL,
      CHECK_FOR_FULLFUNC
    };
  }

  function IS_F_SELFDUAL(inputStr, compareStr){
    const invertedStr = inputStr
      .split("")
      .map((char) => (char === "0" ? "1" : "0"))
      .reverse()
      .join("");
    return invertedStr === compareStr;
  }
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
function IS_F_LINEAR(data){
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