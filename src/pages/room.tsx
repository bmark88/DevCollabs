import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import Chat from "../components/Chat"
import CodeSnippet from "../components/CodeSnippet"
import Layout from "../components/Layout"
import socketChat from "../components/hooks/socketChat"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
  justify-content: space-between;
`;

const LiveHTML = styled.div`
  min-width: 500px;
  margin: 1em;
  width: 50%;
  height: 84.7vh;
  border: solid 1px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const RoomPage = ({location} :any) => {
  const RoomName = location.state? location.state.roomID : undefined
  const { users, messages, handleSubmit, websocketIDE, conn } = socketChat(RoomName)
  
  const welcomeHTML = `<h1>Welcome Devs!</h1>

    <p>This is your coding sandbox, feel free to
    mess around as much as you want.</p>
    
    There are some fresh memes below to get you started.
    Uncomment them at your own risk
    <!--<img src="https://img.devrant.com/devrant/rant/r_1825530_6oF8Q.jpg">
    -->
    <!--<img src="https://i.imgflip.com/3fqnaz.jpg">
    -->
    <!--<img src="https://i.redd.it/19fq7c002w021.png"
    -->
    <!--<img src="https://i.ytimg.com/vi/hAq443fhyDo/maxresdefault.jpg">
    -->
  `;
  const [snippetValue, setSnippetValue] = useState(welcomeHTML)

  if (typeof window !== 'undefined' && !window.localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  conn.on("IDE", (data :any) => {
    setSnippetValue(data.value)
  })

  useEffect(()=> {
    document.getElementById('live-html').innerHTML = snippetValue
  }, [snippetValue])

  return (
    <Layout>
      <Main>
          <CodeSnippet function={websocketIDE} snippetValue={snippetValue} />
          <LiveHTML id="live-html" />
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
    </Layout>
  )
}

export default RoomPage
