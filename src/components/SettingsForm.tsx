import React, { useState } from "react"
import axios from "axios"
import { navigate } from "gatsby"
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core"

import { VisibilityOff, Visibility } from "@material-ui/icons"
import SettingsIcon from "@material-ui/icons/Settings"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: 'white',
    padding: '1em',
    color: 'black'
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
  const classes:Record<"form" | "submit" | "paper" | "avatar", string> = useStyles()
  const userData = JSON.parse(localStorage.getItem('session') || '{}')

  const [id, setID] = useState(userData.id)
  const [username, setUsername] = useState(userData.username)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState(userData.email)
  const [avatar, setAvatar] = useState("")
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
      })
        .then(res => res)
        .catch(() => setError(true))
    
      localStorage.removeItem("session")
      navigate('/login')
    }
  }
  return (
    <Container component="main" maxWidth="xs" className="dark">
      <div className={`${classes.paper} ${"dark"}`}>
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
            // value={password}
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
            // value={avatar}
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
