import React from "react";

import Layout from "../components/layout";
import UserProfile from "../components/UserProfile";
import useApplicationData from "../components/hooks/useApplicationData";

const ProfilePage = () => {
  const { state, fetchUserPosts } = useApplicationData();

  const userID = JSON.parse(localStorage.getItem('session') || '{}').id
  fetchUserPosts(userID)

  return (
    <Layout>
      <UserProfile/>
    </Layout>
  )
}

export default ProfilePage;