import styled from '@emotion/styled'

export default styled.input({
  height: 50,
  width: '100%',
  background: 'transparent',
  color: 'white',
  border: 0,
  fontSize: 48,
  textAlign: 'right',
  caretColor: 'transparent',
  '::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none'
  },
  '::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none'
  },
  '-webkit-user-select': 'all',
  '-moz-user-select': 'all',
  '-ms-user-select': 'all',
  userSelect: 'all',

  ':focus': {
    border: 0,
    outline: 'none'
  }
})
