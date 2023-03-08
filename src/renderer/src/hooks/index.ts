import { useCallback } from 'react'

// const inputs: (ButtonType | number)[] = []
const outputs: (ButtonType | number)[] = []
const operators: ButtonType[] = []

const calculate = (data: string): string => {
  for (const token of data.split(/(\+|-|\*|\/|%)/) as ButtonType[]) {
    const isNaN = Number.isNaN(Number(token))
    if (isNaN) {
      operators.push(token)
    } else {
      outputs.push(token)
    }
  }
  console.log('outputs:', outputs)
  console.log('operators:', operators)
  return '110'
}

/**
 * * button의 입력을 받아서 액션을 실행하는 함숫
 * * TODO 네이밍 병경
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
