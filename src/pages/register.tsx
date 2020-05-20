import React from "react"
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/Layout'
import Matrix from "../components/Matrix"

const RegisterPage = () => (
   <>
   <Matrix />
   <Layout>
      <RegisterForm />
   </Layout>
   </>
)

export default RegisterPage