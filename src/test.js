// ------------------------------------ PUBLIC ------------------------------------

const { IS_F_MONOTONE , IS_F_LINEAR} = require("./is_monotone_or_linear");


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
  
 
    let monotoneResult = IS_F_MONOTONE(str_result);
    let linearResult = IS_F_LINEAR(str_result)
    let selfDualityResult = _selfDuality(str_n1, str_n2);
  
    const result = `Function : const0 = ${constZero}, const1 = ${constOne}, Monotone: ${monotoneResult}, Linear: ${linearResult}, Selfduality : ${selfDualityResult}`;
    console.log(result);
  }

  if (typeof module !== "undefined") {
    module.exports = {
      IS_F_MONOTONE,
      IS_F_LINEAR,
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
