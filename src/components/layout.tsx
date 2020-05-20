/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode, useState, useEffect } from "react"
// import { useStaticQuery, graphql } from "gatsby"
import Navbar from './Navbar' 
import storage from "local-storage-fallback"

import "./layout.css"
import DarkMode from "../components/DarkMode"
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

  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  const ThemeButton = styled(Brightness3Icon)`
    position: fixed;
    z-index: 5;
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
      <div
        style={{
          marginTop: `60px`,
          // maxWidth: 960,
          // padding: `0 1.0875rem 1.45rem`,
        }}
      >
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
