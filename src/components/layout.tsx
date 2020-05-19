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
    {/* <header>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </header> */}
      <Navbar />
      <div
        style={{
          marginTop: `60px`,
          top: 0,
          // maxWidth: 960,
          // padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
 