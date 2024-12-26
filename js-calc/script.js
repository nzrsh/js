const display = document.getElementById("display");
const displayResult = document.getElementById("display-result");
const advancedOps = document.getElementById("adv-ops");
const simpleOps = document.getElementById("ops");
const fontSelect = document.getElementById("font-select");

fontSelect.addEventListener("change", function () {
  document.body.style.fontFamily = this.value;
});
let advancedMode = false;

let operand1 = null,
  operand2 = null,
  result = null,
  operator = null;

let logVars = function () {
  console.log(
    `advanced = ${advancedMode} operand1 = ${operand1}, operand2 = ${operand2}, operator = ${operator}`
  );
};

function updateDisplay() {
  console.log("Display updated");

  displayResult.value = result !== null ? result : "";

  if (advancedMode) {
    if (operator !== null) {
      console.log("Есть оператор");
      if (operand1 !== null) {
        console.log("Есть операнд");
        display.value = `${operator}(${operand1})`;
      } else {
        console.log("Нет операнда");
        display.value = `${operator}()`;
      }
    } else {
      console.log("Нет оператора");
      if (operand1 !== null) {
        console.log("Есть операнд");
        display.value = `${operand1}`;
      } else {
        console.log("Нет операнда");
        display.value = "";
      }
    }
  } else {
    if (operand1 == null && operand2 == null && operator == null) {
      display.value = "";
      return;
    }

    display.value = `${operand1 || ""} ${operator || ""} ${operand2 || ""}`;
  }
}

function handleNumButtonPress(value) {
  console.log(`Pressed num ${value}`);

  if (advancedMode) {
    if (operand1 === null) {
      operand1 = String(value);
    } else {
      operand1 += String(value);
    }
  } else {
    if (operand1 === null) {
      operand1 = String(value);
    } else if (operator === null) {
      operand1 += String(value);
    } else if (operand2 === null) {
      operand2 = String(value);
    } else {
      operand2 += String(value);
    }
  }

  logVars();
  updateDisplay();
}

function handleOpButtonPress(op) {
  console.log(`Pressed op ${op}`);
  operator = op;
  logVars();
  updateDisplay();
}

document.getElementById("btnC").addEventListener("click", function () {
  console.log(`Pressed control C`);
  operand1 = null;
  operand2 = null;
  operator = null;
  result = null;
  logVars();
  updateDisplay();
});

document.getElementById("btnCE").addEventListener("click", function () {
  console.log(`Pressed control CE`);

  if (operand2 !== null && operand2.length > 0) {
    operand2 = operand2.slice(0, -1);
  } else if (operator !== null) {
    operator = null;
  } else if (operand1 !== null && operand1.length > 0) {
    operand1 = operand1.slice(0, -1);
  } else {
    console.log("[WARN] Nothing to clear");
  }

  logVars();
  updateDisplay();
});

document.getElementById("btnCalc").addEventListener("click", function () {
  console.log(`Pressed calc with ${operator}`);

  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "/":
      if (operand2 === 0) {
        handleCalcError("Cannot divide by zero");
        return;
      } else {
        result = operand1 / operand2;
      }
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "√":
      if (operand1 >= 0) {
        result = Math.sqrt(operand1);
      } else {
        handleCalcError("Cannot calculate sqrt of negative number");
        return;
      }
      break;
    case "log":
      if (operand1 > 0) {
        result = Math.log(operand1);
      } else {
        handleCalcError("Cannot calculate log of non-positive number");
        return;
      }
      break;
    case "x²":
      result = operand1 * operand1;
      break;
    case "!":
      result = factorial(operand1);
      break;
    default:
      handleCalcError("Unknown operation");
  }

  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay();
});

function handleCalcError(errorText) {
  console.log(`Error caught: ${handleCalcError}`);
  result = errorText;
  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay();
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

document
  .getElementById("btn1")
  .addEventListener("click", () => handleNumButtonPress(1));
document
  .getElementById("btn2")
  .addEventListener("click", () => handleNumButtonPress(2));
document
  .getElementById("btn3")
  .addEventListener("click", () => handleNumButtonPress(3));
document
  .getElementById("btn4")
  .addEventListener("click", () => handleNumButtonPress(4));
document
  .getElementById("btn5")
  .addEventListener("click", () => handleNumButtonPress(5));
document
  .getElementById("btn6")
  .addEventListener("click", () => handleNumButtonPress(6));
document
  .getElementById("btn7")
  .addEventListener("click", () => handleNumButtonPress(7));
document
  .getElementById("btn8")
  .addEventListener("click", () => handleNumButtonPress(8));
document
  .getElementById("btn9")
  .addEventListener("click", () => handleNumButtonPress(9));
document
  .getElementById("btn0")
  .addEventListener("click", () => handleNumButtonPress(0));

document
  .getElementById("btnPlus")
  .addEventListener("click", () => handleOpButtonPress("+"));
document
  .getElementById("btnMinus")
  .addEventListener("click", () => handleOpButtonPress("-"));
document
  .getElementById("btnDiv")
  .addEventListener("click", () => handleOpButtonPress("/"));
document
  .getElementById("btnMul")
  .addEventListener("click", () => handleOpButtonPress("*"));

document
  .getElementById("btnLog")
  .addEventListener("click", () => handleOpButtonPress("log"));
document
  .getElementById("btnRoot")
  .addEventListener("click", () => handleOpButtonPress("√"));

document
  .getElementById("btnPow")
  .addEventListener("click", () => handleOpButtonPress("x²"));

document
  .getElementById("btnFac")
  .addEventListener("click", () => handleOpButtonPress("!"));

document
  .getElementById("advanced-mode")
  .addEventListener("change", function () {
    console.log("Pressed chechbox");
    if (!advancedMode) {
      simpleOps.style.display = "none";
      advancedOps.style.display = "flex";
      advancedMode = true;
    } else {
      simpleOps.style.display = "flex";
      advancedOps.style.display = "none";
      advancedMode = false;
    }
    operand1 = null;
    operand2 = null;
    operator = null;
    result = null;
    updateDisplay();
  });
