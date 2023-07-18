import { match, P } from 'ts-pattern'
import { A, O, S, flow, pipe } from '@mobily/ts-belt'
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
 * 중위 표기법으로 입력된 input을 후위 표기법으로 변환하는 함수
 */
const convert = (input: string): OutputType => {
  /** operator stack */
  const operators: OperatorType[] = []
  const outputs: OutputType = []

  const convertedInputs = input.split(OPERATORS_REGEX) as string[]

  let i = 0

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

const calculate = (outputs: OutputType): OutputType => {
  let i = 0
  /** output에 있는 값을 분석하여 알맞는 연산을 수행한다. */
  while (outputs.length > 1) {
    const output = outputs[i]
    if (typeof output === 'string') {
      const [leftNumber, rightNumber] = outputs.slice(i - 2, i)

      const leftBigNumber = new Bigjs(leftNumber as number)
      const rightBigNumber = new Bigjs(rightNumber as number)

      const calculate = match(output)
        .with('+', () => leftBigNumber.plus(rightBigNumber).toNumber())
        .with('-', () => leftBigNumber.minus(rightBigNumber).toNumber())
        .with('*', () => leftBigNumber.times(rightBigNumber).toNumber())
        .with('/', () => leftBigNumber.div(rightBigNumber).toNumber())
        .with('%', () => leftBigNumber.mod(rightBigNumber).toNumber())
        .otherwise(() => new Bigjs(0).toNumber())

      outputs.splice(i - 2, 3, calculate)

      i = 0
    } else i++
  }

  return outputs
}

const withBasicOperators =
  (data: string) =>
  (buttonType: ButtonType): string =>
    data.match(INVALIDATED_CASE_REGEX)
      ? data.replace(/(\+|-|\*|\/|%)$/g, buttonType)
      : data.concat(buttonType)

const withNumber =
  (data: string) =>
  (buttonType: ButtonType): string =>
    data.match(LAST_NUMBER_REGEX)?.pop() === '0' ?? false ? buttonType : data.concat(buttonType)

const withZero =
  (data: string) =>
  (buttonType: ButtonType): string =>
    data.match(LAST_NUMBER_REGEX)?.pop()?.at(0) === '0' ?? false ? data : data.concat(buttonType)

const withDot =
  (data: string) =>
  (buttonType: ButtonType): string =>
    data.match(LAST_NUMBER_REGEX)?.pop()?.includes('.') ?? false ? data : data.concat(buttonType)

const withEqual = (data: string): string =>
  pipe(
    data,
    O.map(flow(convert, calculate)),
    O.fromPredicate(A.isNotEmpty),
    O.map(flow(A.head, String)),
    O.getWithDefault(data)
  )

const withCancel = (): string => ''

/**
 * * button의 입력을 받아서 액션을 실행하는 함숫
 */
export const handleInput =
  (data: string) =>
  (buttonType: ButtonType): string =>
    match(buttonType)
      .with(P.union('%', '*', '+', '-', '/'), withBasicOperators(data))
      .with(P.union('1', '2', '3', '4', '5', '6', '7', '8', '9'), withNumber(data))
      .with('0', withZero(data))
      .with('.', withDot(data))
      .with('C', withCancel)
      .with('=', () => withEqual(data))
      .otherwise(() => data.concat(buttonType))
