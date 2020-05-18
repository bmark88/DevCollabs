import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import UserProfile from "../components/UserProfile";
import useApplicationData from "../components/hooks/useApplicationData";

const ProfilePage = () => {
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
    <Layout>
      <UserProfile postCount={postCount} subscriptions={subscriptions} />
    </Layout>
  )
} 

export default ProfilePage;