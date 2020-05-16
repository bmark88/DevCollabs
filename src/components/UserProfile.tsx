import React from "react"
import styled from "styled-components"

interface Props {
  postCount :number
  children: any
}

const Div = styled.div`
  font-size: 50px;
`;

const UserProfile = ({ postCount, children } :Props) => {
  return (
    <>
    <Div>{children}</Div>
    <p>You have a total of ({postCount} ) posts.</p> 
    </>
  )
};
export default UserProfile;
