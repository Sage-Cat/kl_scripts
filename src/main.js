const {
  GET8_UNIQUE_LETTERS,
  GET_1_DIGIT,
  GET_2_DIGIT,
  GET_FULL_NUMBER,
  CREATE_ARRAY_OF_PAIRS,
  VARIANTS,
} = require("./string_manip");

const { GET_ENTROPY, GET_AVERAGE_LENGTH } = require("./calc");

const { GENERATE_HEMMING_CODE, TEST_HEMMING_CODE } = require("./hamming_code");

const {
  DEC2HEX_EXTENDED,
  DEC2BIN_EXTENDED,
  DEC2OCT_EXTENDED,
  HEX2DEC_EXTENDED,
  HEX2BIN_EXTENDED,
  HEX2OCT_EXTENDED,
  DEC2MODULAR,
  HEX2BIN_ONLY_INT,
  HEX2OCT_ONLY_INT,
  HEX2DEC_ONLY_INT,
  DEC2BIN_ONLY_INT,
  DEC2HEX_ONLY_INT,
  DEC2OCT_ONLY_INT,
} = require("./base_converts");

// Function to log test results in a tabulated format
function logTestResult(funcName, params, actual, expected) {
  const status = actual === expected ? "OK" : "FAIL";
  console.log(
    `${funcName.padEnd(40)} | ${params.toString().padEnd(60)} | ${actual
      .toString()
      .padEnd(40)} | ${status}`
  );
}

function main() {
  console.log(
    "Function Name".padEnd(40) +
      " | " +
      "Parameters".padEnd(60) +
      " | " +
      "Actual Output".padEnd(40) +
      " | " +
      "Status"
  );
  console.log(
    "-".repeat(40) +
      " | " +
      "-".repeat(60) +
      " | " +
      "-".repeat(40) +
      " | " +
      "-".repeat(6)
  );

  // Test string_manip functions
  logTestResult(
    "GET8_UNIQUE_LETTERS",
    ["Hello World"],
    GET8_UNIQUE_LETTERS("Hello World"),
    "HELOWRD"
  );
  logTestResult("GET_1_DIGIT", ["A", 1], GET_1_DIGIT("A", 1), 7);
  logTestResult("GET_2_DIGIT", ["A", 1], GET_2_DIGIT("A", 1), 8);
  logTestResult("GET_FULL_NUMBER", ["A", 1], GET_FULL_NUMBER("A", 1), 78);
  logTestResult(
    "CREATE_ARRAY_OF_PAIRS",
    ["ABCD"],
    CREATE_ARRAY_OF_PAIRS("ABCD"),
    ""
  ); // Expected output unknown

  // Test calc functions
  logTestResult("GET_ENTROPY", [[0.5, 0.5]], GET_ENTROPY([0.5, 0.5]), 1);
  logTestResult(
    "GET_AVERAGE_LENGTH",
    [
      ["00", "01", "10", "11"],
      [0.25, 0.25, 0.25, 0.25],
    ],
    GET_AVERAGE_LENGTH(["00", "01", "10", "11"], [0.25, 0.25, 0.25, 0.25]),
    2
  );

  // Test hamming_code functions
  logTestResult(
    "GENERATE_HEMMING_CODE",
    ["1010101010101010"],
    GENERATE_HEMMING_CODE("1010101010101010"),
    ""
  ); // Expected output unknown
  logTestResult(
    "TEST_HEMMING_CODE",
    ["some_code"],
    TEST_HEMMING_CODE("some_code"),
    ""
  ); // Expected output unknown

  // Test base_converts functions
  logTestResult("DEC2HEX_EXTENDED", ["255,0"], DEC2HEX_EXTENDED("255,0"), "FF");
  logTestResult(
    "DEC2BIN_EXTENDED",
    ["255,0"],
    DEC2BIN_EXTENDED("255,0"),
    "11111111"
  );
  logTestResult(
    "DEC2OCT_EXTENDED",
    ["255,0"],
    DEC2OCT_EXTENDED("255,0"),
    "377"
  );
  logTestResult("HEX2DEC_EXTENDED", ["FF,0"], HEX2DEC_EXTENDED("FF,0"), "255");
  logTestResult(
    "HEX2BIN_EXTENDED",
    ["FF,0"],
    HEX2BIN_EXTENDED("FF,0"),
    "11111111"
  );
  logTestResult("HEX2OCT_EXTENDED", ["FF,0"], HEX2OCT_EXTENDED("FF,0"), "377");
  logTestResult("DEC2MODULAR", [10, [3, 4]], DEC2MODULAR(10, [3, 4]), "(1, 2)");
  logTestResult("HEX2BIN_ONLY_INT", ["FF"], HEX2BIN_ONLY_INT("FF"), "11111111");
  logTestResult("HEX2OCT_ONLY_INT", ["FF"], HEX2OCT_ONLY_INT("FF"), "377");
  logTestResult("HEX2DEC_ONLY_INT", ["FF"], HEX2DEC_ONLY_INT("FF"), "255");
  logTestResult("DEC2BIN_ONLY_INT", [255], DEC2BIN_ONLY_INT(255), "11111111");
  logTestResult("DEC2HEX_ONLY_INT", [255], DEC2HEX_ONLY_INT(255), "FF");
  logTestResult("DEC2OCT_ONLY_INT", [255], DEC2OCT_ONLY_INT(255), "377");
}

// Run the main function to execute all tests
main();
