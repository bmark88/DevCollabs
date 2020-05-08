import React, { ReactNode } from "react"
import styled from "styled-components"
// import App from "./hooks/App"

interface Props {
  children: ReactNode,
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
  width: 90%;
`;

const Button = styled.button`
`;

const Chat = ({ users, messages, handleSubmit }: Props) => {
  // const { users, messages, handleSubmit } = props
  return (
    <Div>
      <UserList>
          {users.map((user: string) => (
            <li>{user}</li>
          ))}
        </UserList>
        
            {messages.map((msg: any) => (
              <li>
                <b>{msg.user}:</b>
                {msg.message}
              </li>
            ))}
          <SubmitButton onSubmit={handleSubmit}>
              <Input type="text" name="message" />
              <Button>Send</Button>
          </SubmitButton>
        
    </Div>
  )
}

export default Chat