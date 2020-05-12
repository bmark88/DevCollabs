import React, { ReactNode } from "react"
import styled from "styled-components"
import { Message, MessageContainer, TimeStamp } from "../components/message"
// import App from "./hooks/App"
import { Button } from "@material-ui/core"

interface Props {
  users: any,
  messages: any,
  handleSubmit: any
}

const Div = styled.div`
border: solid;
border-color: #f0f0f0;
border-width: 2px;
min-width: 400px;
position: relative;
margin: 1em;
opacity: 80%;
// color: white;
// height: 800px;
// width: 20%;
// position: fixed;
// right: 0;
// float: right;
  
@media (max-width: 1000px) {
  display: none;
}
`
const UserList = styled.div`
  // color: white;
  border-bottom: solid 0.5px;
  // background-color: #551A8B;
`;

const Li = styled.li`
  list-style: none;
  margin: 0;
`;

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

// const Button = styled.button`
// `;

const Chat = ({ users, messages, handleSubmit }: Props) => {
  return (
    <Div>
      <UserList>
        <h1>Online Members</h1>
        {users.map((user :string, index :number) => (
          <Li key={index}>{user}</Li>
        ))}
      </UserList>
      <MessageContainer>
        {messages.map((msg: any) => (
          <>
            <b>{msg.user}: </b>{msg.message}
            <TimeStamp>{msg.date}</TimeStamp>
          </>
        ))}
      </MessageContainer>
      <SubmitButton onSubmit={handleSubmit}>
        <Input type="text" name="message" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </SubmitButton>

    </Div>
  )
}

export default Chat