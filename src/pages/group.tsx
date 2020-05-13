import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, navigate } from "gatsby";
import styled from "styled-components";

//components
import GroupList from "../components/GroupList";
import PostsList from "../components/PostsList";
// import { Rooms, Room } from "../components/rooms";
import RoomCard from "../components/rooms";
import Layout from "../components/layout";
import Chat from "../components/Chat";

//hooks
import socketChat from "../components/hooks/socketChat";
import useApplicationData, {Group} from "../components/hooks/useApplicationData";

toast.configure();

const Section = styled.section`
  display: flex;
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
const [roomID, setRoomID] = useState('')

const createRoomAndNotify = (evt :any) => {
  evt.preventDefault()
  const username = JSON.parse(localStorage.getItem("session") || '{}').username.toString();
  
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
          <RoomCard 
            image="https://economictimes.indiatimes.com/thumb/msid-73420856,width-1200,height-900,resizemode-4,imgsize-272701/getty.jpg?from=mdr" 
            title="Create A Room"
          >
            <form onSubmit={createRoomAndNotify}>
              <input 
                value={roomID} 
                onChange={(evt) => setRoomID(evt.target.value)} 
              />
              <button>Create a New Room</button>
            </form>
          </RoomCard>
          <RoomCard 
            image="https://www.pandasecurity.com/mediacenter/src/uploads/2016/03/pandasecurity-Who-are-the-most-famous-hackers-in-history.jpg" 
            title="Join A Room"
          >
            <Link to="/room/"> Enter Room </Link>
          </RoomCard>
          {/* <Rooms>
            <Room>
              <form onSubmit={createRoomAndNotify}>
                <input 
                  value={roomID} 
                  onChange={(evt) => setRoomID(evt.target.value)} 
                />
                <button>Create a New Room</button>
              </form>
            </Room>
            <Room>
              <Link to="/room/"> Enter Room </Link>
            </Room>
          </Rooms> */}
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