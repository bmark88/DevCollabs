import React from "react"
import LoginForm from '../components/LoginForm'
import Layout from '../components/layout'
import Matrix from '../components/matrix'


const LoginPage = () => (
   <>
   <Matrix />
   <Layout>
      <LoginForm />
   </Layout>
   </>
)

export default LoginPage