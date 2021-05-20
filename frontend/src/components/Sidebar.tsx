import React from 'react'
import { Link } from 'react-router-dom'
import {
  Grid
} from '@material-ui/core'


export const Sidebar: React.FC = () => {
  return (
    <Grid item xs={12} md={4}>
      Sidebar
      <Link to="/post/create">Create Post</Link>
    </Grid>
  )
}
