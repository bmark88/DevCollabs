import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import Chat from "../components/Chat"
import CodeSnippet from "../components/CodeSnippet"
import Layout from "../components/layout"
import socketChat from "../components/hooks/socketChat"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
`;

const LiveHTML = styled.div`
  width: 50%;
  height: 84.7vh;
`;

const RoomPage = () => {

  let { users, messages, handleSubmit, websocketIDE, conn } = socketChat('Room 1')
  const [snippetValue, setSnippetValue] = useState('')
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  conn.on("IDE", data =>{
    setSnippetValue(data.value)
  })
  
  useEffect(()=> {
    document.getElementById('live-html').innerHTML = snippetValue
    console.log('from use', snippetValue)
  }, [snippetValue])

  return (
    <Layout>
      <Main>
        <CodeSnippet function={websocketIDE} snippetValue={snippetValue} />
        <LiveHTML id="live-html">Hello World</LiveHTML>
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
    </Layout>
  )
}

export default RoomPage
