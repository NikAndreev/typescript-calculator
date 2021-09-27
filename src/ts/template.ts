document.addEventListener("DOMContentLoaded", function () {
  const calculator = document.querySelector(".js-calculator") as HTMLDivElement;
  const calculatorOutput = calculator.querySelector(
    ".js-calculator-output"
  ) as HTMLDivElement;

  calculator.addEventListener("click", function (event) {
    const target = event.target as HTMLDivElement;

    if (target.closest(".js-calculator-btn")) {
      const btn = target.closest(".js-calculator-btn") as HTMLDivElement;
      const btnValue = btn.dataset.value as string;
      calculatorOutput.innerText = addChar(
        calculatorOutput.innerText,
        btnValue
      );
    } else if (target.closest(".js-calculator-delete")) {
      calculatorOutput.innerText = deleteChar(calculatorOutput.innerText);
    } else if (target.closest(".js-calculator-clear")) {
      calculatorOutput.innerText = clear();
    } else if (target.closest(".js-calculator-equally")) {
      calculatorOutput.innerText = calculate(calculatorOutput.innerText);
    }
  });

  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (
      Number(key) ||
      key === "(" ||
      key === ")" ||
      key === "*" ||
      key === "/" ||
      key === "+" ||
      key === "-"
    ) {
      calculatorOutput.innerText = addChar(calculatorOutput.innerText, key);
    } else if (key == "Backspace") {
      calculatorOutput.innerText = deleteChar(calculatorOutput.innerText);
    } else if (key == "Enter") {
      calculatorOutput.innerText = calculate(calculatorOutput.innerText);
    }
  });
});

function clear() {
  return "";
}

function deleteChar(string: string) {
  return string.substring(0, string.length - 1);
}

function addChar(string: string, char: string) {
  return string + char;
}

function calculate(mathematicalExpression: string) {
  const userInputArray = mathematicalExpression.split("");

  // Объединяю цифры в числа
  for (let i = 0; i < userInputArray.length; i++) {
    if (isNumeric(userInputArray[i]) && isNumeric(userInputArray[i + 1])) {
      userInputArray[i] += userInputArray[i + 1];
      userInputArray.splice(i + 1, 1);
      i--;
    }
  }

  // Выполняю действия в скобках
  doInBrackets(userInputArray, 0);

  // Выполняю умножение и деление
  doMultiplicationAndDivision(userInputArray);

  // Выполняю сложение и вычитание
  doAdditionAndSubtraction(userInputArray);

  // Когда все операци выполнены, в массиве остаёся единственное число - результат всех операций
  const totalResult =
    Number(userInputArray.length) === 1 ? userInputArray[0] : "";

  return totalResult;
}

function doMultiplicationAndDivision(array: string[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "*" || array[i] === "/") {
      const a = array[i - 1];
      const b = array[i + 1];

      let result = 0;

      if (array[i] === "*") {
        result = Number(a) * Number(b);
      } else {
        result = Number(a) / Number(b);
      }

      array.splice(i - 1, 3, String(result));
      i = 0;
    }
  }
}

function doAdditionAndSubtraction(array: string[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "+" || array[i] === "-") {
      const a = array[i - 1];
      const b = array[i + 1];

      let result = 0;

      if (array[i] === "+") {
        result = Number(a) + Number(b);
      } else {
        result = Number(a) - Number(b);
      }

      array.splice(i - 1, 3, String(result));
      i = 0;
    }
  }
}

function isNumeric(n: string) {
  if (Number(n) || n === "0" || n === ".") {
    return true;
  }
  return false;
}

function doInBrackets(array: string[], startIndex: number) {
  for (let i = startIndex; i < array.length; i++) {
    if (array[i] === "(") {
      const bracketsStartIndex = i;
      for (let j = bracketsStartIndex + 1; j < array.length; j++) {
        if (array[j] === "(") {
          const bracketsStartIndex = j;
          doInBrackets(array, bracketsStartIndex);
        }

        if (array[j] === ")") {
          const bracketsEndIndex = j;
          const subArray = array.slice(
            bracketsStartIndex + 1,
            bracketsEndIndex
          );
          const indexDifferent = bracketsEndIndex - bracketsStartIndex + 1;
          doMultiplicationAndDivision(subArray);
          doAdditionAndSubtraction(subArray);
          const resultInBrackets = subArray[0];
          array.splice(bracketsStartIndex, indexDifferent, resultInBrackets);
          break;
        }
      }
    }
  }
}

module.exports = { deleteChar, addChar, calculate };
