/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from "react"
// import { useStaticQuery, graphql } from "gatsby"
import Navbar from './Navbar' 

import "./layout.css"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
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
    </>
  )
}

export default Layout
