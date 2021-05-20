import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormControl,
  TextField
} from '@material-ui/core'
// import {
//   CREATE_USER,
//   CREATE_LINK_IN_BIO,
//   CREATE_PROFILE,
// } from '../graphql/mutations'


interface IFormInputs {
  username: string;
  first_name: string;
  last_name: string;
  local: string;
  bio: string;
  github_url: string;
  qiita_url: string;
  twitter_url: string;
  website_url: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .required(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  local: Yup.string(),
  bio: Yup.string(),
  github_url: Yup.string()
    .required(),
  qiita_url: Yup.string(),
  twitter_url: Yup.string(),
  website_url: Yup.string(),
})

export const CreateProfile: React.FC = () => {
  const { register } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  return (
    <form>
      <FormControl>
        <TextField
          type="input"
          label="User Name"
          inputRef={register}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="input"
          label="First Name"
          inputRef={register}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="input"
          label="Last Name"
          inputRef={register}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="input"
          label="Local"
          inputRef={register}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="input"
          label="Bio"
          inputRef={register}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="input"
          label="GitHub URL"
          inputRef={register}
        />
      </FormControl>
    </form>
  )
}
