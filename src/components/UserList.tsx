import React, { useState } from "react"
import styled from "styled-components"
import { Card, Typography } from "@material-ui/core"
import { RoomCard } from "../components/rooms"
import Rating from "@material-ui/lab/Rating"
import { makeStyles } from '@material-ui/core/styles';
import UserListItem from './userListItem'

const useStyles = makeStyles({
  rate: {
    position: 'absolute',
    right: '0px'
  },
});

interface Props {
  users: any
}

const UserContainer = styled.div`
  width: 100%;
`

const Ul = styled.ul`
  margin-left: 0;
  list-style: none;
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
`



const UserList = ({ users }: Props) => {
  const [value, setValue] = useState(0)
  const classes = useStyles();

  return (
    <RoomCard title="Users List" image="https://bit.ly/3bDrCnh">
      <UserContainer>
        <Ul>
          {users.map((user: any, index: number) => {
            return (
              <UserListItem index= {index} user={user} />
              // <Div key={index}>
              //   <form onSubmit={handleOnSubmit}>
              //     <Li>{user.username}</Li>
              //     <Rating
              //       className= {classes.rate}
              //       name="simple-controlled"
              //       value={0}
              //       onChange={(event, newValue) => {
              //       event.target.value = newValue
              //       console.log(user)
              //       console.log(newValue)
              //     }}
              //     />
              //   </form>
              // </Div>
            )
          })}
        </Ul>
      </UserContainer>
    </RoomCard>
  )
}

export default UserList
