import React, { ReactNode } from "react"

import Users from "../components/users"
import Groups from "../components/groups"
import { Rooms, Room } from "../components/rooms"
import Layout from "../components/layout"
import axios from "axios"

interface Props {
  children: ReactNode
}

let data = JSON.parse(localStorage.getItem("session"))

axios({
  method: "delete",
  url: "http://localhost:8000/delete/1",
  data: data.id 
}) //TODO change from hard coded
console.log("data", data)
const deletePage = () => {
  return (
    <Layout>
      <Users>Users</Users>
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
}

export default deletePage