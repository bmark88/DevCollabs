import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import UserProfile from "../components/UserProfile";
import useApplicationData from "../components/hooks/useApplicationData";

const ProfilePage = () => {
  const { postCount, fetchUserPosts } = useApplicationData();
  const userID = JSON.parse(localStorage.getItem('session') || '{}').id

  useEffect(() => {
    fetchUserPosts(userID)
  })

  return (
    <Layout>
      <UserProfile postCount={postCount}>Hello World</UserProfile>
    </Layout>
  )
}

export default ProfilePage;