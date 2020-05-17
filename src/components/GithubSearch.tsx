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
import { sizing } from "@material-ui/system"

/**
 * sudo code
 * [x] search user
 * [x] display repos
 * [] search for multiple
 * [] search using filters
 * [] default forks  
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

interface APIResults {
  user: any
  repos: any
}

interface filters {
  byRepos: number
  byFollowers: number
}
interface APIRepoResults {
  total_count: number
  incomplete_results: boolean
  items: array
}
export default function GithubSearch() {
  const classes = useStyles()
/**
 * user 
 * INPUT fields
 * username

    filters {
     # of repos
      *# of followers
    }


  OUTPUT fields

  name
   company
   location
   email
   hireable
   bio
   followers_url
   following_url
   User's Repos {
   name, 
   created_at 

REPOS

INPUT fields
name

filters {
  topic
  language
}

OUTPUT fields
total_count
  items {
  name
  updated
  created_at
  forks counts
}


}
 */
  const [username, setUsername] = useState("")
  const [userFilters, setUserFilters] = useState("")


  const [results, setResults] = useState<APIResults>({ user: {}, repos: {} })

  const [reposName, setReposName] = useState("")
  const [reposTopic, setReposTopic] = useState("")
  const [reposLanguage, setReposLanguage] = useState("")


  const [reposResults, setReposResults] = useState<APIRepoResults>({ total_count: 0, incomplete_results: true, items: [] })
  
  console.log(results)
  console.log(reposResults)

  console.log('-------------')

  const getUserSearch = (event: any) => {
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
  }

  const getFilterSearch = (event: any) => {
    event.preventDefault()
    if (byRepos) username = `${username}+repos:%3E${byRepos}`
    if (byFollowers) username = `${username}+followers:%3E${byFollowers}`

    //does a general search
    Promise.all([
      axios.get(`https://api.github.com/search/users?q=${username}`),
    ])
      .then(([user, repos]) => {
        setUserFilters({ user: user.data, repos: repos.data })
      })
      .catch(error => console.log(error))

    // if multiple users returned
    //   if (res.data.items.length > 1) {
    //   }
    //   console.log(res.data.items[0])
    //   setResults(res.data.items[0])
    // })
  }

  //Find repositories via various criteria. This method returns up to 100 results per page.
  const getReposSearch = (event: any) => {
    event.preventDefault()
    //parameters
    //q= string ie topic, language
    //sort=
    //order=
    //+language:assembly
    //&sort=stars&order=desc
    //topic:ruby+topic:rails
    //does a general search of repos
    //forks counts
    // updated 
    //

    axios
      .get(
        `https://api.github.com/search/repositories?q=${repo}`
      )
      .then(repos => {
        console.log(repos.data)
        setReposSearch({total_count: repos.data.total_count, incomplete_results: repos.data.incomplete_results, items: repos.data.items})
      })
      .catch(error => console.log(error))
  }

  const reposArr: Array<any> = results.repos
  let sortedReposByDate: Array<any> = []
  if (reposArr.length > 0) {
    sortedReposByDate = reposArr.sort((a, b) => b.id - a.id).slice(0, 4)
  }

  return (
    <div className={classes.margin}>
      <form onSubmit={getUserSearch}>
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
          onSubmit={getUserSearch}
          variant="outlined"
        >
          Search
        </Button>
      </form>

      <List className={classes.root} subheader={<li />}>
        <li key={`section-1`} className={classes.listSection}>
          <ul className={classes.ul}>
            {results.user.name && (
              <ListSubheader>
                <h2>{`User ${results.user.login}`}</h2>
              </ListSubheader>
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
              <ListSubheader>
                <h2>{`User's Repos`}</h2>
              </ListSubheader>
              {sortedReposByDate.map(repo => (
                <ListItem key={`item-2-${repo.id}`}>
                  <ListItemText primary={`Name: ${repo.name}`} />
                  <ListItemText
                    primary={`Day Created: ${repo.created_at.slice(0, 10)}`}
                  />
                </ListItem>
              ))}
            </ul>
          </li>
        )}
      </List>

      <h3>Filters</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={getFilterSearch}
      >
        <TextField
          id="outlined-basic"
          label="# of repos"
          variant="outlined"
          size="small"
          value={userFilters}
          onChange={event => setUserFilters(event.target.value)}
        />
        <Button
          type="submit"
          value="Submit"
          variant="outlined"
          onSubmit={getFilterSearch}
        >
          Search
        </Button>
      </form>
{/* ------------------------------------------------ */}

      <h3>Repos</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={getReposSearch}
        >
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          size="small"
          value={reposName}
          onChange={event => setReposName(event.target.value)}
          />

          <h3>Filters</h3>
          <TextField
          id="outlined-basic"
          label="Topic"
          variant="outlined"
          size="small"
          value={reposTopic}
          onChange={event => setReposTopic(event.target.value)}

        />
        <TextField
          id="outlined-basic"
          label="Language"
          variant="outlined"
          size="small"
          value={reposLanguage}
          onChange={event => setReposLanguage(event.target.value)}

        />
        <Button
          type="submit"
          value="Submit"
          variant="outlined"
          onSubmit={getReposSearch}
        >
          Search
        </Button>

      </form>

      <List className={classes.root} subheader={<li />}>
        <li key={`section-3`} className={classes.listSection}>
          <ul className={classes.ul}>
          {/* setReposSearch({total_count: repos.data.total_count, incomplete_results: repos.data.incomplete_results, items: repos.data.items}) */}

            {reposResults.incomplete_results === false && (
              <ListSubheader>
                <h2>{`Repos ${results.user.login}`}</h2>
              </ListSubheader>
            )}

            {reposResults.total_count && (
              <ListItem key={`item-2-1`}>
                <ListItemText primary={`Name: ${reposResults.user.name}`} />
              </ListItem>
            )}
            {reposResults.items[0] && (
              <ListSubheader>
                <h2>{`User's Repos`}</h2>
              </ListSubheader>
              // {reposResults.items.map(repo => (
              //   <ListItem key={`item-2-${repo.id}`}>
              //     <ListItemText primary={`Name: ${repo.name}`} />
              //     <ListItemText
              //       primary={`Day Created: ${repo.created_at.slice(0, 10)}`}
              //     />
              //                       <ListItemText
              //       primary={`Language ${repo.langage}`}
              //     />
              //   </ListItem>
              // ))}
              )}
          </ul>
        </li>
      </List>
    </div>
  )
}
