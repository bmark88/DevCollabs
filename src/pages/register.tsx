import React from "react"
import styled from "styled-components"
import RegisterForm from '../components/RegisterForm'
import Navbar from '../components/Navbar'
import Layout from '../components/layout'


const RegisterPage = () => (
   <Layout>
      <h1>Register</h1>
      <RegisterForm />
   </Layout>
)

export default RegisterPage