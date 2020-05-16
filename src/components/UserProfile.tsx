import React from "react"
import styled from "styled-components"

interface Props {
  postCount :number
  children: any
  subscriptions: any
}

const Div = styled.div`
  border: solid;
`;

const Content = styled.div`
  border: solid;
`;

const UserProfile = ({ postCount, subscriptions, children } :Props) => {
  console.log(subscriptions)
  return (
    <>
    <Content>
      <h3>Total Posts: {postCount}</h3>
      <h3>Group Subscriptions Below: </h3>
      {subscriptions.map((group :any, index :number) => {
        return (
          <>
            <Div key={index}>
              Group: {group.id} 
              {group.is_admin && <p>You are an Admin for this group</p>} 
            </Div>
          </>
        )
      })}
    </Content>
    </>
  )
};
export default UserProfile;
