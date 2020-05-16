import React from "react"
import styled from "styled-components"

interface Props {
  postCount :number
  children: any
  subscriptions: any
}

const Div = styled.div`
  font-size: 50px;
`;

const UserProfile = ({ postCount, subscriptions, children } :Props) => {
  // console.log(subscriptions.map(group => group.id+10))
  console.log({subscriptions})
  return (
    <>
    <Div>{children}</Div>
    <p>You have a total of ({postCount} ) posts.</p>
    Subscribed to: {subscriptions.map((group :any, index :number) => {
      return (
        <div key={index}>{group.id}</div>
      )
    })}
    </>
  )
};
export default UserProfile;
