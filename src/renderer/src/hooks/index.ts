import { useCallback } from 'react'
import Bigjs from 'big.js'

/** 연산자의 우선순위를 정한 MAP. */
const operatorsPrecedence: Partial<Record<OperatorType, number>> = {
  '*': 2,
  '/': 2,
  '%': 2,
  '+': 1,
  '-': 1
}
/** 연산자를 찾는 정규표현식 */
const OPERATORS_REGEX = /(\+|-|\*|\/|%)/g

/** invalidated Case를 찾는 정규표현식 */
const INVALIDATED_CASE_REGEX = /(\+|-|\*|\/|%|\.)$/g

/** 마지막 숫자를 찾는 정규표현식 */
const LAST_NUMBER_REGEX = /(\d+\.?\d*)$/g

/**
 * * input의 유효성을 검사하는 함수
 * * 마지막에 연산자 및 .이 오는 경우를 검사한다.
 */
const validator = (input: string): boolean => {
  return !input.match(INVALIDATED_CASE_REGEX)
}

/**
 * 중위 표기법으로 입력된 input을 후위 표기법으로 변환하는 함수
 */
const converter = (input: string): OutputType => {
  /** output */
  const outputs: (ButtonType | number)[] = []
  /** operator stack */
  const operators: OperatorType[] = []

  /** SPLITING */
  const convertedInputs = input.split(OPERATORS_REGEX) as string[]

  let i = 0
  /** 연산자와 피연산자가 구분된 Array의 Loop를 돌려 Output을 채워 넣는다. */
  while (convertedInputs.length > i) {
    const token = convertedInputs[i] as ButtonType

    const isNaN = Number.isNaN(Number(token))

    if (isNaN) {
      const operatorToken = token as OperatorType
      const nextOperatorPrecedence = operatorsPrecedence[token] ?? 0
      const previousOperatorPrecedence = operatorsPrecedence?.[operators.at(-1) ?? ''] ?? 0

      if (nextOperatorPrecedence > previousOperatorPrecedence) {
        operators.push(operatorToken)
      } else {
        const lastOperator = operators.pop()
        lastOperator && outputs.push(lastOperator)
        continue
      }
    } else {
      outputs.push(Number(token))
    }
    i++
  }

  /** 나머지 연산자를 모두 outputs에 넣는다.  */
  for (let i = 0; i <= operators.length; i++) {
    const lastOperator = operators.pop()
    lastOperator && outputs.push(lastOperator)
  }

  return outputs
}

const calculate = (outputs: OutputType): string => {
  let i = 0
  /** output에 있는 값을 분석하여 알맞는 연산을 수행한다. */
  while (outputs.length > 1) {
    const output = outputs[i]
    if (typeof output === 'string') {
      const [leftNumber, rightNumber] = outputs.slice(i - 2, i)

      const leftBigNumber = new Bigjs(leftNumber)
      const rightBigNumber = new Bigjs(rightNumber)

      switch (output) {
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
export const useCalculator = (): ((buttonType: ButtonType, data: string) => string) => {
  return useCallback((buttonType: ButtonType, data: string): string => {
    const addedValue = `${data}${buttonType}`

    switch (buttonType) {
      case '=': {
        /** validation */
        if (!validator(data)) return data

        /** convert */
        const outputs = converter(data)

        /** calculate */
        return calculate(outputs)
      }
      case '%':
      case '*':
      case '+':
      case '-':
      case '/':
        return data.match(INVALIDATED_CASE_REGEX)
          ? data.replace(/(\+|-|\*|\/|%)$/g, buttonType)
          : addedValue
      case '0':
        return data.match(LAST_NUMBER_REGEX)?.pop()?.at(0) === '0' ?? false ? data : addedValue
      case '.':
        return data.match(LAST_NUMBER_REGEX)?.pop()?.includes('.') ?? false ? data : addedValue
      case 'C':
        return ''
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return data.match(LAST_NUMBER_REGEX)?.pop() === '0' ?? false ? buttonType : addedValue
      default:
        return addedValue
    }
  }, [])
}
