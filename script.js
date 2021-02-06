class Calculator 
{
    //the constructor sets the operand fields
    constructor(previousOperandTextElement, currentOperandTextElement)
    {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    //the methods
    clear()
    {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number)
    {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation)
    {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') 
        {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute()
    {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation)
        {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return 
        }
        console.log("hello")

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number)
    {
        const stringNumber = number.toString()                          //turn the number to a string
        const integerDigits = parseFloat(stringNumber.split('.')[0])    //split the string at the period, take the first part
        const decimalDigits = parseFloat(stringNumber.split('.')[1])    //split the string at the period, take the second part

        let integerDisplay
        if (isNaN(integerDigits))
        {
            integerDisplay = ''
        }
        else
        {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0  })
        }

        if (!isNaN(decimalDigits))
        {
            return `${integerDisplay}.${decimalDigits}`
        }
        else if (stringNumber.includes('.'))
        {
            return `${integerDisplay}.`
        }
        else
        {
            return integerDisplay
        }
    }

    updateDisplay()
    {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null)
        {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else
        {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//the calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//Adding the listener for the number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//Adding the listener for the operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//Adding the listener for the equals button
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//Adding the listener for the equals button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//Adding the listener for the equals button
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})