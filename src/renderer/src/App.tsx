import Input from '@renderer/components/Input'
import Button from '@renderer/components/Button'
import Grid from '@renderer/components/layouts/Grid'

import { RiDivideFill } from 'react-icons/ri'
import { RxCross2, RxHeight } from 'react-icons/rx'
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

function App(): JSX.Element {
  const BUTTON_PAD_SIZE = {
    height: WINDOW_SIZE.HEIGHT - 54 - 24,
    width: WINDOW_SIZE.WIDTH
  }

  return (
    <Container>
      <div
        style={{
          width: BUTTON_PAD_SIZE.width
        }}
      >
        <Input
          type="number"
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
              <Button style={{ background: 'dimgray' }}>C</Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button style={{ background: 'dimgray' }}>%</Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber7 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber8 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber9 size="22" />
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber4 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber5 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber6 size="22" />
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber1 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber2 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>
                <TbNumber3 size="22" />
              </Button>
            </Grid>
          </Grid>
          <Grid container flexGrow={1} gap={1}>
            <Grid style={{ flexGrow: 1.78 }}>
              <Button>
                <TbNumber0 size="22" />
              </Button>
            </Grid>
            <Grid flexGrow={1}>
              <Button>.</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container flexGrow={1} flexDirection={'column'} gap={1}>
          <Grid flexGrow={1}>
            <Button style={{ background: 'darkorange' }}>
              <RiDivideFill size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button style={{ background: 'darkorange' }}>
              <RxCross2 size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button style={{ background: 'darkorange' }}>
              <AiOutlineMinus size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button style={{ background: 'darkorange' }}>
              <AiOutlinePlus size="22" />
            </Button>
          </Grid>
          <Grid flexGrow={1}>
            <Button style={{ background: 'darkorange' }}>
              <TbEqual size="22" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
