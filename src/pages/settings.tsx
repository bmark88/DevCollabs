import React from "react"
import { navigate } from "gatsby"

//components
import SettingsForm from '../components/SettingsForm'
import Layout from '../components/Layout'


const RegisterPage = () => {
   if(!localStorage.getItem('session')) {
      navigate('/login')
      return null;
    }

   return (
      <Layout>
         <SettingsForm />
      </Layout>
   )
} 

export default RegisterPage