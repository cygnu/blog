import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import { css } from '@emotion/react'
import { useAuth } from '../contexts/AuthContext'
// import { MenuList } from './MenuList'


const cTTypo = css`
  flex: 1;
  align-items: center;
`

export const Header: React.FC = () => {
  const { user } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          css={cTTypo}
        >
          Title
        </Typography>
        {user ? <div /> : (
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
