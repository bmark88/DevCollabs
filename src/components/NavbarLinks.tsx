import React from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import DropDown from "../components/Dropdown"

const NavItem = styled(Link)`
  padding: 10px;
  text-decoration: none;
  font-family: georgia serif;
  font-size: 18px;
`;

const Div = styled.div`
  font-family: georgia, serif;
  font-size: 18px;
  color: #551A8B;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  min-width: 47px;
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
    typeof window !== 'undefined' && window.localStorage.removeItem('session');
    navigate("/login")
  }
  
  return (
    <>
      {props.username && (
      <>
        <Div>
          <Link to="/settings">
          <Img 
            src={"https://planetbotanix.com/wp-content/uploads/2017/08/Female-Avatar-1-300x300-300x300.jpg"} 
            alt="avatar-image"
          />
          </Link>
          <NavItem className="avatar" to="/settings">
              {props.username}
          </NavItem>
        </Div>
      </>
      )}
      <NavItem to="/">
        Dev Collabs
      </NavItem>
      <Div>
        {props.username && <DropDown />}
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
  );
};

export default NavbarLinks;