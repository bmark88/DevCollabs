import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import Chat from "../components/Chat"
import CodeSnippet from "../components/CodeSnippet"
import Layout from "../components/layout"
import socketChat from "../components/hooks/socketChat"
const RoomPage = () => {
  let { users, messages, handleSubmit } = socketChat('Room 1')

  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  return (
    <Layout>
      <CodeSnippet />
      <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
    </Layout>
  )
}

export default RoomPage
