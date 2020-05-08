import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { navigate } from "gatsby"

export default function RegisterForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const onSubmitFunction = (event: any) => {
    setError(false)
    event.preventDefault()
    if (username && password ) {
      const data: object = {
        username: username,
        password: password,
      }
      axios({
        method: "post",
        url: "http://localhost:3001/login",
        data: data,
      })
      .then((data) => {
        localStorage.setItem('session', JSON.stringify(data))
        navigate("/")
      })
      .catch(e => console.log(e))
    } else {
      setError(true)
    }
    
  }
  return (
    <form onSubmit={onSubmitFunction}>
      <input
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button> Submit </button>
      {error && <h3> Please do not leave any field blank</h3>}
    </form>
  )
}
