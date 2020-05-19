import React from "react"
import styled from "styled-components"
import { RoomCard } from "../components/rooms"
import UserListItem from './userListItem'

interface Props {
  users: any
};

const UserContainer = styled.div`
  width: 100%;
  
  @media (max-width:1200px) {
    position: relative;
  }
`;

const Ul = styled.ul`
  margin-left: 0;
  list-style: none;
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
`;

const UserList = ({ users }: Props) => {
  return (
    <RoomCard title="Users List" image="https://bit.ly/3bDrCnh">
      <UserContainer className="dark">
        <Ul>
          {users.map((user: any, index: number) => {
            return <UserListItem key={index} index= {index} user={user} />
          })}
        </Ul>
      </UserContainer>
    </RoomCard>
  );
};

export default UserList;
