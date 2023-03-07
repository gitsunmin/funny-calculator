import { useCallback } from 'react'

const inputs: ButtonType[] = []
const outputs: ButtonType[] = []
const operators: ButtonType[] = []

/**
 * * button의 입력을 받아서 액션을 실행하는 함숫
 * * TODO 네이밍 병경
 */
export const useClickButton = (): ((buttonType: ButtonType, data: string) => string) => {
  return useCallback((buttonType: ButtonType, data: string): string => {
    const addedValue = `${data}${buttonType}`

    switch (buttonType) {
      case '=':
        /** TODO calculate */
        break
      case 'C':
        return ''
      case '%':
      case '*':
      case '+':
      case '-':
      case '/':
        if (['%', '*', '+', '-', '/'].includes(data?.at(-1) ?? '')) {
          return data
        }
        if (data.length === 0) {
          return data
        }
        return addedValue
      case '0':
        return '0' === data?.at(-1) ? data : addedValue
      case '.':
        return data.includes('.') ? data : addedValue
      default:
        return addedValue
    }
    return ''
  }, [])
}
