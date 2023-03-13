/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useRef } from 'react'

import Input from '@renderer/components/Input'
import Button from '@renderer/components/Button'
import Grid from '@renderer/components/layouts/Grid'

import { RiDivideFill } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import {
  TbEqual,
  TbNumber0,
  TbNumber1,
  TbNumber2,
  TbNumber3,
  TbNumber4,
  TbNumber5,
  TbNumber6,
  TbNumber7,
  TbNumber8,
  TbNumber9
} from 'react-icons/tb'

import { WINDOW_SIZE } from './../../data'

import Container from '@renderer/components/layouts/container'
import { useCalculator } from '@renderer/hooks'

function App(): JSX.Element {
  const BUTTON_PAD_SIZE = {
    height: WINDOW_SIZE.HEIGHT - 54 - 24,
    width: WINDOW_SIZE.WIDTH
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const calculator = useCalculator()

  /** 버튼 클릭 시 액션 */
  const onClickButton = (buttenTyle: ButtonType): void => {
    if (inputRef !== null && inputRef?.current) {
      const endIndex = inputRef.current.value.length

      /** 가장 오른쪽에 focus를 옮기기 위한 노력크 */
      inputRef.current.value = calculator(buttenTyle, inputRef.current.value)
      inputRef.current.setSelectionRange(endIndex, endIndex)
      inputRef.current.focus()
    }
  }

  return (
    <Container>
      <div
        style={{
          width: BUTTON_PAD_SIZE.width
        }}
      >
        <Input
          type="text"
          readOnly
          ref={inputRef}
          style={{
            appearance: 'none',
            margin: 0
          }}
        />
      </div>
      <Grid container gap={1} style={{ height: BUTTON_PAD_SIZE.height, textAlign: 'center' }}>
        <Grid container flexGrow={3} flexDirection={'column'} gap={1}>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={2.5}>
              <Button
                style={{ background: 'dimgray' }}
                onClick={() => {
                  onClickButton('C')
                }}
              >
                C
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                style={{ background: 'dimgray' }}
                onClick={() => {
                  onClickButton('%')
                }}
              >
                %
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('7')
                }}
              >
                <TbNumber7 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('8')
                }}
              >
                <TbNumber8 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('9')
                }}
              >
                <TbNumber9 size="22" />
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('4')
                }}
              >
                <TbNumber4 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('5')
                }}
              >
                <TbNumber5 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('6')
                }}
              >
                <TbNumber6 size="22" />
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('1')
                }}
              >
                <TbNumber1 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('2')
                }}
              >
                <TbNumber2 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('3')
                }}
              >
                <TbNumber3 size="22" />
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid style={{ flexGrow: 1.78 }}>
              <Button
                onClick={() => {
                  onClickButton('0')
                }}
              >
                <TbNumber0 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button
                onClick={() => {
                  onClickButton('.')
                }}
              >
                .
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container flexGrow={1} flexDirection={'column'} gap={1}>
          <Grid flexGrow={1}>
            <Button
              style={{ background: 'darkorange' }}
              onClick={() => {
                onClickButton('/')
              }}
            >
              <RiDivideFill size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button
              style={{ background: 'darkorange' }}
              onClick={() => {
                onClickButton('*')
              }}
            >
              <RxCross2 size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button
              style={{ background: 'darkorange' }}
              onClick={() => {
                onClickButton('-')
              }}
            >
              <AiOutlineMinus size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button
              style={{ background: 'darkorange' }}
              onClick={() => {
                onClickButton('+')
              }}
            >
              <AiOutlinePlus size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button
              style={{ background: 'darkorange' }}
              onClick={() => {
                onClickButton('=')
              }}
            >
              <TbEqual size="22" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
