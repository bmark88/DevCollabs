import React, { ReactNode, useState, useEffect } from "react"
import Navbar from './Navbar' 
import storage from "local-storage-fallback"

import "./layout.css"
import DarkMode from "./DarkMode"
import styled, { ThemeProvider } from "styled-components"
import Brightness3Icon from '@material-ui/icons/Brightness3';

interface Props {
  children: ReactNode
}

const getInitialTheme = () => {
  const savedTheme = storage.getItem('theme')
  return savedTheme ? JSON.parse(savedTheme) : { mode: 'light' }
};

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState(getInitialTheme)
  
  useEffect(() => {
    storage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  const ThemeButton = styled(Brightness3Icon)`
    position: fixed;
    z-index: 500;
    top: 8px;
    left: 0;
  `;

  return (
    <>
    <ThemeProvider theme={theme}>
    <ThemeButton 
      fontSize='large'
      onClick={e => setTheme(theme.mode === 'dark' ? 
      { mode: 'light' } : { mode: 'dark' })}
    >
      Change Theme
    </ThemeButton> 
    <DarkMode />
      <Navbar />
      <div style={{marginTop: `60px`}}>
        <main>{children}</main>
        <footer>
          {new Date().getFullYear()}  
          {` `}
          <a href="https://github.com/bmark88/lhl-final/">DevCollab Open Source </a>   
           | Bradley Mark, Elizabeth Brown, Tomas Wen - Made with Love 🖤 
        </footer>
      </div>
    </ThemeProvider>
    </>
  )
}

export default Layout
