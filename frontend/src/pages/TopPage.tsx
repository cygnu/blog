import React from 'react'
import {
  Grid
} from '@material-ui/core'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'


export const TopPage: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Main />
        <Sidebar />
      </Grid>
      <Footer />
    </React.Fragment>
  )
}
