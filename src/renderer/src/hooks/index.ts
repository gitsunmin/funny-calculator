import { useCallback } from 'react'
import Bigjs from 'big.js'

/** output queue */
const outputs: (ButtonType | number)[] = []
/** operator stack */
const operators: ButtonType[] = []

/** 연산자의 우선순위를 정한 MAP. */
const operatorsPrecedence: Partial<Record<OperatorType, number>> = {
  '*': 2,
  '/': 2,
  '%': 2,
  '+': 1,
  '-': 1
}

const calculate = (data: string): string => {
  /** 연산자를 구분자로 분류해서 입력값을 분석하고, 우선순위에 맞게 output queue에 넣어준다. */
  for (const token of data.split(/(\+|-|\*|\/|%)/) as ButtonType[]) {
    const isNaN = Number.isNaN(Number(token))

    /** 숫자로 변환 가능한 값인 경우에는 숮자라고 판단 */
    if (isNaN) {
      if (operators.length === 0) {
        operators.push(token)
      } else {
        const lastOperator = operators.at(-1) ?? operators[0]
        const currentOperatorPrecedence = operatorsPrecedence[token] ?? 0
        const previousOperatorPrecedence = operatorsPrecedence[lastOperator] ?? 0

        if (currentOperatorPrecedence === previousOperatorPrecedence) {
          const lastOperator = operators.pop()
          lastOperator && outputs.push(lastOperator)
          operators.push(token)
        } else if (currentOperatorPrecedence >= previousOperatorPrecedence) {
          operators.push(token)
        }
      }
    } else {
      outputs.push(Number(token))
    }
  }

  /** 나머지 연산자를 모두 outputs에 넣는다.  */
  for (let i = 0; i <= operators.length; i++) {
    const lastOperator = operators.pop()

    lastOperator && outputs.push(lastOperator)
  }

  let i = 0
  /** output에 있는 값을 분석하여 알맞는 연산을 수행한다. */
  while (outputs.length > 1) {
    const operator = outputs[i]
    if (typeof operator === 'string') {
      const [leftNumber, rightNumber] = outputs.slice(i - 2, i)

      const leftBigNumber = new Bigjs(leftNumber)
      const rightBigNumber = new Bigjs(rightNumber)

      switch (operator) {
        case '+':
          outputs.splice(i - 2, 3, leftBigNumber.plus(rightBigNumber).toNumber())
          break
        case '-':
          outputs.splice(i - 2, 3, leftBigNumber.minus(rightBigNumber).toNumber())
          break
        case '*':
          outputs.splice(i - 2, 3, leftBigNumber.times(rightBigNumber).toNumber())
          break
        case '/':
          outputs.splice(i - 2, 3, leftBigNumber.div(rightBigNumber).toNumber())
          break
        case '%':
          outputs.splice(i - 2, 3, leftBigNumber.mod(rightBigNumber).toNumber())
          break
        default:
          break
      }
      i = 0
    } else {
      i++
    }
  }

  return String(outputs.pop())
}

/**
 * * button의 입력을 받아서 액션을 실행하는 함숫
 */
export const useClickButton = (): ((buttonType: ButtonType, data: string) => string) => {
  return useCallback((buttonType: ButtonType, data: string): string => {
    const addedValue = `${data}${buttonType}`

    switch (buttonType) {
      case '=':
        // 마지막 글자가 /(\+|\\-|\*|\/|%|\.)$/g 일 경우
        if (data.match(/(\+|-|\*|\/|%|\.)$/g)?.[0]) {
          return data
        }
        return calculate(data)
      case 'C':
        return ''
      case '%':
      case '*':
      case '+':
      case '-':
      case '/':
        if (data.match(/(\+|-|\*|\/|%)$/g)?.[0]) {
          return data.replace(/(\+|-|\*|\/|%)$/g, buttonType)
        }

        if (data.length === 0) {
          return data
        }
        return addedValue
      case '0':
        // string의 맨 마지막에 있는 숫자들이 이루는 수를 구하는 코드, 소수점 포함
        // eslint-disable-next-line no-case-declarations
        const lastNumber = data.match(/(\d+\.?\d*)$/)?.[0] ?? ''

        if (lastNumber.at(0) === '0' && lastNumber.at(1) !== '.') {
          return data
        }

        return addedValue
      case '.':
        return data.includes('.') ? data : addedValue
      default:
        return addedValue
    }
  }, [])
}
