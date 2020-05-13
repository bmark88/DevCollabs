import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

//components
import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import socketChat from "../components/hooks/socketChat"
import PostBoard from "../components/PostBoard"

const Main = styled.main`
  margin-top: 80px;
  display: flex;
  background-color:
`;

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
`;

export default function IndexPage() {
  let { users, messages, handleSubmit } = socketChat('public')

  if(!localStorage.getItem('session')) {
    navigate('/login')
    return null;
  }

  return (
    <>
      <Navbar />
      <Main>
        <TopicsContainer>
          <PostBoard/>
        </TopicsContainer>
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
    </>
  )
};