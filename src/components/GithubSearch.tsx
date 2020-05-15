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

/**
 * sudo code
 * [] search user
 * [] display repos
 * [] search for multiple
 * [] search using filters
 */

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

export default function GithubSearch() {
  const [username, setUsername] = useState("")
  const [results, setResults] = useState({})

  console.log(username)
  console.log(results)

  const getUserGithubApi = (event: any) => {
    event.preventDefault()

    //if username is exact
    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/ej2brown/repos`),
    ])
      .then(([user, repos]) => {
        console.log(user)
        console.log(repos)

        setResults({ user: user.data, repos: repos.data })
      })
      .catch(error => console.log(error))

    //does a general search
    // axios.get(`https://api.github.com/search/users?q=${username}`).then(res => {
    //   //if multiple users returned
    //   if (res.data.items.length > 1) {
    //   }
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
      <h3>User </h3>
      {results.user.name && <div> Name: {results.user.name} </div>}
      {results.user.company && <div> Company: {results.user.company} </div>}
      {results.user.location && <div> Location: {results.user.location} </div>}
      {results.user.email && <div> Email: {results.user.email} </div>}
      {results.user.hireable && <div> Name: {results.user.hireable} </div>}
      {results.user.bio && <div> Bio: {results.user.bio} </div>}
      {results.user.html_url && <div> URL: {results.user.html_url} </div>}
      {results.user.avatar_url && <div> Avatar: {results.user.avatar_url} </div>}
      {results.user.followers_url && <div> Followers: {results.user.followers} </div>}
      {results.user.following_url && <div> Following: {results.user.following} </div>}
      {results.user.organizations_url && (
        <div> Organizations: {results.user.organizations_url} </div>
      )}
      {results.user.public_repos && <div> Repos: {results.user.public_repos} </div>}
      {results.user.repos_url && <div> Repos URL: {results.user.repos_url} </div>}
      <h3>User's Repo </h3>
{results.repos && results.repos.map({ })}
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
