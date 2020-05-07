import React, { ReactNode } from "react"
import styled from "styled-components"
import App from "./hooks/App"

interface Props {
  children: ReactNode,
  users: any,
  messages: any,
  handleSubmit: any
}

const Div = styled.div`
  border: solid;
  height: 80%;
  position: fixed;
  right: 0;
  margin: 2em;
  width: 40%;
  opacity: 80%;
  float: right;
  background-color: green;

  @media (max-width: 1000px) {
    display: none;
  }
`
const UserList = styled.div`

`

const SubmitButton = styled.form`
  bottom: 0;
  position: fixed;
  background-color: red;
`;

const Chat = ({ users, messages, handleSubmit }: Props) => {
  // const { users, messages, handleSubmit } = props
  return (
    <Div>
      <UserList>
          {users.map(user => (
            <li>{user}</li>
          ))}
        </UserList>
          {messages.map(msg => (
            <li>
              <b>{msg.user}:</b>
              {msg.message}
            </li>
          ))}
        <SubmitButton onSubmit={handleSubmit}>
            <input type="text" name="message" />
            <button>Submit</button>
        </SubmitButton>
    </Div>
  )
}

export default Chat
