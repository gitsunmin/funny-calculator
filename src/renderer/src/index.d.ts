/**
 * * 연산자 타입
 * * C: 'CLEAR'
 * * %: 'PERCENT'
 * * /: 'DIVISION'
 * * X: 'MULTIPLICATION'
 * * -: 'MINUS'
 * * +: 'PLUS'
 * * .: 'DOT'
 * * =: 'EQUAL'
 **/
type OperatorType = 'C' | '%' | '/' | '*' | '-' | '+' | '.' | '='

type PrecedencedOperatorsType = Exclude<OperatorType, '.' | '=' | 'C'>

/**
 * * 숫자 타입
 * * 0: 'NUMBER_0'
 * * 1: 'NUMBER_1'
 * * 2: 'NUMBER_2'
 * * 3: 'NUMBER_3'
 * * 4: 'NUMBER_4'
 * * 5: 'NUMBER_5'
 * * 6: 'NUMBER_6'
 * * 7: 'NUMBER_7'
 * * 8: 'NUMBER_8'
 * * 9: 'NUMBER_9'
 **/
type NumberType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/**
 * * C: 'CLEAR'
 * * %: 'PERCENT'
 * * /: 'DIVISION'
 * * x: 'MULTIPLICATION'
 * * -: 'MINUS'
 * * +: 'PLUS'
 * * .: 'DOT'
 * * =: 'EQUAL'
 * * 0: 'NUMBER_0'
 * * 1: 'NUMBER_1'
 * * 2: 'NUMBER_2'
 * * 3: 'NUMBER_3'
 * * 4: 'NUMBER_4'
 * * 5: 'NUMBER_5'
 * * 6: 'NUMBER_6'
 * * 7: 'NUMBER_7'
 * * 8: 'NUMBER_8'
 * * 9: 'NUMBER_9'
 */
type ButtonType = OperatorType | NumberType

/** output의 Type을 정의한다. */
type OutputType = (ButtonType | number)[]

/** OperaterStack의 Type을 정의한다. */
type OperatorsType = ButtonType
