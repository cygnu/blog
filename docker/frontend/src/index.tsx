import React from 'react'
import { render } from 'react-dom'
import { App } from './App'


const Main: React.FC = () => {
  return <App />
}

render(<Main />, document.getElementById('root'))
