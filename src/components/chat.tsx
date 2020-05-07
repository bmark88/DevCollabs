import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const Div = styled.div`
  border: solid;
  min-height: 600px;
  position: fixed;
  right: 0;
  margin: 2em;
  width: 40%;
  opacity: 80%;
  float: right;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const Chat = ({ children } :Props) => {
  return <Div>{children}</Div>
};

export default Chat;