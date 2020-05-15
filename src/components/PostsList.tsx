import React from "react"
import styled from "styled-components"
import Post from "../components/Post"

interface Props {
  posts: object[]
}

const PostContainer = styled.div`
  disply: flex;
  flex-direction: row;
`;

const PostsList = ({ posts }: Props) => {
  const PostsList = posts.map((post :any) => {
    return (
      <Post key={post.id} id={post.id} user={post.username} created_at={post.created_at} >{post.data}</Post>
    )
  })
  return PostsList
}

export { PostsList, PostContainer }