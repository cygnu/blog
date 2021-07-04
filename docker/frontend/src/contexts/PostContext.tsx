import React, {
  createContext,
  useContext,
} from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_POST } from '../graphql/queries'


interface IPost {
  getPost: any;
  dataPost: any | undefined;
  errorPost: any | undefined;
}

const PostContext = createContext({} as IPost)

const usePost = () => useContext(PostContext)

const PostProvider: React.FC = (props: any) => {
  const [
    getPost,
    { data: dataPost, error: errorPost }
  ] = useLazyQuery(GET_POST, { fetchPolicy: "network-only" })

  return (
    <PostContext.Provider
      value={{
        getPost,
        dataPost,
        errorPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export { usePost, PostProvider }
