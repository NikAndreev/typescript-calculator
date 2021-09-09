document.addEventListener('DOMContentLoaded', function(){

  const calculator = document.querySelector('.js-calculator') as HTMLDivElement
  const calculatorOutput = calculator.querySelector('.js-calculator-output') as HTMLDivElement

  calculator.addEventListener('click', function(event) {

    const target = event.target as HTMLDivElement

    if ( target.closest('.js-calculator-btn') ) {
      const btn = target.closest('.js-calculator-btn') as HTMLDivElement
      const btnValue = btn.dataset.value as string
      addChar(btnValue)
    } else if ( target.closest('.js-calculator-delete') ) {
      deleteChar()
    } else if ( target.closest('.js-calculator-clear') ) {
      clear()
    } else if ( target.closest('.js-calculator-equally') ) {
      calculate()
    }

  });

  document.addEventListener('keydown', function(event) {
    
    const key = event.key

    if ( ( Number(key) ) || ( key === '(' ) || ( key === ')' ) || ( key === '*' ) || ( key === '/' ) || ( key === '+' ) || ( key === '-' ) ) {
      addChar(key)
    } else if ( key == 'Backspace' ) {
      deleteChar()
    } else if ( key == 'Enter' ) {
      calculate()
    }

  });

  function addChar(char: string) {
    calculatorOutput.innerText = calculatorOutput.innerText + char
  }

  function deleteChar() {
    calculatorOutput.innerText = calculatorOutput.innerText.substring(0, calculatorOutput.innerText.length - 1)
  }

  function clear() {
    calculatorOutput.innerText = ''
  }

  function calculate() {
    const userInputArray = calculatorOutput.innerText.split('')

    // Объединяю цифры в числа
    for (let i = 0; i < userInputArray.length; i++) {
      if ( isNumeric(userInputArray[i]) && isNumeric(userInputArray[i + 1]) ) {
        userInputArray[i] += userInputArray[i + 1]
        userInputArray.splice(i + 1, 1)
        i--
      }
    }

    // Выполняю действия в скобках
    doInBrackets(userInputArray, 0)

    // Выполняю умножение и деление
    doMultiplicationAndDivision(userInputArray)

    // Выполняю сложение и вычитание
    doAdditionAndSubtraction(userInputArray)

    // Когда все операци выполнены, в массиве остаёся единственное число - результат всех операций
    const totalResult = Number(userInputArray.length) === 1 ? userInputArray[0] : ''

    calculatorOutput.innerText = totalResult
  }

  function doMultiplicationAndDivision(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      if ( array[i] === '*' || array[i] === '/') {
          const a = array[i - 1]
          const b = array[i + 1]

          let result = 0

          if ( array[i] === '*' ) {
            result = Number(array[i - 1]) * Number(array[i + 1])
          } else {
            result = Number(array[i - 1]) / Number(array[i + 1])
          }

          array.splice( i - 1, 3, String(result) )
          // console.log(array)
          i = 0
      }
    }
  }

  function doAdditionAndSubtraction(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      if ( array[i] === '+' || array[i] === '-') {
          const a = array[i - 1]
          const b = array[i + 1]

          let result = 0

          if ( array[i] === '+' ) {
            result = Number(array[i - 1]) + Number(array[i + 1])
          } else {
            result = Number(array[i - 1]) - Number(array[i + 1])
          }

          array.splice( i - 1, 3, String(result) )
          // console.log(array)
          i = 0
      }
    }
  }

  function isNumeric(n: string) {
    if ( Number(n) || n === '0' || n === '.' ) {
       return true
    }
    return false
  }

  function doInBrackets(array: string[], startIndex: number) {
    for (let i = startIndex; i < array.length; i++) {
      if ( array[i] === '(' ) {
        const bracketsStartIndex = i
        for (let j = bracketsStartIndex + 1; j < array.length; j++) {

          if ( array[j] === '(' ) {
            const bracketsStartIndex = j
            doInBrackets(array, bracketsStartIndex)
          }

          if ( array[j] === ')' ) {
            const bracketsEndIndex = j
            // console.log(array)
            // console.log(bracketsStartIndex)
            // console.log(bracketsEndIndex)
            const subArray = array.slice(bracketsStartIndex + 1, bracketsEndIndex)
            // console.log(subArray)
            const indexDifferent = bracketsEndIndex - bracketsStartIndex + 1
            doMultiplicationAndDivision(subArray)
            doAdditionAndSubtraction(subArray)
            const resultInBrackets = subArray[0]
            array.splice(bracketsStartIndex, indexDifferent, resultInBrackets)
            // console.log(array)
            break
          }
        }
      }
    }
  }


});





