import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
}

const UserList = styled.div`
  border: solid;
  height: 800px;
  width: 20%;
  float: right;
`;

const Users = ({ children } :Props) => {
  return (
    <UserList>{children}</UserList>
  )
};

export default Users;