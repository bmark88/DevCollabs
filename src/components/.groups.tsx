import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const GroupList = styled.div`
  border: solid;
  height: 800px;
  width: 20%;
  float: left;
`;

const Groups = ({ children } :Props) => {
  return (
    <GroupList>{children}</GroupList>
  )
};

export default Groups;