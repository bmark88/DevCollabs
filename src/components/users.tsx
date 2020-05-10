import React, { ReactNode } from "react"
import styled from "styled-components"
import Chat from "./Chat"

interface Props {
  children: ReactNode
  users: any,
  messages: any,
  handleSubmit: any
}

const UserList = styled.div`
border-bottom: solid;
background-color: lightgreen;
`;


const Div = styled.div`
border: solid;
height: 800px;
width: 20%;
position: fixed;
margin: 1em;
opacity: 80%;
right: 0;
float: right;
  
@media (max-width: 1000px) {
  display: none;
}
`

const SubmitButton = styled.form`
  bottom: 0;
  margin: 0;
  display: flex;
  height: 50px;
  position: absolute;
  width: 100%;
  `;

const Input = styled.input`
  width: 100%;
  `;

const Button = styled.button`
  `;

const Users = ({ users, messages, handleSubmit }: Props) => {
  return (
    <Div>
      <UserList>
        <h1>Online Members</h1>
        {users.map((user: string) => (
          <h3>{user}</h3>
        ))}
      </UserList>
      {messages.map((msg: any) => (
        <div>
          <b>{msg.user} says: {msg.message}</b>
          <div style={{ float: 'right' }}>{msg.date}</div>
        </div>
      ))}
      <SubmitButton onSubmit={handleSubmit}>
        <Input type="text" name="message" />
        <Button>Send</Button>
      </SubmitButton>

    </Div>
  )
};


export default Users;