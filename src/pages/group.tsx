import React, { useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { Button, Input } from "@material-ui/core"

//components
import GroupList from "../components/GroupList"
import { PostsList, PostContainer } from "../components/PostsList"
import { RoomCard, RoomContainer } from "../components/Rooms"
import Layout from "../components/Layout"
import Chat from "../components/Chat"
import PostForm from "../components/PostForm"
import axios from "axios"

//hooks
import socketChat from "../components/hooks/socketChat"
import useApplicationData from "../components/hooks/useApplicationData"

toast.configure()

const Main = styled.div`
  display: flex;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  width: 80%;
`

const Section = styled.section`
  display: flex;
  width: 50%;
  flex-direction: column;
`

const HideChat = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1000px) {
    display: none;
  }
`

const GroupPage = () => {
  //redirect if not logged in
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  //websockets connection for chat
  let { users, messages, handleSubmit } = socketChat("group")
  const { state, setGroup, fetchGroups } = useApplicationData()
  const { group, groups, posts } = state
  const [roomID, setRoomID] = useState("")
  const [groupName, setGroupName] = useState("")
  const [counter, setCounter] = useState(15)
  const createRoomAndNotify = (evt: any) => {
    evt.preventDefault()
    const username = JSON.parse(
      localStorage.getItem("session") || "{}"
    ).username.toString()
    // After room is created, clear state and reset to empty string
    evt.target.querySelector("input").value = ""
    setRoomID(evt.target.querySelector("input").value)

    setTimeout(() => {
      navigate("/room", { state: { roomID } })
    }, 2000)
    toast(`${username} will be redirected to ${roomID} shortly`, {
      position: "bottom-right",
      autoClose: 2500,
      closeOnClick: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
  }

  const handlePost = (groupID: number) => {
    setGroup(groupID)
  }

  const handleCreateGroup = (event: any) => {
    event.preventDefault()
    const userId = JSON.parse(localStorage.getItem("session") || "{}").id
    if (groupName.length > 15) {
      toast(`Group name is too long`, {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: false,
        pauseOnHover: false,
        hideProgressBar: true,
      })
    }
    else if (groupName !== "") {
      axios
        .post("http://localhost:3001/group/g/create", {
          userId,
          groupName,
        })
        .then(() => {
          setGroupName("")
          fetchGroups()
        })
        .catch(() => {
          toast(`Group name is already taken`, {
            position: "bottom-right",
            autoClose: 2500,
            closeOnClick: false,
            pauseOnHover: false,
            hideProgressBar: true,
          })
        })
    }
  }

  return (
    <Layout>
      <Main>
        <GroupList groups={groups} group={group} setGroup={setGroup} />
        <Section>
          <RoomContainer>
            <RoomCard
              image="https://sociorocketnewsen.files.wordpress.com/2014/01/anonymous.jpg?w=580&h=350"
              title="Create A Group"
            >
              <Form onSubmit={handleCreateGroup}>
                <Input
                  type="text"
                  placeholder="Group Name"
                  value={groupName}
                  disableUnderline
                  onChange={evt => {
                    setGroupName(evt.target.value)
                    setCounter(15 - evt.target.value.length)
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create
                </Button> 
                <span style={counter < 0 ? {color: 'red'}: {color: 'black'} }>{counter}/15</span>
              </Form>
            </RoomCard>
            <RoomCard
              image="https://economictimes.indiatimes.com/thumb/msid-73420856,width-1200,height-900,resizemode-4,imgsize-272701/getty.jpg?from=mdr"
              title="Create or Join A Room"
            >
              <Form onSubmit={createRoomAndNotify}>
                <Input
                  type="text"
                  placeholder="Room Name"
                  value={roomID}
                  disableUnderline
                  onChange={evt => setRoomID(evt.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create
                </Button>
              </Form>
            </RoomCard>
            <RoomCard
              image="https://www.pandasecurity.com/mediacenter/src/uploads/2016/03/pandasecurity-Who-are-the-most-famous-hackers-in-history.jpg"
              title="Join A Room"
            >
              <Div>
                <Link to="/room/" state={{ roomID: "setRoom1" }}>
                  {" "}
                  Room 1
                </Link>
                <Link to="/room/" state={{ roomID: "setRoom2" }}>
                  {" "}
                  Room 2
                </Link>
                <Link to="/room/" state={{ roomID: "setRoom3" }}>
                  {" "}
                  Room 3
                </Link>
                <Link to="/room/" state={{ roomID: "setRoom4" }}>
                  {" "}
                  Room 4
                </Link>
              </Div>
            </RoomCard>
          </RoomContainer>
          <PostContainer>
            <PostForm group={group} postFunction={handlePost} />
            <PostsList posts={posts} />
          </PostContainer>
        </Section>
        <HideChat>
          <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
        </HideChat>
      </Main>
    </Layout>
  )
}

export default GroupPage
