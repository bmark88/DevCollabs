import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import io from "socket.io-client"
import Chat from "../components/Chat"
import CodeSnippet from "../components/CodeSnippet"
import Layout from "../components/layout"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
`;

const RoomPage = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [connection, setConnection] = useState({})

  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem("session"))
    const roomId = "Room1"
    //server connection
    const conn = io.connect("http://localhost:3001/room")

    setConnection(conn)
    //once connection is set send server your username and roomId
    conn.emit("initial", {
      username,
      roomId,
    })
  }, [])

  const handleSubmit = () => {}

  return (
    <Layout>
      <Main>
        <CodeSnippet />
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
    </Layout>
  )
}

export default RoomPage
