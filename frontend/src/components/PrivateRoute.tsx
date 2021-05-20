import React from 'react'
import {
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
  const { user } = useAuth()

  if (user != null) {
    return <Route {...props} />
  } else {
    return <Redirect to="/login" />
  }
}
