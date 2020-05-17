import React, {useEffect} from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

//components
import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import socketChat from "../components/hooks/socketChat"
import TopicBoard from "../components/TopicBoard"
import News from "../components/News"
import UserProfile from "../components/UserProfile";
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
  const { 
    postCount,
    subscriptions, 
    fetchUserPosts, 
    fetchUserSubscriptions 
  } = useApplicationData();

  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  const userID = JSON.parse(localStorage.getItem('session') || '{}').id
  const userName = JSON.parse(localStorage.getItem('session') || '{}').username

  useEffect(() => {
    fetchUserPosts(userID)
    fetchUserSubscriptions(userID)
  }, [])

  return (
    <>
      <Navbar />
      <Main>
        <div>
          <UserProfile postCount={postCount} subscriptions={subscriptions} />
        </div>
        <TopicsContainer>
          <TopicBoard />
        </TopicsContainer>
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
      <News />
    </>
  )
}
