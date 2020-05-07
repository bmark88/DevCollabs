import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import onClickOutside from "react-onclickoutside"

const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  top: 45px;
  right: 0px;
  width: 200px;
  background-color: white;
  font-weight: bold;
  position: absolute;

  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`
function Dropdown(props) {
  const [open, setOpen] = useState(false)

   const openMenu = () => {
      setOpen(!open)
   }
   Dropdown.handleClickOutside = () => setOpen(false)
  return (
    <div>
      <a onClick={openMenu}> {props.children}</a>

      {open && (
        <Menu>
          <li>
            <Link to="/404"> Chat </Link>
          </li>
          <li>
            <Link to="/"> Groups </Link>
          </li>
          <li>
            <Link to="/page-2"> Hackathons </Link>
          </li>
        </Menu>
      )}
    </div>
  )

}

const clickOutsideConfig = {
   handleClickOutside: () => Dropdown.handleClickOutside
}

export default onClickOutside(Dropdown, clickOutsideConfig)