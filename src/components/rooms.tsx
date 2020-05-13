import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const RoomLinks = styled.div`
  width: 55vw;
  position: relative;
`;

const Div = styled.div`
  border: solid;
  margin: 1em 0;
  height: 120px;
`;

const Room = ({ children } :Props) => {
  return (
    <Div>{children}</Div>
  )
};

const Rooms = ({ children } :Props) => {
  return (
    <RoomLinks>{children}</RoomLinks>
  )
};

export { Rooms, Room};