import { Theme } from '@emotion/react'


export interface ThemeType extends Theme {
  colors: {
    backgroundColor: string;
    color: string;
  }
}
