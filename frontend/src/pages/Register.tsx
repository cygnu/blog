import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Container,
  FormControl,
  TextField,
  Button,
  Grid,
  Link,
} from '@material-ui/core'
import { css } from '@emotion/react'
import {
  IFormInputs,
} from '../types/Auth'
import { useAuth } from '../contexts/AuthContext'


const container = css`
  margin: 0 auto;
`

const containerForm = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const cFEmail = css`
  width: 100%;
  line-height: normal;
  @media (min-width: 480px) {
    max-width: 480px;
  }
`

const cFEmailErr = css`
  text-align: start;
  color: red;
`

const cFPassword = css`
  width: 100%;
  line-height: normal;
  @media (min-width: 480px) {
    max-width: 480px;
  }
`

const cFPasswordErr = css`
  text-align: start;
  color: red;
`

const cFButton = css`
  width: 100%;
  @media (min-width: 480px) {
    max-width: 480px;
  }
`

const cFGrid = css`
  text-align: end;
  font-size: small;
`

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password is required'),
})

export const Register: React.FC<IFormInputs> = () => {
  const { signUp } = useAuth()

  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const { isDirty, isValid } = formState

  return (
    <Container css={container}>
      <form onSubmit={handleSubmit(signUp)} css={containerForm}>
        <FormControl css={cFEmail}>
          <TextField
            type="email"
            name="email"
            label="Email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            inputRef={register}
            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
          />
          {errors.email && (
            <div css={cFEmailErr}>{errors.email.message}</div>
          )}
        </FormControl>
        <FormControl css={cFPassword}>
          <TextField
            type="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            variant="outlined"
            inputRef={register}
            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
          />
          {errors.password && (
            <div css={cFPasswordErr}>{errors.password.message}</div>
          )}
        </FormControl>
        <FormControl css={cFButton}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!(isDirty && isValid)}
            style={{ marginTop: 30, marginBottom: "0.5em" }}
          >
            Register
          </Button>
          <Grid item css={cFGrid}>
            Already have an account?&nbsp;
            <Link href="/login">
              {"Login"}
            </Link>
          </Grid>
        </FormControl>
      </form>
    </Container>
  )
}
