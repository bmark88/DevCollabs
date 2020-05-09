import React from "react"

import App from "../components/hooks/App"
import Chat from "../components/chat"
import CodeSnippet from "../components/CodeSnippet"
import Layout from "../components/layout"

const RoomPage = () => {
  let { users, messages, handleSubmit } = App()

  return (
    <Layout>
        <CodeSnippet/>
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
    </Layout>
  )
}

export default RoomPage
