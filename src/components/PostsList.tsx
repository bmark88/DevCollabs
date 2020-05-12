import React, { ReactNode } from "react"
import styled from "styled-components"

// import useGroupData from "../components/useGroupData"

interface Props {
  // children: ReactNode
  posts: any
}

const Div = styled.div`
  border: solid;
  height: 800px;
  width: 80%;
  float: left;
  margin: 1em;
  background-color: red;
`

export default function PostsList({ posts }: Props) {
    console.log(posts)
  const PostsList = posts.map(post => {
    return (
      <div key={post.id} id={post.id}>User {post.user_id} posted: "{post.data}"</div>
    )
  })
  return <Div>{PostsList}</Div>
}
