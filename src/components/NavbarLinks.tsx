import React from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import Dropdown from "./Dropdown"

const NavItem = styled(Link)`
  padding: 10px;
  text-decoration: none;
  font-family: georgia serif;
  font-size: 18px;
`;

const Drop = styled(Dropdown)`
  text-decoration: none;
  
  &:hover {
    cursor: progress;
  }
`;

const Div = styled.div`
  font-family: georgia, serif;
  font-size: 18px;
  color: #551A8B;
  position: absolute;
  display: flex;
  right: 5vw;
`;

const Img = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  border: solid;
  border-width: thin;
  margin: 0;
  background-color: black;
`;

const NavbarLinks = (props: any) => {
  const logout = (event :any) =>  {
    event.preventDefault();
    localStorage.removeItem('session');
    navigate("/login")
  }
  
  return (
    <>
      {props.username && (
      <>
        <a href="/settings"> 
        <Img src={"/female-avatar.png"} alt="avatar-image"/>
        </a>
        <NavItem className="avatar" to="/settings">
            {props.username}
        </NavItem>
      </>
      )}
      <Div>
        {props.username && <Drop>Features</Drop>}
        {!props.username && 
          <>
            <NavItem to="/register">
              Sign Up
            </NavItem>
            <NavItem to="/login">
              Sign In
            </NavItem>
          </>
        }
        {props.username && 
          <NavItem to="/login" onClick={logout}>
            Sign out
          </NavItem> 
        }
      </Div>
    </>
  )
}

export default NavbarLinks
