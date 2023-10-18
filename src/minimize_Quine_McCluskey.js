/**
 * Boolean Minimization Utility
 *
 * This module provides utility functions for minimizing Boolean functions using the Quine-McCluskey method.
 *
 * Data Structures:
 *
 * 1. Minterm: Represents a single term in the Boolean function.
 * 2. Group: A collection of minterms. These are categorized based on the number of ones present in them.
 * 3. Prime Implicant: A term that stands alone and cannot be further combined with any other term.
 *
 * Utility Functions:
 *
 * 1. convertToMinterms(func):
 *    - Input: A Boolean function represented in its algebraic form.
 *    - Output: A list of minterms derived from the given Boolean function.
 *
 * 2. groupMinterms(minterms):
 *    - Input: List of minterms.
 *    - Output: Minterms grouped by the number of ones present in them.
 *
 * 3. combineTerms(groups):
 *    - Input: Groups of minterms.
 *    - Output: A pair consisting of new groups formed by combining adjacent terms and a list of prime implicants.
 *
 * 4. createPrimeImplicantChart(minterms, primeImplicants):
 *    - Input: List of minterms and prime implicants.
 *    - Output: A chart that maps each minterm to its associated prime implicants.
 *
 * 5. selectEssentialPrimeImplicants(chart):
 *    - Input: Prime implicant chart.
 *    - Output: A list of essential prime implicants.
 *
 * 6. minimize(chart, essentialPrimeImplicants):
 *    - Input: Prime implicant chart and list of essential prime implicants.
 *    - Output: A minimized list of prime implicants required to represent the Boolean function.
 *
 * 7. generateResult(essentialPrimeImplicants, minimizedImplicants):
 *    - Input: List of essential and minimized prime implicants.
 *    - Output: The minimized Boolean expression in its algebraic form.
 *
 * Note: Ensure correct order of function invocation for accurate results.
 */

// Data Structures
class Minterm {
  constructor(binaryString, decimal) {
    this.binaryString = binaryString;
    this.decimal = decimal;
    this.isCombined = false;
    this.origin = [decimal];
  }
}

class Group {
  constructor(countOfOnes) {
    this.countOfOnes = countOfOnes;
    this.minterms = [];
  }
}

class PrimeImplicant {
  constructor(binaryString, cover) {
    this.binaryString = binaryString;
    this.cover = cover;
  }
}

function decimalToBinaryString(decimal, bitLength) {
  let binaryString = decimal.toString(2);
  while (binaryString.length < bitLength) {
    binaryString = "0" + binaryString;
  }
  return binaryString;
}

function convertToMinterms(hexValue) {
  let binaryString = hexToBinaryString(hexValue);
  let minterms = [];

  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[i] === "1") {
      minterms.push(new Minterm(decimalToBinaryString(i, 5), i));
    }
  }

  return minterms;
}

// groupMinterms(minterms)
function countOnes(binaryString) {
  return Array.from(binaryString).filter((char) => char === "1").length;
}

function groupMinterms(minterms) {
  let groups = [];

  for (let minterm of minterms) {
    let onesCount = (minterm.binaryString.match(/1/g) || []).length;

    if (!groups[onesCount]) {
      groups[onesCount] = new Group(onesCount);
    }

    groups[onesCount].minterms.push(minterm);
  }

  return groups;
}

// combineTerms(groups)
function areAdjacent(minterm1, minterm2) {
  let differenceCount = 0;
  let result = "";

  for (let i = 0; i < minterm1.binaryString.length; i++) {
    if (minterm1.binaryString[i] !== minterm2.binaryString[i]) {
      differenceCount++;
      result += "-";
    } else {
      result += minterm1.binaryString[i];
    }
  }

  if (differenceCount === 1) {
    return result;
  } else {
    return null;
  }
}

function combineAdjacentTerms(term1, term2) {
  let newTermBinary = "";
  for (let i = 0; i < term1.binaryString.length; i++) {
    if (term1.binaryString[i] === term2.binaryString[i]) {
      newTermBinary += term1.binaryString[i];
    } else {
      newTermBinary += "-";
    }
  }
  return new Minterm(newTermBinary, null); // Using Minterm instead of Term
}

function combineTerms(groups) {
  let newGroups = [];
  let primeImplicants = [];

  console.log("[combineTerms] Initial Groups:");
  for (let group of groups) {
    if (group && group.minterms) {
      console.log(group.minterms.map((term) => term.binaryString).join(", "));
    } else {
      console.log("[Error] Undefined group or missing minterms attribute.");
    }
  }
  console.log("-------");

  // Filter out undefined groups
  let definedGroups = groups.filter((group) => group && group.minterms);

  for (let i = 0; i < definedGroups.length - 1; i++) {
    let newGroup = new Group(definedGroups[i].countOfOnes + 1);

    for (let term1 of definedGroups[i].minterms) {
      for (let term2 of definedGroups[i + 1].minterms) {
        if (isAdjacent(term1, term2)) {
          term1.isCombined = true;
          term2.isCombined = true;

          let newTermBinary = combineAdjacentTerms(term1, term2);
          let newTerm = new Minterm(newTermBinary, null);

          if (
            !newGroup.minterms.some(
              (term) => term.binaryString === newTerm.binaryString
            )
          ) {
            newGroup.minterms.push(newTerm);
          }

          let cover = [...term1.origin, ...term2.origin];
          let primeImplicant = new PrimeImplicant(newTermBinary, cover);
          primeImplicants.push(primeImplicant);
        }
      }
    }

    if (newGroup.minterms.length > 0) {
      newGroups.push(newGroup);
    }
  }

  console.log("[combineTerms] New Groups After Combining:");
  for (let group of newGroups) {
    console.log(group.minterms.map((term) => term.binaryString).join(", "));
  }
  console.log("-------");

  console.log("[combineTerms] Prime Implicants:");
  for (let prime of primeImplicants) {
    console.log(prime.binaryString, "covers:", prime.cover.join(", "));
  }
  console.log("-------");

  return { newGroups, primeImplicants };
}

// createPrimeImplicantChart(minterms, primeImplicants):
function createPrimeImplicantChart(minterms, primeImplicants) {
  let chart = {};

  for (let minterm of minterms) {
    chart[minterm.decimal] = [];

    for (let primeImplicant of primeImplicants) {
      console.log("[Debugging] primeImplicant:", primeImplicant);
      if (primeImplicant.cover.includes(minterm.decimal)) {
        chart[minterm.decimal].push(primeImplicant.binaryString);
      }
    }
  }

  console.log("Prime Implicant Chart:");
  for (let minterm in chart) {
    console.log("Minterm:", minterm, "Covered by:", chart[minterm]);
  }
  console.log("-------");

  return chart;
}

// selectEssentialPrimeImplicants(chart)
function selectEssentialPrimeImplicants(chart) {
  let essentialPrimeImplicants = [];

  for (let minterm in chart) {
    if (chart[minterm].length === 1) {
      let primeImplicant = chart[minterm][0];
      if (!essentialPrimeImplicants.includes(primeImplicant)) {
        essentialPrimeImplicants.push(primeImplicant);
      }
    }
  }

  return essentialPrimeImplicants;
}

// minimize(chart, essentialPrimeImplicants)
function removeCoveredMinterms(chart, essentialPrimeImplicants) {
  let reducedChart = { ...chart };

  for (let minterm in reducedChart) {
    for (let primeImplicant of essentialPrimeImplicants) {
      if (reducedChart[minterm].includes(primeImplicant)) {
        delete reducedChart[minterm];
        break;
      }
    }
  }

  return reducedChart;
}

function generateCombinations(arr) {
  if (arr.length === 0) return [[]];
  let firstElem = arr.shift();
  let withoutFirst = generateCombinations(arr);
  let withFirst = withoutFirst.map((e) => [firstElem, ...e]);
  return withoutFirst.concat(withFirst);
}

function minimize(chart, essentialPrimeImplicants) {
  let reducedChart = removeCoveredMinterms(chart, essentialPrimeImplicants);
  let remainingMinterms = Object.keys(reducedChart);
  let remainingPrimeImplicants = [];

  for (let minterm in reducedChart) {
    remainingPrimeImplicants.push(...reducedChart[minterm]);
  }

  remainingPrimeImplicants = [...new Set(remainingPrimeImplicants)];

  let allCombinations = generateCombinations(remainingPrimeImplicants);
  let minimalCoverage = [];

  for (let combination of allCombinations) {
    let coveredMinterms = [];

    for (let primeImplicant of combination) {
      for (let minterm in reducedChart) {
        if (reducedChart[minterm].includes(primeImplicant)) {
          coveredMinterms.push(minterm);
        }
      }
    }

    coveredMinterms = [...new Set(coveredMinterms)];

    if (
      JSON.stringify(coveredMinterms.sort()) ===
      JSON.stringify(remainingMinterms.sort())
    ) {
      if (
        minimalCoverage.length === 0 ||
        combination.length < minimalCoverage.length
      ) {
        minimalCoverage = combination;
      }
    }
  }

  console.log("Minimized Implicants (excluding essential):");
  for (let implicant of minimalCoverage) {
    if (!essentialPrimeImplicants.includes(implicant)) {
      console.log(implicant);
    }
  }
  console.log("-------");

  return minimalCoverage.concat(essentialPrimeImplicants);
}

// generateResult(essentialPrimeImplicants, minimizedImplicants)
function implicantToExpression(implicant) {
  let expression = "";
  const variables = ["(ab)", "(cd)", "e", "g", "h"];

  for (let i = 0; i < implicant.length; i++) {
    if (implicant[i] === "1") {
      expression += variables[i];
    } else if (implicant[i] === "0") {
      expression += "!" + variables[i];
    }
  }

  return expression;
}

function generateResult(essentialPrimeImplicants, minimizedImplicants) {
  let result = [];

  for (let primeImplicant of essentialPrimeImplicants) {
    result.push(implicantToExpression(primeImplicant));
  }

  for (let primeImplicant of minimizedImplicants) {
    if (!essentialPrimeImplicants.includes(primeImplicant)) {
      result.push(implicantToExpression(primeImplicant));
    }
  }

  console.log("Final Minimized Expression:");
  console.log(result.join("+"));
  console.log("-------");

  return result.join("+");
}

// FULL PROCESS
function hexToBinaryString(hexValue) {
  let binaryString = parseInt(hexValue, 16).toString(2);
  while (binaryString.length < 32) {
    binaryString = "0" + binaryString;
  }
  return binaryString;
}

function minimize_Quine_McCluskey(hex_input) {
  let minterms = convertToMinterms(hex_input);
  let groups = groupMinterms(minterms);
  let combinedResult = combineTerms(groups);
  let chart = createPrimeImplicantChart(
    minterms,
    combinedResult.primeImplicants
  );
  let essentialPrimeImplicants = selectEssentialPrimeImplicants(chart);
  let minimizedImplicants = minimize(chart, essentialPrimeImplicants);
  let result = generateResult(essentialPrimeImplicants, minimizedImplicants);

  return result.split("+");
}

// You can then use the function as:
let minimizedResult = minimize_Quine_McCluskey("53433178");
console.log(minimizedResult);
