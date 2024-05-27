console.clear();
const log = console.log;

function $(selector) {
  return document.querySelector(selector);
}

// ========= Bringing in HTML elements =========

const displayAgg = $(".display-agg");
const displayCurrNum = $(".display-c-num");

const btnDigitAll = document.querySelectorAll(".digit-btn");
const btnOperationAll = document.querySelectorAll(".operation-btn");

const btnPlus = $("#btn-plus");
const btnMinus = $("#btn-minus");
const btnMultiply = $("#btn-multiply");
const btnDivide = $("#btn-divide");
const btnEqual = $("#btn-equal");

const btnDel = $("#btn-del");
const btnC = $("#btn-c");
const btnTxt = $("#btn-txt");
const btnRoman = $("#btn-roman");
const btnDot = $("#btn-dot");
const btnPosNeg = $("#btn-pos-neg");

let prevEquation = "";
let currDigit = "";
let equation = "";
let equationLast = "";

let currOperation = "";
let prevOperation = "";
let equalOperation = "=";

let prevNum = 0;
let currNum = 0;
let result = 0;

let trNum = "";
let hundreds = 0;
let tens = 0;
let ones = 0;
let rHundreds = 0;
let rTens = 0;
let rOnes = 0;
let romanHundreds = "";
let romanTens = "";
let romanOnes = "";

let operationCounter = 0;
let equalWasLastClick = false;
let clearFnInvoked = false;

const numToText = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
  100: "hundred",
  1000: "thousand"
};

const numToRoman = {
  0: "Nulla",
  1: "I",
  5: "V",
  10: "X",
  50: "L",
  100: "C",
  500: "D",
  1000: "M"
};

displayAgg.innerText = equation;
displayCurrNum.innerText = currNum;

// ========= Handling Functions =========

function updateDisplayprevNum() {
  equation += prevOperation;
  prevEquation = equation;

  displayAgg.innerText = equation;
  displayCurrNum.innerText = prevNum;

  trNum = prevNum;
}

function updateDisplaycurrNum() {
  if (operationCounter === 0) {
    equationLast = currNum.toString();
    equation = "";
    equation += equationLast;
    displayAgg.innerText = equation;
  } else {
    if (
      equation.includes("+") ||
      equation.includes("-") ||
      equation.includes("x") ||
      equation.includes("÷")
    ) {
      equation += currDigit;
      displayAgg.innerText = equation;
    }
  }

  displayCurrNum.innerText = currNum;
  trNum = currNum;
  log(prevEquation, equation, equationLast);
}

function updateDisplayResult() {
  if (prevOperation == "÷" && currNum == 0) {
    displayCurrNum.innerText = `Can't divide by 0`;
  } else {
    if (Number.isInteger(result)) {
      displayCurrNum.innerText = result;
    } else {
      displayCurrNum.innerText = result.toFixed(2);
    }
  }

  trNum = result;

  // if (equalWasLastClick === true) {
  //   equation += equalOperation;
  //   displayAgg.innerText = equation;
  //   log("bs");
  // } else {
    if (
      equation.toString().charAt(equation.length - 1) === "+" ||
      equation.toString().charAt(equation.length - 1) === "-" ||
      equation.toString().charAt(equation.length - 1) === "x" ||
      equation.toString().charAt(equation.length - 1) === "÷"
    ) {
      let arr = equation.split("");
      arr[arr.length - 1] = currOperation;
      equation = arr.join("");
      displayAgg.innerText = equation;
    } else {
      equation += currOperation;
      displayAgg.innerText = equation;
    }
  // }
  log(operationCounter);
}

function handleDigit(btnDigit) {
  let digit = btnDigit.innerText;
  currDigit = digit;

  if (equalWasLastClick === true) {
    equation = "";
    operationCounter = 0;
    prevNum = 0;
    currNum = 0;
    result = 0;
    prevOperation = "";
  }

  currNum += digit;
  currNum = parseFloat(currNum);
  prevNum = parseFloat(prevNum);

  updateDisplaycurrNum();
  equalWasLastClick = false;
  log(prevNum, currNum);
}

function handleOperation(btnOperation) {
  let operation = btnOperation.innerText;
  currOperation = operation;

  if (operationCounter === 0) {
    prevOperation = operation;
    prevNum = currNum;
    currNum = 0;
    updateDisplayprevNum();
    log(prevNum, currNum, result, prevOperation, operation);
    operationCounter++;
  } else {
    calculate(prevOperation);
    prevNum = result;
    currNum = 0;
    updateDisplayResult();
    log(prevNum, currNum, result, prevOperation, operation);
    operationCounter++;
    prevOperation = operation;
  }

  equalWasLastClick = false;
  displayCurrNum.classList.remove("smaller-font");
}

function calculate(operation) {
  let val1 = parseFloat(prevNum);
  let val2 = parseFloat(currNum);

  switch (operation) {
    case "+":
      result = val1 + val2;

      break;
    case "-":
      result = val1 - val2;
      if (Number.isInteger(result)) {
        return result;
      } else {
        return result.toFixed(2);
      }
      break;
    case "x":
      result = val1 * val2;
      break;
    case "÷":
      result = val1 / val2;
      if (Number.isInteger(result)) {
        return result;
      } else {
        return result.toFixed(2);
      }
      break;
    default:
      break;
  }

  log(val1, val2, result);
}

function handleEqual() {
  equalWasLastClick = true;
  calculate(prevOperation);
  updateDisplayResult();
  displayCurrNum.classList.remove("smaller-font");
  log(`this is`, trNum);
}

function handleClear() {
  equation = "";
  operationCounter = 0;

  prevNum = 0;
  currNum = 0;
  trNum = "";
  hundreds = 0;
  tens = 0;
  ones = 0;

  result = 0;
  
  romanHundreds = '';
  romanTens = '';
  romanOnes = '';

  displayAgg.innerText = equation;
  displayCurrNum.innerText = currNum;
  displayCurrNum.classList.remove("smaller-font");
}

function handleDelete() {
  currNum = currNum.toString().slice(0, currNum.toString().length - 1);
  equation = currNum;
  displayAgg.innerText = equation;
  displayCurrNum.innerText = currNum;
  displayCurrNum.classList.remove("smaller-font");
  log(currNum);
}

function handleDot() {
  if (currNum.toString().includes(".")) {
    return;
  } else {
    currNum += btnDot.innerText;

    displayCurrNum.innerText = currNum;
  }
  displayCurrNum.classList.remove("smaller-font");
}

function handlePosNeg() {
  let sign = "-";

  if (currNum.toString().includes("-")) {
    currNum = currNum.slice(1);
    displayCurrNum.innerText = currNum;
  } else {
    let concatNegAndCurrNum = sign + currNum;
    currNum = concatNegAndCurrNum;
    displayCurrNum.innerText = currNum;
  }
  displayCurrNum.classList.remove("smaller-font");
}

function handleToText() {
  // displayCurrNum.classList.add("smaller-font");
  
//------converting the hundreds numbers into text------
  
  if (trNum % 100 == 0) {
    hundreds = trNum / 100;
    displayCurrNum.innerText = `${numToText[hundreds]} ${numToText[100]}`;
  } else {
    if (trNum % 10 == 0) {
      hundreds = parseInt(trNum / 100);
      tens = trNum - hundreds * 100;
      displayCurrNum.innerText = `${numToText[hundreds]} ${numToText[100]} ${numToText[tens]}`;
      log(tens);
    } else {
      hundreds = parseInt(trNum / 100);
      tens = parseInt((trNum - hundreds * 100) / 10) * 10;
      let TensCheck = parseInt((trNum - hundreds * 100) / 10);
      ones = trNum - hundreds * 100 - tens;
      if (TensCheck == 1) {
        decimal = parseInt(tens + ones);
        displayCurrNum.innerText = `${numToText[hundreds]} ${numToText[100]} ${numToText[decimal]}`;
        log(hundreds, tens, ones, decimal);
      } else {
        displayCurrNum.innerText = `${numToText[hundreds]} ${numToText[100]} ${numToText[tens]}-${numToText[ones]}`;
        log(hundreds, tens, ones);
      }
    }
  }
  
//------converting the tens numbers into text------
  
  if (parseInt(trNum / 100) == 0 && trNum % 10 == 0) {
    tens = trNum;
    displayCurrNum.innerText = `${numToText[tens]}`;
    log(tens);
  } else {
    if (parseInt(trNum / 100) == 0 && trNum % 10 != 0) {
      tens = parseInt(trNum / 10) * 10;
      let TensCheck = parseInt(trNum / 10);
      ones = trNum - tens;
      if (TensCheck == 1) {
        decimal = parseInt(tens + ones);
        displayCurrNum.innerText = `${numToText[decimal]}`;
        log(hundreds, tens, ones, decimal);
      } else {
        displayCurrNum.innerText = `${numToText[tens]}-${numToText[ones]}`;
      }
    }
  }
  
  //------converting the ones numbers into text------

  if (parseInt(trNum / 100) == 0 && parseInt(trNum / 10) == 0) {
    ones = trNum;
    displayCurrNum.innerText = `${numToText[ones]}`;
    log(ones);
  } else {
    if (trNum > 1000) {
      displayCurrNum.innerText = `This number is too big`;
    }
  }
  
  //------converting one thousand into text------
  
   if (trNum === 1000){
    displayCurrNum.innerText = `${numToText[1]} ${numToText[1000]}`;
  }
}

function handleToRoman() {
  displayCurrNum.classList.remove("smaller-font");

  if (trNum > 1000) {
    displayCurrNum.innerText = `This number is too big`;
  }

  // -------------------------------- 1000 ---------------------------------

  if (trNum === 1000) {
    displayCurrNum.innerText = numToRoman[1000];
  }

  // ------------------------------ 100 - 999 -------------------------------

  if (trNum >= 100 && trNum <= 999) {
    rHundreds = parseInt(trNum / 100);
    rTens = parseInt((trNum - rHundreds * 100) / 10);
    rOnes = trNum - rHundreds * 100 - rTens * 10;

    if (rHundreds >= 1 && rHundreds <= 3) {
      romanHundreds = numToRoman[100].repeat(rHundreds);
    } else {
      if (rHundreds === 4) {
        romanHundreds = numToRoman[100] + numToRoman[500];
      } else {
        if (rHundreds === 5) {
          romanHundreds = numToRoman[500];
        } else {
          if (rHundreds > 5 && rHundreds <= 8) {
            romanHundreds =
              numToRoman[500] + numToRoman[100].repeat(rHundreds - 5);
          } else {
            if (rHundreds === 9) {
              romanHundreds = numToRoman[100] + numToRoman[1000];
            }
          }
        }
      }
    }

    if (rTens >= 1 && rTens <= 3) {
      romanTens = numToRoman[10].repeat(rTens);
    } else {
      if (rTens === 4) {
        romanTens = numToRoman[10] + numToRoman[50];
      } else {
        if (rTens === 5) {
          romanTens = numToRoman[50];
        } else {
          if (rTens > 5 && rTens <= 8) {
            romanTens = numToRoman[50] + numToRoman[10].repeat(rTens - 5);
          } else {
            if (rTens === 9) {
              romanTens = numToRoman[10] + numToRoman[100];
            }
          }
        }
      }
    }

    if (rOnes >= 1 && rOnes <= 3) {
      romanOnes = numToRoman[1].repeat(rOnes);
    } else {
      if (rOnes === 4) {
        romanOnes = numToRoman[1] + numToRoman[5];
      } else {
        if (rOnes === 5) {
          romanOnes = numToRoman[5];
        } else {
          if (rOnes > 5 && rOnes <= 8) {
            romanOnes = numToRoman[5] + numToRoman[1].repeat(rOnes - 5);
          } else {
            if (rOnes === 9) {
              romanOnes = numToRoman[1] + numToRoman[10];
            }
          }
        }
      }
    }
    displayCurrNum.innerText = romanHundreds + romanTens + romanOnes;
  }

  // ------------------------------ 10 - 99 -------------------------------

  if (trNum >= 10 && trNum <= 99) {
    rTens = parseInt(trNum / 10);
    rOnes = trNum - rTens * 10;

    if (rTens >= 1 && rTens <= 3) {
      romanTens = numToRoman[10].repeat(rTens);
    } else {
      if (rTens === 4) {
        romanTens = numToRoman[10] + numToRoman[50];
      } else {
        if (rTens === 5) {
          romanTens = numToRoman[50];
        } else {
          if (rTens > 5 && rTens <= 8) {
            romanTens = numToRoman[50] + numToRoman[10].repeat(rTens - 5);
          } else {
            if (rTens === 9) {
              romanTens = numToRoman[10] + numToRoman[100];
            }
          }
        }
      }
    }

    if (rOnes >= 1 && rOnes <= 3) {
      romanOnes = numToRoman[1].repeat(rOnes);
    } else {
      if (rOnes === 4) {
        romanOnes = numToRoman[1] + numToRoman[5];
      } else {
        if (rOnes === 5) {
          romanOnes = numToRoman[5];
        } else {
          if (rOnes > 5 && rOnes <= 8) {
            romanOnes = numToRoman[5] + numToRoman[1].repeat(rOnes - 5);
          } else {
            if (rOnes === 9) {
              romanOnes = numToRoman[1] + numToRoman[10];
            }
          }
        }
      }
    }
    displayCurrNum.innerText = romanTens + romanOnes;
  }

  // ------------------------------ 1 - 9 -------------------------------

  if (trNum >= 1 && trNum <= 9) {
    rOnes = trNum;

    if (rOnes >= 1 && rOnes <= 3) {
      romanOnes = numToRoman[1].repeat(rOnes);
    } else {
      if (rOnes === 4) {
        romanOnes = numToRoman[1] + numToRoman[5];
      } else {
        if (rOnes === 5) {
          romanOnes = numToRoman[5];
        } else {
          if (rOnes > 5 && rOnes <= 8) {
            romanOnes = numToRoman[5] + numToRoman[1].repeat(rOnes - 5);
          } else {
            if (rOnes === 9) {
              romanOnes = numToRoman[1] + numToRoman[10];
            }
          }
        }
      }
    }
    displayCurrNum.innerText = romanOnes;
  }

  // -------------------------------- 0 ---------------------------------

  if (trNum === 0) {
    displayCurrNum.innerText = numToRoman[0];
  }
}

// ========= Events Listeners =========

btnDigitAll.forEach((btn) =>
  btn.addEventListener("click", () => handleDigit(btn))
);

btnOperationAll.forEach((btn) =>
  btn.addEventListener("click", () => handleOperation(btn))
);

btnEqual.addEventListener("click", handleEqual);

btnDel.addEventListener("click", handleDelete);

btnC.addEventListener("click", handleClear);

btnTxt.addEventListener("click", handleToText);

btnRoman.addEventListener("click", handleToRoman);

btnDot.addEventListener("click", handleDot);

btnPosNeg.addEventListener("click", handlePosNeg);