import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Dropdown from "./Dropdown"

const NavItem = styled(Link)`
  padding: 10px;
  text-decoration: none;

  &.avatar {
    margin-right: auto;
  }
`
const Drop = styled(Dropdown)`
  padding: 10px;
  text-decoration: none;
  
  &:hover {
    cursor: progress;
  }
  
`

const NavbarLinks = () => {
  return (
    <>
      <NavItem className="avatar" to="/404">
        Avatar
      </NavItem>
      <Drop>Features</Drop>
      <NavItem to="/page-2">Login</NavItem>
      <NavItem to="/page-2">Register</NavItem>
      
    </>
  )
}

export default NavbarLinks
