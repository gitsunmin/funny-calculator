import Big from 'big.js'

import { useCalculator } from '../hooks'

describe('[Calulator]', () => {
  test('Testing Oprator Plus', async () => {
    const A = 1234
    const B = 2345

    const calulator = useCalculator()

    expect(calulator('=', `${A}+${B}`)).toBe(Big(A).plus(Big(B)).toString())
  })

  test('Testing Oprator Divide', async () => {
    const A = 1111
    const B = 4444

    const calulator = useCalculator()

    expect(calulator('=', `${B}/${A}`)).toBe(Big(B).div(Big(A)).toString())
  })

  test('Testing Oprator Times', async () => {
    const A = 1234
    const B = 2345

    const calulator = useCalculator()

    expect(calulator('=', `${B}*${A}`)).toBe(Big(B).times(Big(A)).toString())
  })

  test('Testing Oprator Times and Divide', async () => {
    const A = 1111
    const B = 2222
    const C = 1234

    const calulator = useCalculator()

    expect(calulator('=', `${B}/${A}*${C}`)).toBe(Big(B).div(Big(A)).times(C).toString())
  })

  test('Testing Oprator Times and Divide and Plus(decimal)', async () => {
    const A = 1111
    const B = 2222
    const C = 1234
    const D = 2333.12

    const calulator = useCalculator()

    expect(calulator('=', `${B}/${A}*${C}+${D}`)).toBe(
      Big(B).div(Big(A)).times(C).plus(D).toString()
    )
  })
})
