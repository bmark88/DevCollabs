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

  useEffect(() => {
    fetchUserPosts(userID)
    fetchUserSubscriptions(userID)
  }, [])

  return (
    <Layout>
      <UserProfile postCount={postCount} subscriptions={subscriptions}>Hello World</UserProfile>
    </Layout>
  )
}

export default ProfilePage;