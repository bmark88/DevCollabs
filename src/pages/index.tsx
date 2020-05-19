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
    align-items: center;
    flex-direction: column;
  }
`;

const TopicsContainer = styled.div`
  width: 30%;
  margin: 1em;
  height: 85%;
  flex: 1;
  min-width: 600px;

  @media (max-width: 1000px) {
    // width: 90%;
    margin: 1.4em;
  }
`;

const UsersContainer = styled.div`
  display: flex;
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
          <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
        </Main>
        <News />
      </Layout>
  );
};
