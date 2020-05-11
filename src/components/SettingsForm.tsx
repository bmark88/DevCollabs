import React, { useState, useEffect } from "react"
import axios from "axios"
import { navigate } from "gatsby"
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core"

import { LockOutlined, VisibilityOff, Visibility } from "@material-ui/icons"
import SettingsIcon from "@material-ui/icons/Settings"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SettingsForm() {
  const classes = useStyles()
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
  const [showPassword, setShowPassword] = useState(false)

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
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Settings
        </Typography>
    <form onSubmit={updateUser}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        value={password}
        type={showPassword ? "text" : "password"}
        onChange={event => setPassword(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="avatar-image"
        label="Avatar Image"
        placeholder="Avatar Link?"
        value={avatar}
        onChange={event => setAvatar(event.target.value)}
      />
      <Button
       type="submit"
       fullWidth
       variant="contained"
       color="primary"
      > 
        Submit 
      </Button>
      {error && <h3> Please do not leave any field blank</h3>}
    </form>
    </div>
    </Container>
  )
}
