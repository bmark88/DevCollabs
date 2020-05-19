import React from "react"
import styled from "styled-components"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import { MessageContainer, TimeStamp } from "./Message"
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core"
import SendOutlinedIcon from "@material-ui/icons/SendOutlined"

interface Props {
  users: any
  messages: any
  handleSubmit: any
}

const Div = styled.div`
  border: solid;
  border-radius: 10px;
  border-color: #f0f0f0;
  border-width: 2px;
  min-width: 400px;
  max-width: 600px;
  position: relative;
  margin: 1em;
  opacity: 80%;
  max-height: 700px;
  @media (max-width: 1000px) {
    display: none;
  }
`
const UserList = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px 10px 0px 0px;
  border: solid 2px #f0f0f0;
  background-color: #510eb9;
  color: white;
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

const useStyles = makeStyles({
  root: {
    marginBottom: "6px",
  },
})

const ChatMessage = styled.div`
  background-color: aliceblue;
  width: 96%;
  border-radius: 10px;
  border: solid 1px #ccdae6;
  margin-bottom: 12px;
`

const Message = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 15px 5px 15px;
`
const H4 = styled.h4`
  margin-top: 15px;
  margin-bottom: 15px;
`
const User = styled.div`
  margin-right: 20px;
  margin-bottom: 20px
`

const UserMessage = styled.div`
  word-break: break-all;
`
const Chat = ({ users, messages, handleSubmit }: Props) => {
  const classes = useStyles()
  return (
    <Div>
      <UserList>
        <H4>ONLINE CHAT</H4>
        {/* {users.map((user: string, index: number) => (
          <Li key={index}>{user}</Li>
        ))} */}
      </UserList>
      <MessageContainer>
        {messages.map((msg: any, index: number) => (
          <>
            <TimeStamp style={{ marginLeft: "10px" }}>{msg.date}</TimeStamp>
            <ChatMessage key={index}>
              <Message>
                <User>
                  <b>{msg.user}</b>
                </User>
                <UserMessage>{msg.message}</UserMessage>
              </Message>
            </ChatMessage>
          </>
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Send"
                  type="submit"
                  className={classes.root}
                >
                  <SendOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </SubmitButton>
    </Div>
  )
}

export default Chat
