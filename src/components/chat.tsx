import React, { ReactNode } from "react"
import styled from "styled-components"
import App from "./hooks/App"

interface Props {
  children: ReactNode
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


  @media (max-width: 1000px) {
    display: none;
  }
`
const UserList = styled.li`

`

const SubmitButton = styled.li`
bottom: 0px;
position: sticky;
`

const Chat = ({ users, messages, handleSubmit }: Props) => {
  // const { users, messages, handleSubmit } = props
  console.log(users)
  return (
    <Div>
      <div>
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
            <SubmitButton>
        <form onSubmit={handleSubmit}>
          <input type="text" name="message" />
          <button>Submit</button>
        </form>
        </SubmitButton>
      </div>
    </Div>
  )
}

export default Chat
