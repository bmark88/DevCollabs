import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, navigate } from "gatsby";
import io from "socket.io-client";
import styled from "styled-components";

//components
import GroupList from "../components/GroupList";
import PostsList from "../components/PostsList";
import { Rooms, Room } from "../components/rooms";
import Layout from "../components/layout";
import Chat from "../components/Chat";

//hooks
import socketChat from "../components/hooks/socketChat";
import useApplicationData from "../components/hooks/useApplicationData";

toast.configure();

const Section = styled.section`
  display: flex;
`;

const GroupPage = () => {
  //redirect if not logged in
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null;
  }

//websockets connection for chat
const { users, messages, handleSubmit } = socketChat();
const { state, setGroup } = useApplicationData();
const { group, groups, posts } = state;
const [roomID, setRoomID] = useState('')

const socket = io.connect('http://localhost:3001')
  const createRoomAndNotify = (evt) => {
    evt.preventDefault()
    const username = JSON.parse(localStorage.getItem("session")).username.toString()
    toast(`${username} has created a new room!`, {
      position: "bottom-right",
      autoClose: 2500,
      closeOnClick: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
  };

  return (
    <Layout>
      <Section>
        <GroupList groups={groups} group={group} setGroup={setGroup} />
        <div>
          <Rooms>
            <Room>
              Room 1
              <form onSubmit={createRoomAndNotify}>
                <input 
                  value={roomID} 
                  onChange={(evt) => setRoomID(evt.target.value)} 
                />
                <button>Create a New Room</button>
              </form>
            </Room>
            <Room>
              Room 2<Link to="/room/"> Room Link </Link>
            </Room>
          </Rooms>
          <PostsList posts={posts}/>
        </div>
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