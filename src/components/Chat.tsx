import React, { ReactNode } from "react"
import styled from "styled-components"
// import App from "./hooks/App"

interface Props {
  users: any,
  messages: any,
  handleSubmit: any
}

const Div = styled.div`
  border: solid;
  height: 85%;
  position: fixed;
  right: 0;
  margin: 2em;
  width: 40%;
  opacity: 80%;
  float: right;

  @media (max-width: 1000px) {
    display: none;
  }
`
const UserList = styled.div`
  border-bottom: solid;
  background-color: lightgreen;
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

const Chat = ({ users, messages, handleSubmit }: Props) => {

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
                <div style={{float: 'right'}}>{msg.date}</div>
              </div>
            ))}
          <SubmitButton onSubmit={handleSubmit}>
              <Input type="text" name="message" />
              <Button>Send</Button>
          </SubmitButton>
        
    </Div>
  )
}

export default Chat