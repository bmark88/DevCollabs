import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from "styled-components";
import { Link } from "gatsby"

const Div = styled.div`
  font-family: georgia, serif;
  font-size: 18px;
  color: #551A8B;
`;

export default function Dropdown() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Div>Features</Div>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/">Home Page</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/group">Groups</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/hackathon">Hackathons</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/settings">Settings</Link>
        </MenuItem>
      </Menu>
    </>
  );
}