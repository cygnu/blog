import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ViewerProvider } from './contexts/ViewerContext'
import { PostsProvider } from './contexts/PostsContext'
import { PostProvider } from './contexts/PostContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { TopPage } from './pages/TopPage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import { CreatePost } from './pages/CreatePost'
import { PrivateRoute } from './components/PrivateRoute'
import { PostDetails } from './components/PostDetails'


const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql/',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the contexts so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ViewerProvider>
          <PostsProvider>
            <PostProvider>
              <ThemeProvider>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={ TopPage } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/:username" component={ Profile } />
                    <Route exact path="/:username/:id" component={ PostDetails } />
                    <PrivateRoute exact path="/post/create" component={ CreatePost } />
                  </Switch>
                </BrowserRouter>
              </ThemeProvider>
            </PostProvider>
          </PostsProvider>
        </ViewerProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
