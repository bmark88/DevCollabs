import React from "react";
import styled from "styled-components";
import {Card, Typography} from '@material-ui/core'
import { RoomCard} from '../components/rooms'


interface Props {
  users :any
}

const UserContainer = styled.div`
  width: 100%;
`;

const Ul = styled.ul`
  list-style: none;
  height: 400px;
  overflow: hidden; 
  overflow-y: scroll;
  
`;

const Li = styled.li`
  display: inline
`;

const Button =styled.button`
  position: absolute;
  right: 0px
`

const Div = styled.div`
  position: relative;
  margin: 2px;
`


const UserList = ({ users } :Props) => {
  // console.log(users.map(user => user))
  return (
    <RoomCard title= "Users List" image="https://bit.ly/3bDrCnh">
      <UserContainer >
      <Ul>
        {users.map((user :any, index :number) => {
          return (
            <Div key={index} >
              <Li>{user.username}</Li>
              <Button>Add rating</Button>
              {/* <div>{user.email}</div> */}
            </Div>
          )
        })}
      </Ul>
      </UserContainer>
    </RoomCard>
    )
}

export default UserList;