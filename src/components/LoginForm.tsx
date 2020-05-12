import React, { useState } from "react"
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
  Grid,
} from "@material-ui/core"
import { LockOutlined, VisibilityOff, Visibility } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"

import axios from "axios"
import { navigate, Link } from "gatsby"

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

export default function RegisterForm() {
  const classes = useStyles()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitFunction = (event: any) => {
    setError(false)
    event.preventDefault()
    const data: object = {
      username: username,
      password: password,
    }
    axios({
      method: "post",
      url: "http://localhost:3001/login",
      data: data,
    })
      .then(data => {
        localStorage.setItem("session", JSON.stringify(data.data))
        navigate("/")
      })
      .catch(() => setError(true))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmitFunction}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              Don't have an account? <Link to="/register">SIGN UP</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {error && <Alert severity="error">Could Not Sign In</Alert>}
    </Container>
  )
}
