import React from "react"
import { Link, navigate } from "gatsby"
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

const NavbarLinks = (props: any) => {
  const logout = (event :any) =>  {
    event.preventDefault();
    localStorage.removeItem('session');
    navigate('/')

  }
  return (
    <>
      {props.username && <NavItem className="avatar" to="/404">{props.username}</NavItem>}
      <Drop>Features</Drop>
      {!props.username && <NavItem to="/login">Login</NavItem>}
      {!props.username && <NavItem to="/register">Register</NavItem>}
      {props.username && <button onClick= {logout}>Logout</button> }
      
    </>
  )
}

export default NavbarLinks
