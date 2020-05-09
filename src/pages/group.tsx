import React, { ReactNode } from "react"

import Users from "../components/users"
import Groups from "../components/groups"
import { Rooms, Room } from "../components/rooms"
import Layout from "../components/layout"
import App from "../components/hooks/App"
import Chat from "../components/chat"

interface Props {
  children: ReactNode
  users: any,
  messages: any,
  handleSubmit: any
}


const GroupPage = () => {
  let { users, messages, handleSubmit } = App()

  return (
    <Layout>
      <Users>
      <Chat users={users} messages={messages} handleSubmit={handleSubmit}/>
      </Users>
      <Groups>Groups</Groups>
      <Rooms>
        <Room>Room 1</Room>
        <Room>Room 2</Room>
        <Room>Room 3</Room>
        <Room>Room 4</Room>
        <Room>Room 5</Room>
        <Room>Room 6</Room>
        <Room>Room 7</Room>
      </Rooms>
    </Layout>
  )
};

export default GroupPage;