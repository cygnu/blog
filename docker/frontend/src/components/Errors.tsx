import React from 'react'
import { useViewer } from '../contexts/ViewerContext'
import { usePosts } from '../contexts/PostsContext'
import { usePost } from '../contexts/PostContext'


export const Errors: React.FC = () => {
  const { errorViewer } = useViewer()
  const { errorPosts } = usePosts()
  const { errorPost } = usePost()

  return (
    <React.Fragment>
      {errorViewer && (
        <h1>{errorViewer.message}</h1>
      )}
      {errorPosts && (
        <h1>{errorViewer.message}</h1>
      )}
      {errorPost && (
        <h1>errorPost.message</h1>
      )}
    </React.Fragment>
  )
}
