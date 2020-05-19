import React from "react"
import styled from "styled-components"
import Post from "../components/Post"

interface Props {
  posts: object[]
}

const PostContainer = styled.div`
  @media (max-width: 1880px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const PostsList = ({ posts }: Props) :any=> {
  if (!posts) {return null} 
  const PostsList = posts.map((post :any) => {
    return (
      <Post 
        key={post.id} 
        id={post.id} 
        user={post.username} 
        created_at={post.created_at}
        image_url={post.image_url}
      >
        {post.data}
      </Post>
    )
  })
  return PostsList;
}

export { PostsList, PostContainer }