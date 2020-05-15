import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { Button, Input } from "@material-ui/core";

//components
import GroupList from "../components/GroupList";
import PostsList from "../components/PostsList";
import { RoomCard, RoomContainer } from "../components/rooms";
import Layout from "../components/layout";
import Chat from "../components/Chat";
import PostForm from '../components/PostForm';


//hooks
import socketChat from "../components/hooks/socketChat";
import useApplicationData from "../components/hooks/useApplicationData";

toast.configure();

const Section = styled.section`
  display: flex;
`;


const Div = styled.div`
  display: flex;  
  flex-direction: column;
`;

const Form = styled.form`
  width: 64%;
`;

const GroupPage = () => {
  //redirect if not logged in
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null;
  }

//websockets connection for chat
let { users, messages, handleSubmit } = socketChat('group')
const { state, setGroup } = useApplicationData();
const { group, groups, posts } = state;
const [roomID, setRoomID] = useState("")

const createRoomAndNotify = (evt :any) => {
  evt.preventDefault()
  const username = JSON.parse(localStorage.getItem("session") || '{}').username.toString();
  // After room is created, clear state and reset to empty string
  evt.target.querySelector('input').value = "";
  setRoomID(evt.target.querySelector('input').value);
  
  toast(`${username} has created a new room!`, {
    position: "bottom-right",
    autoClose: 2500,
    closeOnClick: false,
    pauseOnHover: false,
    hideProgressBar: true,
  })
};

  const handlePost = (groupID) => {
    setGroup(groupID)
  }

  return (
    <Layout>
      <Section>
        <GroupList groups={groups} group={group} setGroup={setGroup} />
        <RoomContainer>
          <RoomCard 
            image="https://economictimes.indiatimes.com/thumb/msid-73420856,width-1200,height-900,resizemode-4,imgsize-272701/getty.jpg?from=mdr" 
            title="Create A Room"
          >
            <Form onSubmit={createRoomAndNotify}>
              <Input 
                type="text"
                placeholder="Enter Room Name"
                value={roomID} 
                disableUnderline
                onChange={(evt) => setRoomID(evt.target.value)}
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
              <Link to="/room/"> Room 1</Link>
              <Link to="/room/"> Room 2</Link>
              <Link to="/room/"> Room 3</Link>
            </Div>
          </RoomCard>
          <PostsList posts={posts}/>
          <PostForm group={group} postFunction = {handlePost}/>
        </RoomContainer>
        <Chat 
          users={users} 
          messages={messages} 
          handleSubmit={handleSubmit} 
        />
      </Section>
    </Layout>
  )
};

export default GroupPage;