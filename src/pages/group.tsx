import React, { ReactNode } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Users from "../components/users"
import Groups from "../components/groups"
import { Link, navigate } from "gatsby"
import { Rooms, Room } from "../components/rooms"
import Layout from "../components/layout"

interface Props {
  children: ReactNode
}

toast.configure()

const GroupPage = () => {

  const notifyRoomCreated = () => {
    const user = JSON.parse(localStorage.getItem('session')).username.toString()
    toast(`${user} has created a new room!`, { 
      position: 'bottom-right',
      autoClose: 2500,
      closeOnClick: false,
      pauseOnHover: false,
      hideProgressBar: true
    })
  }

  if(!localStorage.getItem('session')) {
    navigate('/login')
    return null;
  }

  return (
    <Layout>
      <Link to="/room/"> Room Link </Link>
      <Users>Users</Users>
      <Groups>Groups</Groups>
      <Rooms>
        <Room>
          Room 1
          <button onClick={notifyRoomCreated}>Create a New Room</button>
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
