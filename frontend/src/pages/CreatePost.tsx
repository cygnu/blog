import React from 'react'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Container,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { css } from '@emotion/react'
import { CREATE_POST } from '../graphql/mutations'
// import { useAuth } from '../contexts/AuthContext'


const container = css`
  margin: 0 auto;
`

const containerForm = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const cFTitle = css`
  width: 100%;
  line-height: normal;
`

const cFTitleErr = css`
  text-align: start;
  color: red;
`

const cFDescription = css`
  width: 100%;
  line-height: normal;
`

const cFDescriptionErr = css`
  text-align: start;
  color: red;
`

const cFThumbnail = css`
  display: flex;
  justify-content: flex-end;
`

const cFTInputFile = css`
  display: none;
`

const cFButton = css`
  align-items: end;
`

interface IFormInputs {
  title: string,
  description: string,
  thumbnail: string,
  content: string,
  tags: string[],
  category: string,
  is_publish: boolean,
}

const schema = Yup.object().shape({
  title: Yup.string()
    .max(150, 'Title must have within 150 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(255, 'Description must have within 255 characters'),
  thumbnail: Yup.mixed()
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0].size < 2000000
    }),
  content: Yup.string().required('Content is required'),
  tags: Yup.array()
    .of(
      Yup.object().shape({
         name: Yup.string(),
      })
    ),
  category: Yup.string().required('Category is required'),
  is_publish: Yup.boolean()
})

export const CreatePost: React.FC = () => {
  const [createPost] = useMutation(CREATE_POST)
  // const { user } = useAuth()

  const post = async () => {
    try {
      await createPost()
    } catch (err) {
      console.log(err)
    }
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: IFormInputs) => {
    post()
    console.log(data)
  }

  return (
    <Container css={container}>
      <form onSubmit={handleSubmit(onSubmit)} css={containerForm}>
        <FormControl css={cFTitle}>
          <TextField
            type="input"
            name="title"
            label="Title"
            autoFocus
            variant="outlined"
            inputRef={register}
          />
          {errors.title && (
            <div css={cFTitleErr}>{errors.title.message}</div>
          )}
        </FormControl>
        <FormControl css={cFDescription}>
          <TextField
            type="input"
            name="description"
            label="Description"
            variant="outlined"
            inputRef={register}
          />
          {errors.description && (
            <div css={cFDescriptionErr}>{errors.description.message}</div>
          )}
        </FormControl>
        <FormControl css={cFThumbnail}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
          >
            Uploads
            <input
              type="file"
              ref={register}
              css={cFTInputFile}
            />
          </Button>
        </FormControl>
        <FormControl css={cFButton}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}
