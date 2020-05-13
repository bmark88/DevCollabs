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

import { Topics, Topic, SubTopic } from "../components/topics"
import Add from "../components/add"

import socketChat from "../components/hooks/socketChat"
import useApplicationData from "../components/hooks/useApplicationData"
import {Group} from "../components/hooks/useApplicationData"

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
/*
class Map<T> {
  private items: { [key: string]: T };

  public constructor() {
    this.items = Object.create(null);
  }

  public set(key: string, value: T): void {
    this.items[key] = value;
  }

  public get(key: string): T {
    return this.items[key];
  }

  public remove(key: string): T {
    let value = this.get(key);
    delete this.items[key];
    return value;
  }
}
*/

// interface Props {
//   children: ReactNode
// }

toast.configure()

const GroupPage = () => {

  //websockets connection for chat
  let { users, messages, handleSubmit } = socketChat()

  //state groups:array[], group:object {id:integer, name:string}
  const { state, setGroup } = useApplicationData()
  const { group, groups, posts } = state
  console.log(state)
  
  // function getGroupId(id: Map<number>): number {
  //   return id.get('group')
  // }
  // console.log(getGroupId(1))
  console.log(state)
  console.log(posts[0])

  //redirect if not logged in
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  const notifyRoomCreated = () => {
    const user = JSON.parse(localStorage.getItem("session") || '{}').username.toString()
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
      <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      <Rooms>
        <Room>
          Room 1<button onClick={notifyRoomCreated}>Create a New Room</button>
        </Room>
        <Room>
          Room 2<Link to="/room/"> Room Link </Link>
        </Room>
        <PostsList posts={posts} />
      </Rooms>
    </Layout>
  )
}

export default GroupPage
