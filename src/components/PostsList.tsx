import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  posts: any
}

const Div = styled.div`
  border: solid;
  margin: 1em 0;
`;

const PostContainer = styled.div`
  disply: flex;
  flex-direction: row;
`;

const PostsList = ({ posts }: Props) => {
  const PostsList = posts.map(post => {
    return (
      <Div key={post.id} id={post.id}>{post.username} posted: "{post.data}"</Div>
    )
  })
  return PostsList
}

export { PostsList, PostContainer } 