import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

//components
import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import socketChat from "../components/hooks/socketChat"
import TopicBoard from "../components/TopicBoard"

import { myContext } from '../../DarkTheme'
import { Link } from "gatsby"

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

/*
.colorTheme {
  
  height: 100vh;
  transition: .3s ease-in-out;
}

.darkTheme {

  height: 100vh;
  transition: .3s ease-in-out;
  background-color: #1A202C;
  color: #fff;

}

.lightTheme {

  height: 100vh;
  transition: .3s ease-in-out;
  background-color: #fff;
  color: #000;

}
*/

export default function IndexPage() {
  let { users, messages, handleSubmit } = socketChat("public")
  // const { publicGroups } = usePublic()
  // const publicGroupsArr = publicGroups.groups

  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  return (
    <>
      <Navbar />
      <myContext.Consumer>
      {context => (
        <React.Fragment>
          <h1>{context.isDark ? "Dark Theme" : "Light Theme"}</h1>
          <button onClick={() => context.changeTheme()}>{context.isDark ? "Light" : "Dark"}</button>
          <Link to="/page-2/">Go to page 2</Link>
        </React.Fragment>
      )}
    </myContext.Consumer>
      <Main>
        <TopicsContainer>
          <TopicBoard />
        </TopicsContainer>
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
    </>
  )
}
