// ------------------------------------ PUBLIC ------------------------------------

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

  // TODO: візьми функцію Віталі
  let monotone =
    str_result[0] <= str_result[1] &&
    str_result[1] <= str_result[3] &&
    str_result[3] <= str_result[7] &&
    str_result[1] <= str_result[5] &&
    str_result[5] <= str_result[7] &&
    str_result[0] <= str_result[2] &&
    str_result[2] <= str_result[3] &&
    str_result[2] <= str_result[6] &&
    str_result[6] <= str_result[7] &&
    str_result[0] <= str_result[4] &&
    str_result[4] <= str_result[5] &&
    str_result[4] <= str_result[6];

  // TODO: те ж саме, переюзни готову функцію, а не копіпасти код
  let linear = true;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        parseInt(str_result[i]) ^
        (parseInt(str_result[j]) !== parseInt(str_result[i ^ j]))
      ) {
        linear = false;
        break;
      }
    }
  }

  // TODO: перепиши на англ
  const result = `�������: �����0 = ${constZero}, �����1 = ${constOne}, ������������: ${monotone}, ˳��������: ${linear}`;
  return result;
}

// TODO: зроби експорт

// ------------------------------------ PRIVATE ------------------------------------

function _selfDuality(inputStr, compareStr) {
  const invertedStr = inputStr
    .split("")
    .map((char) => (char === "0" ? "1" : "0"))
    .reverse()
    .join("");
  return invertedStr === compareStr;
}
