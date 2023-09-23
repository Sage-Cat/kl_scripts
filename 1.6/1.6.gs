// Function to calculate Hamming code from the input data
function CAL_HAM_COD(data) {
    // Calculate the number of parity bits required based on the data length
    const n = data.length;
    let k = 0;
    while (Math.pow(2, k) < n + k + 1) {
        k++;
    }

    // Initialize the Hamming code with '0's
    let hammingCode = '0'.repeat(n + k);

    // Calculate the parity bits
    for (let i = 0; i < k; i++) {
        const parityBitIndex = Math.pow(2, i) - 1;

        for (let j = parityBitIndex; j < n + k; j += Math.pow(2, i + 1)) {
            for (let l = 0; l < Math.pow(2, i); l++) {
                if (j + l < n + k) {
                    if (data[j + l] === '1') {
                        // Flip the parity bit if the data bit is '1'
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

// Function to find errors in the Hamming code
function FIND_ERR(data) {
    // Calculate the number of parity bits required based on the data length
    const n = data.length;
    let k = 0;
    while (Math.pow(2, k) < n + k + 1) {
        k++;
    }

    const errorCodes = [];

    // Check for errors by flipping each bit in the data
    for (let i = 0; i < n; i++) {
        const corruptedData = data.split('');
        corruptedData[i] = corruptedData[i] === '0' ? '1' : '0';
        const hammingCode = CAL_HAM_COD(corruptedData.join(''));

        // Calculate the error position using parity bits
        let errorPosition = 0;
        for (let j = 0; j < k; j++) {
            errorPosition += parseInt(hammingCode[Math.pow(2, j) - 1], 2);
        }

        if (errorPosition > 0) {
            // Store error information
            errorCodes.push(data + " -> " + hammingCode + " : " + (errorPosition).toString(2));
        }
    }

    return errorCodes;
}

// MAIN_TEST function to execute the error detection process
function MAIN_TEST() {
    const input = prompt("Enter a sequence of 16 hexadecimal digits: ");
    const binaryInput = HEX2BIN_EXTENDED(input);

    const errorCodes = FIND_ERR(binaryInput);

    console.log("Error Codes:");
    for (const errorCode of errorCodes) {
        console.log(errorCode);
    }
}

// Call the MAIN_TEST function to start the program
MAIN_TEST();
