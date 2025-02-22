import React, { createContext, useContext } from 'react';
import { ThemeConfig } from './navbar.types';

const defaultConfig: ThemeConfig = {
  theme: 'light',
  font: 'Arial',
  textColor: '#333333',
  backgroundColor: '#ffffff'
}

const ThemeContext = createContext<ThemeConfig>(defaultConfig);

export const useTheme = () => useContext(ThemeContext);

export { ThemeContext };