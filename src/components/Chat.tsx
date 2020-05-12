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
border-color: black;
color: white;
height: 800px;
min-width: 400px;
position: relative;
margin: 1em;
opacity: 80%;
// width: 20%;
// position: fixed;
// right: 0;
// float: right;
  
@media (max-width: 1000px) {
  display: none;
}
`
const UserList = styled.div`
  border-bottom: solid;
  background-color: #551A8B;
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
        {users.map((user :string, index :number) => (
          <h3 key={index}>{user}</h3>
        ))}
      </UserList>
      {messages.map((msg: any) => (
        <div>
          <b>
            {msg.user} says: {msg.message}
          </b>
          <div>{msg.date}</div>
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