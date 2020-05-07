import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { navigate } from "gatsby"

export default function RegisterForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [error, setError] = useState(false)

  const onSubmitFunction = (event: any) => {
    setError(false)
    event.preventDefault()
    if (username && email && password && avatar) {
      const data: object = {
        username: username,
        email: email,
        password: password,
        avatar: avatar,
      }
      axios({
        method: "post",
        url: "http://localhost:3001/register",
        data: data,
      }).then(() => navigate('/'))
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
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <input
        placeholder="Avatar Link?"
        value={avatar}
        onChange={event => setAvatar(event.target.value)}
      />
      <button> Submit </button>
      {error && <h3> Please do not leave any field blank</h3>}
    </form>
  )
}
