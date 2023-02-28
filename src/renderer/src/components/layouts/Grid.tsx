import { FC, HTMLAttributes } from 'react'
import styled, { CSSObject } from '@emotion/styled'

type GridStyleProps = {
  container?: boolean
  flexDirection?: CSSObject['flexDirection']
  flexWrap?: CSSObject['flexWrap']
  flex?: CSSObject['flex']
  flexGrow?: CSSObject['flexGrow']
  gap?: CSSObject['gap']
}

const StyledGrid = styled.div<GridStyleProps>((props) => ({
  display: props?.container ? 'flex' : 'block',
  flexDirection: props.flexDirection ?? 'row',
  flexWrap: props.flexWrap ?? 'nowrap',
  flex: props?.flex ?? 'auto',
  flexGrow: props?.flexGrow ?? '',
  gap: props?.gap ?? 0
}))

type GridProps = HTMLAttributes<HTMLDivElement> & GridStyleProps

const Grid: FC<GridProps> = (props) => {
  return <StyledGrid {...props} />
}

export default Grid
