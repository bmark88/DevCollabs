import React, { useEffect } from "react";
import UserProfile from "../components/UserProfile"
import useApplicationData from "../components/hooks/useApplicationData"
import styled from "styled-components"

const Div = styled.div`

display: flex;
@media (max-width: 1200px) {
      position: relative;
      // margin: 0 auto;
      flex-direction: column;
      width: 400px;
    }
`
const UserCard = () => {
  const { 
    postCount,
    subscriptions, 
    fetchUserPosts, 
    fetchUserSubscriptions 
  } = useApplicationData();
  const userID = JSON.parse(localStorage.getItem('session') || '{}').id
  const userName = JSON.parse(localStorage.getItem('session') || '{}').username

  useEffect(() => {
    fetchUserPosts(userID)
    fetchUserSubscriptions(userID)
  }, [])

  return (
    <Div>
      <UserProfile userName={userName} postCount={postCount} subscriptions={subscriptions} />
    </Div>
  )
};

export default UserCard;