import React, { ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styled from "styled-components"

import Users from "../components/users"
import GroupList from "../components/GroupList"
import PostsList from "../components/PostsList"

import { Link, navigate, StaticQuery } from "gatsby"
import { Rooms, Room } from "../components/rooms"
import Layout from "../components/layout"
import Chat from "../components/Chat"
import PostBoard from "../components/PostBoard"
import PostForm from "../components/PostForm"
// import useGroupData from "../components/useGroupData"

import { Topics, Topic, SubTopic } from "../components/topics"
import Add from "../components/add"


import socketChat from "../components/hooks/socketChat"
import useApplicationData from "../components/hooks/useApplicationData"
/* sudo code -liz
[] use typescript
[x]chat using websockets works
[x]render groups on group page
[]render posts on group page
*/

const TopicsContainer = styled.div`
  background-color: black;
  color: white;
  width: 50%;
  margin: 2em;
  position: absolute;
  height: 85%;
  float: left;

  @media (max-width: 1000px) {
    width: 90%;
    margin: 1.4em;
  }
`;
interface Props {
  children: ReactNode
  users: any
  messages: any
  handleSubmit: any
}

toast.configure()

const GroupPage = Props => {

  //websockets connection for chat
  let { users, messages, handleSubmit } = socketChat()
  
  //state groups:array[], group:object {id:integer, name:string}
  const { state, setGroup } = useApplicationData()
  const { group, groups, posts } = state
   console.log(state)
   console.log(posts)

  //redirect if not logged in
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  const notifyRoomCreated = () => {
    const user = JSON.parse(localStorage.getItem("session")).username.toString()
    toast(`${user} has created a new room!`, {
      position: "bottom-right",
      autoClose: 2500,
      closeOnClick: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
  }

  return (
    <Layout>
      <GroupList groups={groups} group={group} setGroup={setGroup} />
      <Users users={users} messages={messages} handleSubmit={handleSubmit} />
      <Rooms>
        <Room>
          Room 1<button onClick={notifyRoomCreated}>Create a New Room</button>
        </Room>
        <Room>
          Room 2<Link to="/room/"> Room Link </Link>
        </Room>
      </Rooms>
      <PostsList posts={posts}/>
    </Layout>
  )
}

export default GroupPage
