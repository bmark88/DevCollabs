import React from "react"
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/layout'
import Matrix from "../components/matrix"

const RegisterPage = () => (
   <>
   <Matrix />
   <Layout>
      <RegisterForm />
   </Layout>
   </>
)

export default RegisterPage