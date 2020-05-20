
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import GitHubIcon from '@material-ui/icons/GitHub';
import { 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListSubheader,
  TextField
} from  "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
      textAlign: 'center',
      "& div": {},
    },
    listSection: {
      backgroundColor: "inherit",
      marginTop: 15,
    },
    ul: {
      backgroundColor: "inherit",
      margin: 0,
      marginTop: "-15px",
      // position: "relative",
      overflow: "auto",
      maxHeight: 300,      
    },
    text: {
      margin: 0,
      padding: 0,
    },
    resultsRepo: {
      marginTop: 20
    },
    field: {
      marginBottom: "0.2em",
    },
    gitHub: {
      display: "flex",
      flexDirection: "column",
    }
  })
)

const DivFlex = styled.div`
  display: flex;
`;

const FilterContainer = styled.div`
  padding: 20px;
  border: solid 2px;
  margin: 1em;
  min-width: 345px;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const FormFilter = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TitleFilter = styled.div`
  color: black;
  display: flex;
  padding: 1em;
`;

const AdditionalFilters = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 83px;
`;

interface APIResults {
  user: any
  repos: any
};

interface APIRepoResults {
  total_count :number
  incomplete_results :boolean
  items :object[]

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

  const [username, setUsername] = useState("");
  const [userReposCount, setUserReposCount] = useState("");
  const [results, setResults] = useState<APIResults>({ user: {}, repos: {} });
  const [reposName, setReposName] = useState("");
  const [reposTopic, setReposTopic] = useState("");
  const [reposLanguage, setReposLanguage] = useState("");
  const [reposResults, setReposResults] = useState<APIRepoResults>({
    total_count: 0,
    incomplete_results: true,
    items: [],
  });

  const getUserSearch = (event: any) => {
    event.preventDefault()

    //if username is exact
    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
    ])
      .then(([user, repos]) => {
        setResults({ user: user.data, repos: repos.data })
      })
      .catch(error => console.log(error))
  };

  const getFilterSearch = (event: any) => {
    event.preventDefault()
    let searchQuery: string = username
    if (userReposCount) searchQuery = `${username}+repos:%3E${userReposCount}`
    // if (byFollowers) username = `${username}+followers:%3E${byFollowers}`

    //does a general query search
    axios
      .get(`https://api.github.com/search/users?q=${searchQuery}`)
      .then(res => {
        setResults({ user: res.data.items, repos: null })
      })
      .catch(error => console.log(error))
  };

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
  };

  const reposArr: Array<any> = results.repos;
  let sortedReposByDate: Array<any> = []

  if (results.repos && reposArr.length > 0) {
    sortedReposByDate = reposArr.sort((a, b) => b.id - a.id).slice(0, 4)
  }
  const userFilterArr: Array<any> = results.user
  const reposResultsArr: Array<any> = reposResults.items

  return (
    <DivFlex>
      <FilterContainer className={"dark"}>
        {/* \\\\\-----------------------USER-------------------------///// */}
        <div className="user-list dark">
          <TitleFilter>
            <GitHubIcon/>
            <h3 style={{marginLeft: 10}}>Search By User</h3>
          </TitleFilter>
          <FormFilter onSubmit={getUserSearch}>
            <TextField className={classes.field}
              required
              label="GitHub Username"
              value={username}
              variant="outlined"
              onChange={event => setUsername(event.target.value)}
              helperText="Display individual username GitHub analytics"
            />
            <Button 
              type="submit" 
              value="Search" 
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </FormFilter>
          <h5 style={{marginBottom: 5}}>Filter by Minimum # of Repos</h5>
          <div>
            <FormFilter
              autoComplete="off"
              onSubmit={getFilterSearch}
            >
              <TextField className={classes.field}
                required
                label="Minimum Count"
                variant="outlined"
                size="small"
                value={userReposCount}
                helperText="Display list of usernames and repositories"
                onChange={event => setUserReposCount(event.target.value)}
              />
              <Button 
                type="submit" 
                value="Submit" 
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </FormFilter>
          </div>
          {/* \\\\\ -------------------- RESULTS ---------------------- /////*/}
          <List className={`${classes.ul} ${"dark"}`} subheader={<li />}>
            <li key={`section-1`} className={`${classes.listSection} ${"dark"}`}>
              <ul className={`${classes.ul} dark`}>
                {results.user.login && (
                  <ListSubheader style={{padding:"12px"}}>
                    <h2 className="dark">{`User ${results.user.login}`}</h2>
                  </ListSubheader>
                )}

                {results.user.name && (
                  <ListItem key={`item-1-1`} className={classes.text}>
                    <ListItemText primary={`Name: ${results.user.name}`} />
                  </ListItem>
                )}

                {results.user.company && (
                  <ListItem key={`item-1-2`} className={classes.text}>
                    <ListItemText
                      primary={`Company: ${results.user.company}`}
                    />
                  </ListItem>
                )}

                {results.user.location && (
                  <ListItem key={`item-1-3`} className={classes.text}>
                    <ListItemText
                      primary={`Location: ${results.user.location}`}
                    />
                  </ListItem>
                )}

                {results.user.email && (
                  <ListItem key={`item-1-4`} className={classes.text}>
                    <ListItemText primary={`Email: ${results.user.email}`} />
                  </ListItem>
                )}

                {results.user.hireable && (
                  <ListItem key={`item-1-5`} className={classes.text}>
                    <ListItemText
                      primary={`Hireable: ${results.user.hireable}`}
                    />
                  </ListItem>
                )}

                {results.user.bio && (
                  <ListItem key={`item-1-6`} className={classes.text}>
                    <ListItemText primary={`Bio: "${results.user.bio}"`} />
                  </ListItem>
                )}

                {results.user.html_url && (
                  <ListItem key={`item-1-7`} className={classes.text}>
                    <a href={`URL: ${results.user.html_url}`} >
                      {results.user.html_url}
                    </a>
                  </ListItem>
                )}

                {results.user.followers > 0 && (
                  <ListItem key={`item-1-8`} className={classes.text}>
                    <ListItemText
                      primary={`Followers: ${results.user.followers}`}

                    />
                  </ListItem>
                )}

                {results.user.following > 0 && (
                  <ListItem key={`item-1-9`} className={classes.text}>

                    <ListItemText
                      primary={`Following: ${results.user.following}`}
                    />
                  </ListItem>
                )}
              </ul>
            </li>

            {results.repos && results.repos[0] && (
              <li key={`section-2`} className={`${classes.listSection} dark`}>
                <ul className={`${classes.ul} dark`}>
                  <ListSubheader style={{padding:"15px", margin: 0}}>
                    <h2 className="dark">{`User's Repos`}</h2>
                  </ListSubheader>
                  {sortedReposByDate.map(repo => (
                    <ListItem key={`item-2-${repo.id}`} className={classes.gitHub}>

                      <ListItemText primary={`Name: ${repo.name}`} />
                      <ListItemText
                        primary={`Day Created: ${repo.created_at.slice(0, 10)}`}
                      />
                    </ListItem>
                  ))}
                </ul>
              </li>
            )}
            {/* \\\\\ ---------------FILTERS RESULTS--------------- /////*/}
            {!results.repos && parseInt(userReposCount) > 1 && (
              <li key={`section-3`} className={`${classes.listSection} dark`}>
                <ul className={`${classes.ul} dark`}>
                  <ListSubheader style={{padding:"15px", margin: 0}}>
                    <h2>{`User's List`}</h2>
                  </ListSubheader>
                  {reposResults.total_count > 0 && (
                    <ListItem key={`item-3-1`} className={classes.text}>
                      <ListItemText
                        primary={`Total Count: ${results.user.length}`}
                      />
                    </ListItem>
                  )}
                  {<ListItemText 
                    primary={`Total Count: ${userFilterArr.length}`}
                  />}
                  {userFilterArr.map(repo => (
                    <ListItem 
                      key={`item-3-${repo.id}-1`} 
                      className={classes.gitHub}
                    >
                      <ListItemText 
                        primary={`GitHub Username: ${repo.login}`} 
                      />
                      <ListItemText>
                        <a href={repo.html_url}>
                          {repo.html_url}
                        </a>
                      </ListItemText>
                    </ListItem>
                  ))}
                </ul>
              </li>
            )}
          </List>
        </div>
      </FilterContainer>
      {/* \\\\\ -----------------------REPOS------------------------- /////*/}
      <FilterContainer className={"dark"}>
        <div className={`repos-list dark`}>
          <TitleFilter>
            <GitHubIcon/>
            <h3 style={{marginLeft: 10}}>Search By Repository</h3>
          </TitleFilter>
          <FormFilter
            autoComplete="off"
            onSubmit={getReposSearch}
          >
            <TextField className={classes.field}
              // required
              label="Repository Name"
              variant="outlined"
              size="small"
              value={reposName}
              onChange={event => setReposName(event.target.value)}
            />
            <AdditionalFilters>
              <h5 style={{marginBottom: 5}}>Additional Filters</h5>
              <TextField className={classes.field}
                label="Topic"
                variant="outlined"
                size="small"
                value={reposTopic}
                onChange={event => setReposTopic(event.target.value)}
              />
              <TextField className={classes.field}
                label="Programming Language"
                variant="outlined"
                size="small"
                value={reposLanguage}
                onChange={event => setReposLanguage(event.target.value)}
              />
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
                onSubmit={getReposSearch}
              >
                Search
              </Button>
            </AdditionalFilters>
          </FormFilter>

          {/* \\\\\ ------------------RESULTS------------------ /////*/}

          <List className={`${classes.ul} ${"dark"}`} subheader={<li />}>
            {reposResults.incomplete_results === false && (
              <li key={`section-4-0`} className={classes.listSection}>
                <ul className={`${classes.ul} ${"dark"}`}>
                  <ListSubheader style={{padding:"15px", margin: 0}}>
                    <h2>{`Repos Results`}</h2>
                  </ListSubheader>
                  {reposResults.total_count && (
                    <ListItem key={`item-4-2`} className={classes.text}>
                      <ListItemText
                        primary={`Total Count: ${reposResults.total_count}`}
                      />
                    </ListItem>
                  )}
                  {reposResultsArr.map(repo => (
                    <div key={`section-5-${repo.id}-2`} className={classes.resultsRepo}>
                      <ListItem className={classes.text}>
                        <ListItemText primary={`Name: ${repo.name}`} />
                      </ListItem>

                      <ListItem className={classes.text}>
                        <ListItemText
                          primary={`Day Created: ${repo.created_at.slice(
                            0,
                            10
                          )}`}
                        />
                      </ListItem>
                      <ListItem className={classes.text}>
                        <ListItemText
                          primary={`Last Updated: ${repo.updated_at.slice(
                            0,
                            10
                          )}`}
                        />
                      </ListItem>
                      <ListItem className={classes.text}>
                        <ListItemText primary={`Language: ${repo.language}`} />
                      </ListItem>
                      <ListItem className={classes.text}>
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
      </FilterContainer>
    </DivFlex>
  )
}