import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavItem = styled(Link)`
  padding: 10px;
  text-decoration: none;

  &.avatar {
    margin-right: auto;
  }
`

const NavbarLinks = () => {
  return (
    <>
      <NavItem className="avatar" to="/profile">
        Avatar
      </NavItem>
      <NavItem to="/">Features</NavItem>
      <NavItem to="/">Login</NavItem>
      <NavItem to="/">Register</NavItem>
    </>
  )
}

export default NavbarLinks
