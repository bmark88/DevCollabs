import React from "react"
// import { Link } from "gatsby"
import styled from "styled-components"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import Chat from "../components/chat"
import { Topics, Topic, SubTopic } from "../components/topics"
import Add from "../components/add"
import Send from "../components/send"
import Message from "../components/message"
import Navbar from "../components/Navbar"
import App from "../components/client"

const Main = styled.main`
  margin-top: 80px;
`;

const IndexPage = () => (
  <>
  <Navbar/> 
  <Main>
    <Topics>
      <Topic>
          <Add>Add Topic</Add>
          <SubTopic>SubTopic - Change my display to none and add JS for accordion to unhide and slide down</SubTopic>
      </Topic>
      <Topic>
        <Add>Add Topic</Add>
        <SubTopic>SubTopic - Change my display to none and add JS for accordion to unhide and slide down</SubTopic>
        <SubTopic>SubTopic - Change my display to none and add JS for accordion to unhide and slide down</SubTopic>
        <SubTopic>SubTopic - Change my display to none and add JS for accordion to unhide and slide down</SubTopic>
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
    </Topics>
    <App/>
    <Chat>
      <Message>User 1: Hello</Message>
      <Message>User 2: What's up?</Message>
      <Message>User 3: Goodbye</Message>
      <Message>User 4: Ipsum</Message>
      <Send>Send a Message</Send>
    </Chat>
  </Main>
    </>
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
)

export default IndexPage