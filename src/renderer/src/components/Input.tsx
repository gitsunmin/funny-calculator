import { FC, InputHTMLAttributes } from 'react'
import styled from '@emotion/styled'

const StyledInput = styled.input({
  height: 50,
  width: '100%',
  background: 'transparent',
  border: 0,
  fontSize: 48,
  textAlign: 'right',
  '::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none'
  },
  '::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none'
  },

  ':focus': {
    border: 0,
    outline: 'none'
  }
})

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputProps> = (props) => {
  return (
    <>
      <StyledInput {...props} />
    </>
  )
}

export default Input
