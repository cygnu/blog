import React from 'react'
import {
  Grid
} from '@material-ui/core'
import { useViewer } from '../contexts/ViewerContext'
import { usePosts } from '../contexts/PostsContext'
import { usePost } from '../contexts/PostContext'
import { PostsList } from './PostsList'
import { Loading } from './Loading'
import { Errors } from './Errors'


export const Main: React.FC = () => {
  const { loadingViewer, errorViewer } = useViewer()
  const { loadingPosts, errorPosts } = usePosts()
  const { errorPost } = usePost()

  if (loadingViewer || loadingPosts) return <Loading />
  if (errorViewer || errorPosts || errorPost) return <Errors />

  return (
    <Grid item xs={12} md={8}>
      <PostsList />
    </Grid>
  )
}
