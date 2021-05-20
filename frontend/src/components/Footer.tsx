import React from 'react'
import {
  Container,
  Typography,
  Link,
} from '@material-ui/core'


const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/cygnu">
        cygnu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const Footer: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Copyright />
    </Container>
  )
}
