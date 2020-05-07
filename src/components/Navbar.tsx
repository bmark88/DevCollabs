import React, { useState } from "react"
import NavbarLinks from "./NavbarLinks"
import styled from "styled-components"

const Navigation = styled.nav`
  width: 100vw;
  height: 10vh;
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
`

const Navbar = () => {
  return (
    <Navigation>
      <NavbarLinks />
    </Navigation>
  )
}

export default Navbar
