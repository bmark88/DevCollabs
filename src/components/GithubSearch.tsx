import React, { useState } from "react"
import axios from "axios"

import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import AccountCircle from "@material-ui/icons/AccountCircle"
import styled from "styled-components"
import Button from "@material-ui/core/Button"

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import { sizing } from '@material-ui/system';

/**
 * sudo code
 * [x] search user
 * [x] display repos
 * [] search for multiple
 * [] search using filters
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: "inherit",
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
  })
)

export default function GithubSearch() {
  const classes = useStyles()

  const [username, setUsername] = useState("")
  const [results, setResults] = useState({ user: {}, repos: {} })
  console.log(results)

  const getUserGithubApi = (event: any) => {
    event.preventDefault()

    //if username is exact
    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
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
  
  const reposArr = results.repos
  let sortedReposByDate = []
  if (reposArr.length > 0) {
    sortedReposByDate = reposArr.sort((a, b) => b.id - a.id).slice(0, 4)
  }

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

      <List className={classes.root} subheader={<li />} >
        <li key={`section-1`} className={classes.listSection}>
          <ul className={classes.ul}>
            {results.user.login && (
              <ListSubheader><h2>{`User ${results.user.login}`}</h2></ListSubheader>
            )}

            {results.user.name && (
              <ListItem key={`item-1-1`}>
                <ListItemText primary={`Name: ${results.user.name}`} />
              </ListItem>
            )}

            {results.user.company && (
              <ListItem key={`item-1-2`}>
                <ListItemText primary={`Company: ${results.user.company}`} />
              </ListItem>
            )}

            {results.user.location && (
              <ListItem key={`item-1-3`}>
                <ListItemText primary={`Location: ${results.user.location}`} />
              </ListItem>
            )}

            {results.user.email && (
              <ListItem key={`item-1-4`}>
                <ListItemText primary={`Email: ${results.user.email}`} />
              </ListItem>
            )}

            {results.user.hireable && (
              <ListItem key={`item-1-5`}>
                <ListItemText primary={`hireable: ${results.user.hireable}`} />
              </ListItem>
            )}

            {results.user.bio && (
              <ListItem key={`item-1-6`}>
                <ListItemText primary={`Bio: "${results.user.bio}"`} />
              </ListItem>
            )}

            {results.user.html_url && (
              <ListItem key={`item-1-7`}>
                <ListItemText primary={`URL: ${results.user.html_url}`} />
              </ListItem>
            )}

            {results.user.followers_url && (
              <ListItem key={`item-1-9`}>
                <ListItemText
                  primary={`Followers: ${results.user.followers}`}
                />
              </ListItem>
            )}

            {results.user.following_url && (
              <ListItem key={`item-1-10`}>
                <ListItemText
                  primary={`Following: ${results.user.following}`}
                />
              </ListItem>
            )}
          </ul>
        </li>

        {results.repos[0] && (
          <li key={`section-2`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader><h2>{`User's Repos`}</h2></ListSubheader>
              {sortedReposByDate.map(repo => (
                <ListItem key={`item-2-${repo.id}`}>
                  <ListItemText primary={`Name: ${repo.name}`} />
                  <ListItemText primary={`Day Created: ${repo.created_at.slice(0, 10)}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        )}
      </List>

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
