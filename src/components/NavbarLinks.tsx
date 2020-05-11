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

const Div = styled.div`
  font-family: georgia, serif;
  font-size: 18px;
  color: #551A8B;
`;

const NavbarLinks = (props: any) => {
  const logout = (event :any) =>  {
    event.preventDefault();
    localStorage.removeItem('session');
    navigate("/login")
  }
  return (
    <>
      {props.username && <NavItem className="avatar" to="/404">{props.username}</NavItem>}
      <Drop>Features</Drop>
      {!props.username && <NavItem to="/login">Login</NavItem>}
      {props.username && <NavItem to="/login" onClick={logout}>Logout</NavItem> }
      {!props.username && <NavItem to="/register">Register</NavItem>}
      
    </>
  )
}

export default NavbarLinks
