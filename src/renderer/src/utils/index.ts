// Higher-order functions

export const compose =
  <T>(...functions) =>
  (input: T): number =>
    functions.reduceRight((acc, fn) => fn(acc), input)

export const pipe =
  <T>(...functions) =>
  (input: T): number =>
    functions.reduce((acc, fn) => fn(acc), input)
