import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { navigate } from "gatsby"

//components
import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import socketChat from "../components/hooks/socketChat"
import TopicBoard from "../components/TopicBoard"
import News from "../components/News"
import useApplicationData from "../components/hooks/useApplicationData";

const Main = styled.main`
  margin-top: 80px;
  display: flex;
  background-color: ;
`

const TopicsContainer = styled.div`
  background-color: black;
  color: white;
  width: 50%;
  margin: 1em;
  height: 85%;

  @media (max-width: 1000px) {
    width: 90%;
    margin: 1.4em;
  }
`

export default function IndexPage() {

  let { users, messages, handleSubmit } = socketChat("public")
  // const { subscriptions } = useApplicationData()
  const { 
    subscriptions, 
    fetchUserSubscriptions 
  } = useApplicationData();
  
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  } 

  const userID = JSON.parse(localStorage.getItem('session') || '{}').id

  useEffect(() => {
    fetchUserSubscriptions(userID)
  }, [])
  

  return (
    <>
      <Navbar />
      <Main>
        <div>
          Placeholder for user profile card
        </div>
        <TopicsContainer>
          <TopicBoard subscriptions={subscriptions}/>
        </TopicsContainer>
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
      <News />
    </>
  )
}
