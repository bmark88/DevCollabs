import React, { ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"

import Users from "../components/users"
import GroupList from "../components/GroupList"
import { Link, navigate, StaticQuery } from "gatsby"
import { Rooms, Room } from "../components/rooms"
import Layout from "../components/layout"
import App from "../components/hooks/socketChat"
import useApplicationData from "../components/hooks/useApplicationData"
/* sudo code -liz
[]chat using websockets works
[]render groups on group page
[]render posts on group page
*/
interface Props {
  children: ReactNode
  users: any
  messages: any
  handleSubmit: any
}

toast.configure()


const GroupPage = (Props) => {
  let { users, messages, handleSubmit } = App()
  // const {  fetchGroups } = useApplicationData();
  // console.log(fetchGroups)
  const { state } = useApplicationData();
  const { groups } = state

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
      <GroupList groups={groups}/>
      <Users users={users} messages={messages} handleSubmit={handleSubmit} />

      <Link to="/room/"> Room Link </Link>
      <Rooms>
        <Room>
          Room 1<button onClick={notifyRoomCreated}>Create a New Room</button>
        </Room>
        <Room>Room 2</Room>
        <Room>Room 3</Room>
        <Room>Room 4</Room>
        <Room>Room 5</Room>
        <Room>Room 6</Room>
        <Room>Room 7</Room>
      </Rooms>
    </Layout>
  )
}

export default GroupPage
