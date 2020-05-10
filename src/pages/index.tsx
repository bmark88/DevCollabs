import React from "react"
// import { Link } from "gatsby"
import styled from "styled-components"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import LoginForm from "../components/LoginForm"
import Layout from "../components/layout"
import { navigate } from "gatsby"
import Chat from "../components/Chat"
import { Topics, Topic, SubTopic } from "../components/topics"
import Add from "../components/add"
import Navbar from "../components/Navbar"
import App from "../components/hooks/App"
import PostBoard from "../components/PostBoard"

const Main = styled.main`
  margin-top: 80px;
`
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

export default function IndexPage() {
  let { users, messages, handleSubmit } = App()

  if(!localStorage.getItem('session')) {
    navigate('/login')
    return null;
  }

  return (
    <>
      <Navbar />
      <Main>
        <TopicsContainer>
      <PostBoard/>
      </TopicsContainer>
        {/* <Topics>
          <Topic>
            <Add>Add Topic</Add>
            <SubTopic>
              SubTopic - Change my display to none and add JS for accordion to
              unhide and slide down
            </SubTopic>
          </Topic>
          <Topic>
            <Add>Add Topic</Add>
            <SubTopic>
              SubTopic - Change my display to none and add JS for accordion to
              unhide and slide down
            </SubTopic>
            <SubTopic>
              SubTopic - Change my display to none and add JS for accordion to
              unhide and slide down
            </SubTopic>
            <SubTopic>
              SubTopic - Change my display to none and add JS for accordion to
              unhide and slide down
            </SubTopic>
          </Topic>
          <Topic>
            New Topic
            <Add>Add Topic</Add>
          </Topic>
          <Topic>
            New Topic
            <Add>Add Topic</Add>
          </Topic>
          <Topic>
            New Topic
            <Add>Add Topic</Add>
          </Topic>
          <Topic>
            New Topic
            <Add>Add Topic</Add>
          </Topic>
          <Topic>
            New Topic
            <Add>Add Topic</Add>
          </Topic>
          <Topic>
            New Topic
            <Add>Add Topic</Add>
          </Topic>
        </Topics> */}

        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </Main>
    </>
  )

  // <Layout>
  //   {/* <SEO title="Home" /> */}
  //   <h1>Hi people</h1>
  //   <p>Welcome to your new Gatsby site.</p>
  //   <p>Now go build something great.</p>
  //   <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
  //     <Image />
  //   </div>
  //   <Link to="/page-2/">Go to page 2</Link>
  // </Layout>
}
