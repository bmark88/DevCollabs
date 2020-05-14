import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Button = styled.button`
  background-color: green;
  float: right;
  position: relative;
  margin: 0.5em;
  border-radius: 12px;
  z-index: 1;

  &&:hover {
    background-color: black;
    color: green;
  }
`;

const Add = ({ children } :Props) => {
  return <Button>{children}</Button>
};

export default Add;