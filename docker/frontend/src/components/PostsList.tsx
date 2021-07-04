import React from 'react'
import { usePosts } from '../contexts/PostsContext'


export const PostsList: React.FC = () => {
  const { dataPosts } = usePosts()

  return (
    <ul>
      {dataPosts &&
        dataPosts.allPosts &&
        dataPosts.allPosts.edges.map((post: any) => (
          <li key={post.node.id}>
            <img src={post.node.thumbnail} alt="thumbnail" />
            <h1>{post.node.title}</h1>
            <span>{post.node.updatedAt}</span>
          </li>
        ))
      }
    </ul>
  )
}
