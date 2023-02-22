import Versions from './components/Versions'

import Input from '@renderer/components/Input'

import Container from '@renderer/components/layouts/container'

function App(): JSX.Element {
  return (
    <Container>
      <Input
        type="text"
        style={{
          appearance: 'none',
          margin: 0
        }}
      />
    </Container>
  )
}

export default App
