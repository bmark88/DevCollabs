import React, { useState } from "react"
import NavbarLinks from "./NavbarLinks"
import styled from "styled-components"

const Navigation = styled.nav`
  width: 100vw;
  height: 60px;
  display: flex;
  background-color: #fff;
  position: fixed;
  justify-content: space-between;
  text-transform: uppercase;
  border-bottom: 2px solid #33333320;
  margin: 0 auto;
  padding: 0 5vw;
  z-index: 2;
  align-items: center;
  top: 0;
`

const Navbar = () => {
  const session = JSON.parse(localStorage.getItem('session'))
  let username :string = '';
  if (session) username = session.data.username

  return (
    <Navigation>
      <NavbarLinks  username={username}/>
    </Navigation>
  )
}

export default Navbar
