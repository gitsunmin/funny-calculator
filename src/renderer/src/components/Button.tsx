import { ButtonHTMLAttributes, FC } from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button({
  background: 'gray',
  color: 'white',
  height: 47,
  width: '100%',
  opacity: '.7',
  fontSize: 18,
  border: 0,
  ':active': {
    background: 'lightgray !important'
  }
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = (props) => {
  return (
    <>
      <StyledButton {...props} />
    </>
  )
}

export default Button
