import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { css } from '@emotion/react'


const outer = css`
  position: relative;
`

const inner = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`

export const Loading: React.FC = () => {
  return (
    <div css={outer}>
      <CircularProgress css={inner} />
    </div>
  )
}
