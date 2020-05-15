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

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

export default function GithubSearch() {
  const [username, setUsername] = useState("")
  const [results, setResults] = useState({})

  console.log(username)

  const getUserGithubApi = (event: any) => {
    event.preventDefault()
    //if username is exact

    axios.get(`https://api.github.com/users/${username}`).then(res => {
      console.log(res.data)
      setResults(res.data)
    })

    //does a general search
    // axios.get(`https://api.github.com/search/users?q=${username}`).then(res => {
    //   //if multiple users returned
    //   if (res.data.items.length > 1) {
    //   }

    //   console.log(res.data)
    //   console.log(res.data.items[0])
    //   setResults(res.data.items[0])
    // })
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
      {results.name && <div> Name: {results.name} </div>}
      {results.company && <div> Company: {results.company} </div>}
      {results.location && <div> Location: {results.location} </div>}
      {results.email && <div> Email: {results.email} </div>}
      {results.hireable && <div> Name: {results.hireable} </div>}
      {results.bio && <div> Bio: {results.bio} </div>}
      {results.html_url && <div> URL: {results.html_url} </div>}
      {results.avatar_url && <div> Avatar: {results.avatar_url} </div>}
      {results.followers_url && <div> Followers: {results.followers} </div>}
      {results.following_url && <div> Following: {results.following} </div>}
      {results.organizations_url &&<div> Organizations: {results.organizations_url} </div>}
      {results.public_repos && <div> Repos: {results.public_repos} </div>}
      {results.repos_url && <div> Repos URL: {results.repos_url} </div>}

      <div>Filters</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="# of repos"
          variant="outlined"
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="# of followers"
          variant="outlined"
          size="small"
        />
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
