import React from "react"
// import { Link } from "gatsby"
import styled from "styled-components"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import Chat from "../components/chat"
import { Topics, Topic, SubTopic } from "../components/topics"
import Add from "../components/add"
import Navbar from "../components/Navbar"
import App from "../components/hooks/App"

const Main = styled.main`
  margin-top: 80px;
`

export default function IndexPage() {
  
  let { users, messages, handleSubmit } = App()

  return(
  <>
    <Navbar />
    <Main>
      <Topics>
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
      </Topics>

      <Chat users={users} messages={messages} handleSubmit={handleSubmit}/>

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