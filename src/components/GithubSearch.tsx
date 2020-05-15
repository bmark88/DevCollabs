import React, { useState } from "react"
import axios from "axios"

import { makeStyles } from "@material-ui/core/styles"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import AccountCircle from "@material-ui/icons/AccountCircle"
import styled from "styled-components"
import Button from "@material-ui/core/Button"

export default function GithubSearch() {
  const [username, setUsername] = useState("")
console.log(username)
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }))

  const getUserGithubApi = (event:any) => {
    event.preventDefault()
    axios.get(`https://api.github.com/search/users?q=${username}`).then(res => {
      console.log(res.data)
    })
  }

  const classes = useStyles()

  return (
    <div className={classes.margin}>
      <form onSubmit={getUserGithubApi}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="github-search-username"
              label="Enter username"
              id="username"
              label="Username"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          value="Submit"
          onSubmit={getUserGithubApi}
          variant="outlined"
        >
          Search
        </Button>
      </form>
    </div>
  )
}
