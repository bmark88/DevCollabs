import React, { useEffect } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

//hooks
import socketChat from "../components/hooks/socketChat";
import usePublic from "../components/hooks/usePublic";
import useApplicationData from "../components/hooks/useApplicationData";

//components
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import TopicBoard from "../components/TopicBoard";
import News from "../components/News";
import Layout from "../components/Layout";
import UserCard from "../components/UserCard";
import UserList from "../components/UserList";

const Main = styled.main`
  margin-top: 80px;
  display: flex;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const TopicsContainer = styled.div`
  margin: 1em;
  height: 85%;
  flex: 1;
  min-width: 450px;

  @media (max-width: 1000px) {
    margin: 1.4em;
  }
`;

const ResponsiveChat = styled.div`
  display: flex;

  @media (max-width: 1200px) {
      position: absolute;
      right: 2em;
    }
`;

const UsersContainer = styled.div`
  display: flex;
  margin: 1em 0;
  max-height: 650px;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

export default function IndexPage() {
  const { users, messages, handleSubmit } = socketChat("public");
  const { usersList } = usePublic();
  
  const { 
    subscriptions, 
    fetchUserSubscriptions 
  } = useApplicationData();
  
  if (!localStorage.getItem("session")) {
    navigate("/login")
    return null
  }

  const userID = JSON.parse(localStorage.getItem('session') || '{}').id;

  useEffect(() => {
    fetchUserSubscriptions(userID)
  }, []);
  

  return (
      <Layout>
        <Navbar />
        <Main>
          <UsersContainer>
            <UserCard />
            <UserList users={usersList} />
          </UsersContainer>
          <TopicsContainer className="dark">
            <TopicBoard subscriptions={subscriptions}/>
          </TopicsContainer>
          <ResponsiveChat>
            <Chat 
              users={users} 
              messages={messages} 
              handleSubmit={handleSubmit} 
            />
          </ResponsiveChat>
        </Main>
        <News />
      </Layout>
            //   <footer>
            //   {new Date().getFullYear()}  
            //   {` `}
            //   <a href="https://github.com/bmark88/lhl-final/">DevCollab Open Source </a>   
            //    | Bradley Mark, Elizabeth Brown, Tomas Wen - Made with Love 🖤 
            // </footer>
  );
};
