import React, {
  createContext,
  useContext,
  useState
} from 'react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'
import { ThemeType } from '../types/Theme'


const lightTheme: ThemeType = {
  colors: {
    backgroundColor: '#E2E2E2',
    color: '#363537',
  }
}

const darkTheme: ThemeType = {
  colors: {
    backgroundColor: '#363537',
    color: '#FAFAFA',
  }
}

const ThemeContext = createContext(false)

const ThemeUpdateContext = createContext((darkMode: boolean) => {})

const useThemeContext = () => useContext(ThemeContext)

const useThemeUpdate = () => useContext(ThemeUpdateContext)

const ThemeProvider: React.FC = (props: any) => {
  const [useDarkTheme, setDarkTheme] = useState(
    window.localStorage.getItem('theme') === 'true' ? true : false
  )

  const toggleTheme = (darkMode: boolean) => {
    window.localStorage.setItem('theme', String(darkMode))
    setDarkTheme(darkMode)
  }

  return (
    <EmotionProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={useDarkTheme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {props.children}
        </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    </EmotionProvider>
  )
}

export { useThemeContext, useThemeUpdate, ThemeProvider }
