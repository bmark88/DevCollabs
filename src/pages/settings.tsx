import React from "react"
import { navigate } from "gatsby"

import styled from "styled-components"
import SettingsForm from '../components/SettingsForm'
import Navbar from '../components/Navbar'
import Layout from '../components/layout'


const RegisterPage = () => {
   if(!localStorage.getItem('session')) {
      navigate('/login')
      return null;
    }

   return (
      <Layout>
         <h1>Settings</h1>
         <SettingsForm />
      </Layout>
   )
}

export default RegisterPage