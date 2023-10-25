/**
 * minimize_Quine_McCluskey_Petrick.js
 *
 * - `Term` class: Represents a term with a binary string.
 *
 * - `combineAdjacentTerms(term1, term2)`: Combines two adjacent terms.
 *
 * - `formInitialGroups(input)`: Forms initial groups based on the input.
 *
 * - `findMinterms(terms)`: Identifies minterms from given terms.
 *
 * - `isAdjacent(term1, term2)`: Checks if two terms are adjacent.
 *
 * - `createImplicantsChart(terms, minterms)`: Creates a prime implicant chart.
 *
 * - `compareTermAndMinterm(binaryTerm, binaryMinterm)`: Compares a term and a minterm.
 *
 * - `printCrossingMintermsChart(chart)`: Prints the minterms chart.
 *
 * - `padString(str, len)`: Pads a string to a specified length.
 *
 * - `centerPadString(str, len)`: Center-pads a string to a specified length.
 *
 * - `findEssentialPrimeImplicants(chart)`: Identifies essential prime implicants from a chart.
 *
 * - `generatePOS(chart, essentialPIs)`: Generates a Product-of-Sums expression.
 *
 * - `convertPOSToSOP(essentialImplicants, chart)`: Converts a POS expression to a SOP expression.
 *
 * - `binaryToLiteral(binaryString, implicantIndex)`: Converts a binary string to its literal representation.
 *
 * - `binaryToExpression(binaryString)`: Converts a binary string to an expression.
 *
 * - `convertImplicantsToExpression(implicants)`: Converts implicants to their expression form.
 *
 * - `selectMinimumCover(sopExpression)`: Selects the minimum cover for a SOP expression.
 *
 * - `minimize_Quine_McCluskey_Petrick(input)`: Minimizes a boolean expression using the Quine-McCluskey method and Petrick's method.
 *
 */

class Term {
  constructor(binaryString) {
    this.binaryString = binaryString;
  }
}

class Minterm extends Term {
  constructor(binaryString, covers) {
    super(binaryString, -1);
    this.covers = covers;
  }
}

function combineAdjacentTerms(term1, term2) {
  let result = "";
  for (let i = 0; i < term1.binaryString.length; i++) {
    if (term1.binaryString[i] === term2.binaryString[i]) {
      result += term1.binaryString[i];
    } else {
      result += "-";
    }
  }
  // Merge the covers of both minterms
  const combinedCovers = [...term1.covers, ...term2.covers];
  return new Term(result, combinedCovers);
}

function formInitialGroups(input) {
  const termsWithX = [];
  const termsWithoutX = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "0") {
      if (input[i] == "1") {
        termsWithX.push(new Term(i.toString(2).padStart(5, "0"), i));
        termsWithoutX.push(new Term(i.toString(2).padStart(5, "0"), i));
      } else {
        // x
        termsWithX.push(new Term(i.toString(2).padStart(5, "0"), i));
      }
    }
  }

  return { termsWithX, termsWithoutX };
}

function findMinterms(terms) {
  let minterms = [];
  let lastIterationTerms = terms.slice();
  let newTerms = [];
  let usedTerms = new Set();

  while (true) {
    newTerms = [];

    for (let i = 0; i < lastIterationTerms.length - 1; i++) {
      for (let j = i + 1; j < lastIterationTerms.length; j++) {
        if (isAdjacent(lastIterationTerms[i], lastIterationTerms[j])) {
          usedTerms.add(lastIterationTerms[i].binaryString);
          usedTerms.add(lastIterationTerms[j].binaryString);
          const combinedTerm = combineAdjacentTerms(
            lastIterationTerms[i],
            lastIterationTerms[j]
          );
          const newPrimeImplicant = new Minterm(combinedTerm, [
            lastIterationTerms[i].decimal,
            lastIterationTerms[j].decimal,
          ]);
          if (
            !newTerms.some(
              (term) => term.binaryString === newPrimeImplicant.binaryString
            )
          ) {
            newTerms.push(newPrimeImplicant);
          }
        }
      }
    }

    minterms = minterms.concat(newTerms);

    if (newTerms.length === 0) {
      break;
    }

    lastIterationTerms = newTerms.slice();
  }

  // Filter out minterms that were part of a combination
  minterms = minterms.filter((pi) => !usedTerms.has(pi.binaryString));

  // Ensure the resulting minterms array has unique minterms
  const uniqueMinterms = [];
  for (let pi of minterms) {
    if (!uniqueMinterms.some((term) => term.binaryString === pi.binaryString)) {
      uniqueMinterms.push(pi);
    }
  }

  return uniqueMinterms;
}

function isAdjacent(term1, term2) {
  let diffCount = 0;
  for (let i = 0; i < term1.binaryString.length; i++) {
    if (term1.binaryString[i] !== term2.binaryString[i]) diffCount++;
    if (diffCount > 1) return false;
  }
  return diffCount === 1;
}

function combineAdjacentTerms(term1, term2) {
  let result = "";
  for (let i = 0; i < term1.binaryString.length; i++) {
    if (term1.binaryString[i] === term2.binaryString[i]) {
      result += term1.binaryString[i];
    } else {
      result += "-";
    }
  }
  return result;
}

function createImplicantsChart(terms, minterms) {
  let chart = {};

  function compareTermAndMinterm(binaryTerm, binaryMinterm) {
    for (let i = 0; i < binaryMinterm.length; i++) {
      if (binaryMinterm[i] !== "-" && binaryTerm[i] !== binaryMinterm[i]) {
        return false;
      }
    }
    return true;
  }

  for (let term of terms) {
    chart[term.binaryString] = [];

    for (let minterm of minterms) {
      if (compareTermAndMinterm(term.binaryString, minterm.binaryString)) {
        chart[term.binaryString].push(minterm.binaryString);
      }
    }
  }

  return chart;
}

function printCrossingMintermsChart(chart) {
  // Extract all unique prime implicants from the chart
  const allPrimeImplicants = [...new Set([].concat(...Object.values(chart)))];

  // Calculate the maximum width for padding purposes
  const maxWidth = Math.max(...allPrimeImplicants.map((pi) => pi.length));

  // Print the header
  let header = padString("Minterm", 8) + " | ";
  for (let primeImplicant of allPrimeImplicants) {
    header += padString(primeImplicant, maxWidth + 2); // 2 is for the spaces between columns
  }
  console.log(header);
  console.log("-".repeat(header.length));

  // Print the rows
  for (let [minterm, coveredPrimeImplicants] of Object.entries(chart)) {
    let row = padString(minterm, 8) + " | ";
    for (let primeImplicant of allPrimeImplicants) {
      if (coveredPrimeImplicants.includes(primeImplicant)) {
        row += centerPadString("*", maxWidth) + "  "; // 2 spaces between columns
      } else {
        row += padString(" ", maxWidth) + "  "; // 2 spaces between columns
      }
    }
    console.log(row);
  }
}

// Helper function
function padString(str, len) {
  return str + " ".repeat(len - str.length);
}

function centerPadString(str, len) {
  const totalPadding = len - str.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;
  return " ".repeat(leftPadding) + str + " ".repeat(rightPadding);
}

function findEssentialPrimeImplicants(chart) {
  let essentialPIs = [];
  for (let minterm in chart) {
    if (chart[minterm].length === 1) {
      const essentialPI = chart[minterm][0];
      if (!essentialPIs.includes(essentialPI)) {
        essentialPIs.push(essentialPI);
      }
    }
  }
  return essentialPIs;
}

function generatePOS(chart, essentialPIs) {
  let posExpression = [];

  for (let minterm in chart) {
    let primeImplicants = chart[minterm].filter(
      (pi) => !essentialPIs.includes(pi)
    );
    if (primeImplicants.length > 0) {
      posExpression.push(primeImplicants);
    }
  }

  return posExpression;
}

function convertPOSToSOP(essentialImplicants, chart) {
  function binaryToLiteral(binaryString, implicantIndex) {
    let literals = ["a", "b", "c", "d", "e"];
    let result = "";

    for (let i = 0; i < binaryString.length; i++) {
      if (binaryString[i] !== "-") {
        if (binaryString[i] === "0") {
          result += "!" + literals[i];
        } else {
          result += literals[i];
        }
      }
    }
    return result.length > 0 ? result : `I${implicantIndex}`;
  }

  let sop = "";
  let addedTerms = new Set();

  for (let [term, coveredPrimeImplicants] of Object.entries(chart)) {
    let currentProduct = "";
    let termLiteral = binaryToLiteral(term);

    for (let implicant of coveredPrimeImplicants) {
      let implicantLiteral = binaryToLiteral(implicant);
      currentProduct +=
        (currentProduct.length > 0 ? "!" : "") + implicantLiteral;
    }

    if (!addedTerms.has(currentProduct)) {
      sop +=
        (sop.length > 0 ? " + " : "") +
        termLiteral +
        (currentProduct.length > 0 ? "!" + currentProduct : "");
      addedTerms.add(currentProduct);
    }
  }

  return sop;
}

function binaryToExpression(binaryString) {
  const variables = ["ab", "cd", "e", "g", "h"]; // Adjust as per your requirements
  let expression = "";

  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[i] !== "-") {
      if (binaryString[i] === "0") {
        expression += "!";
      }
      expression += variables[i];
    }
  }

  return expression;
}

function convertImplicantsToExpression(implicants) {
  return implicants.map(binaryToExpression).join(" + ");
}

function selectMinimumCover(sopExpression) {
  let minLiterals = Infinity;
  let minimumCover = [];

  for (let term of sopExpression) {
    if (term.length < minLiterals) {
      minLiterals = term.length;
      minimumCover = [term];
    } else if (term.length === minLiterals) {
      minimumCover.push(term);
    }
  }

  return minimumCover;
}

function minimize_Quine_McCluskey_Petrick(input) {
  // Convert input string to minterms
  console.log("Input=" + input);
  console.log("--------------");

  // Step 1: Forming initial groups
  console.log("Step 1: Forming initial groups");
  const { termsWithX, termsWithoutX } = formInitialGroups(input);

  // Display the minterms without 'x'
  console.log(`Minterms without 'x' (count = ${termsWithoutX.length}):`);
  console.log(termsWithoutX.map((term) => term.binaryString).join(", "));

  // Display the minterms with 'x'
  console.log(`Minterms with 'x' (count = ${termsWithX.length}):`);
  console.log(termsWithX.map((term) => term.binaryString).join(", "));

  // Step 2: Perform crossings
  console.log("--------------");
  console.log("Step 2: Perform crossings");
  let minterms = findMinterms(termsWithX);
  console.log(`Implicants (count = ${termsWithoutX.length}):`);
  console.log(minterms.map((pi) => pi.binaryString).join(", "));

  // Step 3: Prime Implicant Chart
  console.log("--------------");
  console.log("Step 3: Prime Implicant Chart");
  let chart = createImplicantsChart(termsWithoutX, minterms);
  printCrossingMintermsChart(chart);

  // Step 4: Petrick's Method
  console.log("--------------");
  console.log("Step 4: Petrick's Method");
  let essentialPrimeImplicants = findEssentialPrimeImplicants(chart);
  console.log(essentialPrimeImplicants);
  // let posExpression = generatePOS(chart, essentialPrimeImplicants);
  // const sopExpression = convertPOSToSOP(posExpression);

  // Step 5: Conversion to Desired Output
  console.log("--------------");
  console.log("Step 5: Conversion to Desired Output");
  // const logicalExpression = convertImplicantsToExpression(
  //   sopExpression.split("+")
  // );

  // return logicalExpression;
}

const input = "00x10x11x11x10x00x11x10x01x00x11"; // Sample input
const result = minimize_Quine_McCluskey_Petrick(input);
// console.log(result);
