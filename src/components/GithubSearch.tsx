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
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
      "& div": {},
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

const DivFlex = styled.div`
  display: flex;
`
const DivFlexAlign = styled.div`
  padding: 20px;
  // align-items: flex-start;
  // margin: auto;
  // alignItems: center;
  // margin-left: auto;
`

interface APIResults {
  user: any
  repos: any
}

// interface filters {
//   byRepos: number
//   byFollowers: number
// }
interface APIRepoResults {
  total_count: number
  incomplete_results: boolean
  items: array
}
export default function GithubSearch() {
  const classes = useStyles()
  /**
   * USER
   * @input_fields username, filters { # of repos, *# of followers }
   * @output_fields name, company, location, email, hireable, bio, followers_count, following_count
   * @output_fields User's Repos { name, created_at }
   *
   * REPOS
   * @input_fields name filters { topic, language }
   * @output_fields total_count, items { name, updated, created_at, forks_count }
   */

  const [username, setUsername] = useState("")
  const [userReposCount, setUserReposCount] = useState("")
  // const [userFilters, setUserFilters] = useState("")

  const [results, setResults] = useState<APIResults>({ user: {}, repos: {} })

  const [reposName, setReposName] = useState("")
  const [reposTopic, setReposTopic] = useState("")
  const [reposLanguage, setReposLanguage] = useState("")

  const [reposResults, setReposResults] = useState<APIRepoResults>({
    total_count: 0,
    incomplete_results: true,
    items: [],
  })

  console.log(results)
  console.log(reposResults)
  console.log("-------------------")

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
    let searchQuery: string = username
    if (userReposCount) searchQuery = `${username}+repos:%3E${userReposCount}`
    // if (byFollowers) username = `${username}+followers:%3E${byFollowers}`
    console.log("->", searchQuery)

    //does a general query search
    axios
      .get(`https://api.github.com/search/users?q=${searchQuery}`)
      .then(res => {
        setResults({ user: res.data.items, repos: null })
      })
      .catch(error => console.log(error))
  }

  //Find repositories via various criteria. This method returns up to 100 results per page.
  const getReposSearch = (event: any) => {
    event.preventDefault()

    let searchQuery: string = reposName
    if (reposTopic) searchQuery = `${searchQuery}+topic:${reposTopic}`
    if (reposLanguage) searchQuery = `${searchQuery}+language:${reposLanguage}`

    axios
      .get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc`
      )
      .then(repos => {
        setReposResults({
          total_count: repos.data.total_count,
          incomplete_results: repos.data.incomplete_results,
          items: repos.data.items,
        })
      })
      .catch(error => console.log(error))
  }

  const reposArr: Array<any> = results.repos
  let sortedReposByDate: Array<any> = []
  if (results.repos && reposArr.length > 0) {
    sortedReposByDate = reposArr.sort((a, b) => b.id - a.id).slice(0, 4)
  }
  const userFilterArr: Array<any> = results.user
  const reposResultsArr: Array<any> = reposResults.items

  return (
    <DivFlex className={classes.margin}>
      <DivFlexAlign>
        {/* \\\\\-----------------------USER-------------------------///// */}

        <div className="user-list">
          <h3>User</h3>
          <form onSubmit={getUserSearch}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="Enter username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button type="submit" value="Submit" variant="outlined">
              Search
            </Button>
          </form>

          <h5>Filters</h5>
          <div>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={getFilterSearch}
            >
              <TextField
                label="# of repos"
                variant="outlined"
                size="small"
                value={userReposCount}
                helperText="General search with username above"
                onChange={event => setUserReposCount(event.target.value)}
              />
              <Button type="submit" value="Submit" variant="outlined">
                Search
              </Button>
            </form>
          </div>

          {/* \\\\\ ----------------------- RESULTS ------------------------- /////*/}

          <List className={classes.root} subheader={<li />}>
            <li key={`section-1`} className={classes.listSection}>
              <ul className={classes.ul}>
                {results.user.login && (
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
                    <ListItemText
                      primary={`Company: ${results.user.company}`}
                    />
                  </ListItem>
                )}

                {results.user.location && (
                  <ListItem key={`item-1-3`}>
                    <ListItemText
                      primary={`Location: ${results.user.location}`}
                    />
                  </ListItem>
                )}

                {results.user.email && (
                  <ListItem key={`item-1-4`}>
                    <ListItemText primary={`Email: ${results.user.email}`} />
                  </ListItem>
                )}

                {results.user.hireable && (
                  <ListItem key={`item-1-5`}>
                    <ListItemText
                      primary={`hireable: ${results.user.hireable}`}
                    />
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

                {results.user.followers && (
                  <ListItem key={`item-1-8`}>
                    <ListItemText
                      primary={`Followers: ${results.user.followers}`}
                    />
                  </ListItem>
                )}

                {results.user.following && (
                  <ListItem key={`item-1-9`}>
                    <ListItemText
                      primary={`Following: ${results.user.following}`}
                    />
                  </ListItem>
                )}
              </ul>
            </li>

            {results.repos && results.repos[0] && (
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
            {/* \\\\\ -----------------------FILTERS RESULTS------------------------- /////*/}
            {!results.repos && userReposCount > 1 && (
              <li key={`section-3`} className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader>
                    <h2>{`User's List`}</h2>
                  </ListSubheader>
                  {reposResults.total_count && (
                    <ListItem key={`item-3-1`}>
                      <ListItemText
                        primary={`Total Count: ${results.user.length}`}
                      />
                    </ListItem>
                  )}
                  {userFilterArr.map(repo => (
                    <ListItem key={`item-3-${repo.id}-1`}>
                      <ListItemText primary={`Name: ${repo.login}`} />
                      <ListItemText primary={`URL: ${repo.html_url}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            )}
          </List>
        </div>
      </DivFlexAlign>
      {/* \\\\\ -----------------------REPOS------------------------- /////*/}
      <DivFlexAlign>
        <div className="repos-list">
          <h3>Repos</h3>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={getReposSearch}
          >
            <TextField
              required
              label="name"
              variant="outlined"
              size="small"
              value={reposName}
              onChange={event => setReposName(event.target.value)}
            />
            <h5>Filters</h5>
            <TextField
              label="Topic"
              variant="outlined"
              size="small"
              value={reposTopic}
              onChange={event => setReposTopic(event.target.value)}
            />
            <TextField
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
              // onSubmit={getReposSearch}
            >
              Search
            </Button>
          </form>

          {/* \\\\\ ---------------------RESULTS--------------------------- /////*/}

          <List className={classes.root} subheader={<li />}>
            {reposResults.incomplete_results === false && (
              <li key={`section-4-0`} className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader>
                    <h2>{`Repos Results`}</h2>
                  </ListSubheader>
                  {reposResults.total_count && (
                    <ListItem key={`item-4-2`}>
                      <ListItemText
                        primary={`Total Count: ${reposResults.total_count}`}
                      />
                    </ListItem>
                  )}
                  {reposResultsArr.map(repo => (
                    <div key={`section-5-${repo.id}-2`}>
                      <ListItem>
                        <ListItemText primary={`Name: ${repo.name}`} />
                      </ListItem>

                      <ListItem>
                        <ListItemText
                          primary={`Day Created: ${repo.created_at.slice(
                            0,
                            10
                          )}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Language ${repo.language}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Forks Count: ${repo.forks_count}`}
                        />
                      </ListItem>
                    </div>
                  ))}
                </ul>
              </li>
            )}
          </List>
        </div>
      </DivFlexAlign>
    </DivFlex>
  )
}
