import { match, P } from 'ts-pattern'
import { A, F, O, R, S, flow, pipe } from '@mobily/ts-belt'
import Bigjs from 'big.js'

/** 연산자의 우선순위를 정한 MAP. */
const operatorsPrecedence: Record<PrecedencedOperatorsType, number> = {
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
const convert = (input: string): readonly (OperatorType | number)[] => {
  /** operator stack */
  const operators: OperatorType[] = []
  const outputs: (OperatorType | number)[] = []

  let i = 0

  const convertedInputs = pipe(
    input,
    S.splitByRe(OPERATORS_REGEX),
    A.map(F.ifElse(flow(Number, isNaN), F.identity, Number))
  ) as (OperatorType | number)[]

  while (convertedInputs.length > i) {
    const isSuccess = match(A.get(convertedInputs, i))
      .with(P.string, (token) => {
        const nextOperatorPrecedence = operatorsPrecedence[token] ?? 0
        const previousOperatorPrecedence = operatorsPrecedence?.[operators.at(-1) ?? ''] ?? 0
        const isNextHigher = nextOperatorPrecedence > previousOperatorPrecedence

        if (isNextHigher) operators.push(token)
        else
          pipe(
            operators.pop(),
            O.fromNullable,
            O.tap((lastOperator) => outputs.push(lastOperator))
          )

        return isNextHigher
      })
      .with(P.number, (token) => {
        outputs.push(token)
        return O.None
      })
      .otherwise(F.ignore)

    if (isSuccess === O.Some(false)) {
      continue
    }

    i++
  }

  return pipe(operators, A.reverse, A.concat(A.reverse(outputs)), A.reverse)
}

const calculate = (input: readonly (OperatorType | number)[]): number => {
  const outputs = [...input]
  let i = 0

  /** output에 있는 값을 분석하여 알맞는 연산을 수행한다. */
  while (outputs.length > 1)
    pipe(
      outputs[i],
      O.fromPredicate((output) => typeof output === 'string'),
      O.toResult(''),
      R.tap((output) => {
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
      }),
      R.tapError(() => {
        i++
      })
    )

  return pipe(outputs, A.head, Number)
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

const withEqual = (data: string): string => pipe(data, flow(convert, calculate), String)

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
