import React from "react"
import styled from "styled-components"
import SettingsForm from '../components/SettingsForm'
import Navbar from '../components/Navbar'
import Layout from '../components/layout'


const RegisterPage = () => (
   <Layout>
      <h1>Settings</h1>
      <SettingsForm />
   </Layout>
)

export default RegisterPage