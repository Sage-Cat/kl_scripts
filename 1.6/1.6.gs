function CAL_HAM_COD(data) {
    const n = data.length;
    let k = 0;
    while (Math.pow(2, k) < n + k + 1) {
        k++;
    }

    let hammingCode = '0'.repeat(n + k);

    for (let i = 0; i < k; i++) {
        const parityBitIndex = Math.pow(2, i) - 1;

        for (let j = parityBitIndex; j < n + k; j += Math.pow(2, i + 1)) {
            for (let l = 0; l < Math.pow(2, i); l++) {
                if (j + l < n + k) {
                    if (data[j + l] === '1') {
                        hammingCode = hammingCode.substr(0, parityBitIndex) +
                            (hammingCode[parityBitIndex] === '0' ? '1' : '0') +
                            hammingCode.substr(parityBitIndex + 1);
                    }
                }
            }
        }
    }

    return hammingCode;
}

function FIND_ERR(data) {
    const n = data.length;
    let k = 0;
    while (Math.pow(2, k) < n + k + 1) {
        k++;
    }

    const errorCodes = [];

    for (let i = 0; i < n; i++) {
        const corruptedData = data.split('');
        corruptedData[i] = corruptedData[i] === '0' ? '1' : '0';
        const hammingCode = CAL_HAM_COD(corruptedData.join(''));

        let errorPosition = 0;
        for (let j = 0; j < k; j++) {
            errorPosition += parseInt(hammingCode[Math.pow(2, j) - 1], 2);
        }

        if (errorPosition > 0) {
            errorCodes.push(data + " -> " + hammingCode + " : " + (errorPosition).toString(2));
        }
    }

    return errorCodes;
}

function main() {
    const input = prompt("Enter a sequence of 16 hexadecimal digits: ");
    const binaryInput = HEX2BIN_EXTENDED(input);

    const errorCodes = FIND_ERR(binaryInput);

    console.log("Error Codes:");
    for (const errorCode of errorCodes) {
        console.log(errorCode);
    }
}

main();
