import React, { useEffect } from "react";
import UserProfile from "../components/UserProfile"
import useApplicationData from "../components/hooks/useApplicationData"

const UserCard = () => {
  const { 
    postCount,
    subscriptions, 
    fetchUserPosts, 
    fetchUserSubscriptions 
  } = useApplicationData();
  const userID = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('session') || '{}').id
  const userName = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('session') || '{}').username

  useEffect(() => {
    fetchUserPosts(userID)
    fetchUserSubscriptions(userID)
  }, [])

  return (
      <UserProfile 
        userName={userName} 
        postCount={postCount} 
        subscriptions={subscriptions}
      />
  )
};

export default UserCard;