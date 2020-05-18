import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components"
import { navigate } from "gatsby"

//hooks
import socketChat from "../components/hooks/socketChat"
import usePublic from "../components/hooks/usePublic"

//components
import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import TopicBoard from "../components/TopicBoard"
import News from "../components/News"
import UserProfile from "../components/UserProfile";
import DarkMode from "../components/DarkMode";
import useApplicationData from "../components/hooks/useApplicationData";

import UserCard from "../components/UserCard"
import UserList from "../components/UserList"
import { CollectionsTwoTone } from "@material-ui/icons";

const Main = styled.main`
  margin-top: 80px;
  display: flex;
  background-color: ;
`

const TopicsContainer = styled.div`
  background-color: black;
  color: white;
  width: 43%;
  margin: 1em;
  height: 85%;

  @media (max-width: 1000px) {
    width: 90%;
    margin: 1.4em;
  }
`

export default function IndexPage() {
  const { users, messages, handleSubmit } = socketChat("public")
  const { usersList } = usePublic();
  
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
    <ThemeProvider theme={{ mode: 'dark'}}>
      <>
      <DarkMode />
        <Navbar />
        <Main>
          <UserCard/>
          <UserList users={usersList} />
          <TopicsContainer>
            <TopicBoard subscriptions={subscriptions}/>
          </TopicsContainer>
          <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
        </Main>
        <News />
      </>
    </ThemeProvider>
  )
}
