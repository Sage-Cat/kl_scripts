
/**
 * Створює повідомлення з 16-бітного тексту
 *@customfunction
 * @param {text} текст, який перетворюють
 * @return {text} сформований кож Хеммінга
 * 
 */

function formHemmCode(inputText){
  var result = [];
  var k_bits = [];

  for (var i = 0; i < inputText.length; i++) {
    result[i] = inputText.slice(i, i+1);
  }

  k_bits[0] = inputText[0] ^ inputText[1] ^ inputText[3] ^ inputText[4] ^ inputText[6] ^ inputText[8] ^ inputText[10] ^ inputText[11] ^ inputText[13] ^ inputText[15];
  k_bits[1] = inputText[0] ^ inputText[2] ^ inputText[3]^ inputText[5]^ inputText[6]^ inputText[9]^ inputText[10]^ inputText[12]^ inputText[13];
  k_bits[2] = inputText[1]^ inputText[2]^ inputText[3]  ^ inputText[7] ^ inputText[8]^ inputText[9]^ inputText[10]^inputText[14]^inputText[15];
  k_bits[3] = inputText[4]^ inputText[5]^ inputText[6]^ inputText[7]^ inputText[8]^ inputText[9]^inputText[10];
  k_bits[4] = inputText[11]^ inputText[12]^ inputText[13]^ inputText[14]^ inputText[15];
  
  mess = '' + k_bits[0];
  mess += k_bits[1];
  var n = 2;
  for (var i = 0; i < result.length; i++){
    if(i == 1 || i == 4 ||  i == 11)
    {
      mess += k_bits[n];
      n++;
    }
    mess += result[i];
    }
return(mess);

}