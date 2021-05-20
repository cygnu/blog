import React from 'react'
import { usePost } from '../contexts/PostContext'


export const PostDetails: React.FC = () => {
  const { dataPost } = usePost()

  return (
    <React.Fragment>
      {dataPost &&
        dataPost.post && (
          <React.Fragment>
            <h1>{dataPost.post.title}</h1>
            <p>{dataPost.post.tags}</p>
          </React.Fragment>
      )}
    </React.Fragment>
  )
}
