import React from 'react'
import { Switch } from '@material-ui/core'
import { useTheme } from '@emotion/react'
import { ThemeType } from '../types/Theme'
import { useThemeUpdate } from '../contexts/ThemeContext'


export const ThemeView: React.FC = () => {
  const theme = useTheme() as ThemeType
  const toggleTheme = useThemeUpdate()

  return (
    <Switch
      color="primary"
      onChange={() => toggleTheme(true)}
      inputProps={{ 'aria-label': 'primary checkbox' }}
      css={{
        backgroundColor: theme.colors.backgroundColor,
        color: theme.colors.color,
      }}
    />
  )
}
