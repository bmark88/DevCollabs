import React from "react"
import styled from "styled-components"
import { withStyles } from "@material-ui/core/styles"
import { MessageContainer, TimeStamp } from "./Message"
import { Button, TextField } from "@material-ui/core"

interface Props {
  users: any
  messages: any
  handleSubmit: any
}

const Div = styled.div`
  border: solid;
  border-radius: 6px;
  border-color: #f0f0f0;
  border-width: 2px;
  min-width: 400px;
  position: relative;
  margin: 1em;
  opacity: 80%;

  @media (max-width: 1000px) {
    display: none;
  }
`
const UserList = styled.div`
  border-bottom: solid 0.5px;
`

const Li = styled.li`
  list-style: none;
  margin: 0;
`

const SubmitButton = styled.form`
  bottom: 0;
  margin: 0;
  display: flex;
  height: 50px;
  position: absolute;
  width: 100%;
`

const MessageTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        height: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#551A8B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#551A8B",
      },
    },
  },
})(TextField)

const Chat = ({ users, messages, handleSubmit }: Props) => {
  return (
    <Div>
      <UserList>
        <h4>Online Members</h4>
        {users.map((user: string, index: number) => (
          <Li key={index}>{user}</Li>
        ))}
      </UserList>
      <MessageContainer>
        {messages.map((msg: any, index: number) => (
          <span key={index}>
            <b>{msg.user}: </b>
            {msg.message}
            <TimeStamp>{msg.date}</TimeStamp>
          </span>
        ))}
      </MessageContainer>
      <SubmitButton onSubmit={handleSubmit}>
        <MessageTextField
          type="text"
          name="message"
          variant="outlined"
          placeholder="Send a Message"
          fullWidth
          autoComplete="off"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </SubmitButton>
    </Div>
  )
}

export default Chat
