import { FC, InputHTMLAttributes } from 'react'
import styled from '@emotion/styled'

const StyledInput = styled.input({
  height: 50,
  background: 'transparent',
  fontSize: 48,
  textAlign: 'right'
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
