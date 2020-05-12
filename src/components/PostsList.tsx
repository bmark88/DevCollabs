import React, { ReactNode } from "react"
import styled from "styled-components"

// import useGroupData from "../components/useGroupData"

interface Props {
  // children: ReactNode
  posts: any
}

const Div = styled.div`
  border: solid;
  // height: 800px;
  // width: 80%;
  // float: left;
  // margin: 1em;
  // background-color: red;
`

export default function PostsList({ posts }: Props) {
  const PostsList = posts.map(post => {
    return (
      <Div key={post.id} id={post.id}>{post.username} posted: "{post.data}"</Div>
    )
  })
  return PostsList
}
