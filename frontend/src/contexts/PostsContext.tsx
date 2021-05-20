import React, {
  createContext,
  useContext,
} from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS } from '../graphql/queries'


interface IPosts {
  loadingPosts: boolean;
  errorPosts: any | undefined;
  dataPosts: any | undefined;
}

const PostsContext = createContext<IPosts>({} as IPosts)

const usePosts = () => useContext(PostsContext)

const PostsProvider: React.FC = (props: any) => {
  const {
    loading: loadingPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery(GET_POSTS)

  return (
    <PostsContext.Provider
      value={{
        loadingPosts,
        errorPosts,
        dataPosts,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  )
}

export { usePosts, PostsProvider }
