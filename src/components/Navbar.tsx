import React, { useState } from "react"
import NavbarLinks from "./NavbarLinks"
import styled from "styled-components"

const Navigation = styled.nav`
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  position: fixed;
  text-transform: uppercase;
  border-bottom: 2px solid #33333320;
  margin: 0 auto;
  padding: 0 5vw;
  z-index: 50;
  align-items: center;
  top: 0;
`

const Navbar = () => {
  const session = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('session') || '{}')
  let username :string = '';
  if (session) username = session.username

  return (
    <Navigation className="dark">
      <NavbarLinks  username={username} className="dark"/>
    </Navigation>
  )
}

export default Navbar
