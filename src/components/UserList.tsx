import React from "react"
import styled from "styled-components"
import { RoomCard } from "../components/rooms"
import UserListItem from "./userListItem"

interface Props {
  users: any
}

const Div = styled.div`
  @media (max-width: 800px) {
    // position: absolute;
    // top: 1050px;
    // width: 1000px;
  }
  @media (max-width: 1200px) {
    width: 1000px;
    flex-direction: column;

  }
  
`
const UserContainer = styled.div`
  width: 100%;

  @media (max-width: 1200px) {
    position: relative;
  }
  // float: right;
`

const Ul = styled.ul`
  margin-left: 0;
  list-style: none;
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
  @media (max-width: 1200px) {
    font-size: 12px;

  }
`

const UserList = ({ users }: Props) => {
  return (
    <Div>
      <RoomCard title="Users List" image="https://bit.ly/3bDrCnh">
        <UserContainer>
          <Ul>
            {users.map((user: any, index: number) => {
              return <UserListItem key={index} index={index} user={user} />
            })}
          </Ul>
        </UserContainer>
      </RoomCard>
    </Div>
  )
}

export default UserList
