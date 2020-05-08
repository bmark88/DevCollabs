import React, { useState, useEffect } from "react"
import axios from "axios"
import { navigate } from "gatsby"

export default function SettingsForm() {
  const currentUser = {
    id: 1,
    username: 'test',
    password: '1234',
    email: 'testing@gmail.com',
    avatar_image: "null"
  };
  const [id, setID] = useState(currentUser.id)
  const [username, setUsername] = useState(currentUser.username)
  const [password, setPassword] = useState(currentUser.password)
  const [email, setEmail] = useState(currentUser.email)
  const [avatar, setAvatar] = useState(currentUser.avatar_image)
  const [error, setError] = useState(false)

  const updateUser = (event: any) => {
    setError(false)
    event.preventDefault()
    if (username && email && password && avatar) {
      const data: object = {
        id,
        username,
        email,
        password,
        avatar
      }
      axios({
        method: "post",
        url: "http://localhost:3001/settings",
        data: data,
      }).then((res) => res)
      // navigate('/')
    } else {
      setError(true)
    }
  }
  return (
    <form onSubmit={updateUser}>
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
