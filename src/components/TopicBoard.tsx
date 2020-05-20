import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel"
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import IndexGroupList from './IndexGroupsList'

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 75,
    "&$expanded": {
      minHeight: 75,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary)

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
}))(MuiExpansionPanelDetails)

interface Props {
  subscriptions: any
}

const ListDiv = styled.div`
  margin: 1em;
  max-height: 368px;
  overflow: hidden;
  overflow-y: scroll;
`

export default function TopicBoard({ subscriptions }: Props) {

  const username = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem("session") || "{}").username
  const [expanded, setExpanded] = useState("panel1")
  const handleChange = (panel: any) => (newExpanded: any) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <>
      <ExpansionPanel
        style={{backgroundColor: "gray"}}
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          className="dark"
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>
            Welcome, <strong>{username}</strong>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="dark">
          <ListDiv>
            <p>
              <strong>{username}</strong>, we are happy you've made the decision
              to collaborate with other developers.
            </p>
            <h3>Getting Started:</h3>
            <ol>
              <li>
                <strong>Communicating with other developers:</strong> 
                <p>
                  Chat directly with users in the online chat to the right. As you grow your network, others can rate you based on your activity.
                </p>
                <p>
                  Remember, to give other ratings as well to let them know what you think.
                </p>
              </li>
              <li>
                <strong>Manage your login credentials:</strong> 
                <p>
                  Change your username, password, email or avatar in settings.
                </p>
              </li>
              <li>
                <strong>Manage your group subscriptions:</strong> 
                <p>
                  Join or leave public groups, and delete your own created groups in the groups tab below.
                </p>
                <p>
                  For each group subscription, you'll be able to view posts that have been created since day one.
                </p>
              </li>
              <li>
                <strong>Live pair programming:</strong> 
                <p>
                  Pair program with anyone, just tell them to join the SECRET room name you've created.
                
                  You'll need to navigate to the groups page to do this.
                </p>
              </li>
              <li>
                <strong>Hackathons:</strong> 
                <p>Find a hackathon near you in the features dropdown menu.</p>
              </li>
              <li>
                <strong>GitHub Search</strong> 
                <p>
                  Search users by username, repos, or programming language. By using this search, you'll be able to find like-minded hackathon partners!
                </p>
              </li>
              <li>
                <strong>Developer related news:</strong>
                <p>See the news section below for daily updates.</p>
              </li>
            </ol>
          </ListDiv>
        </ExpansionPanelDetails >
      </ExpansionPanel>
      <ExpansionPanel
        style={{backgroundColor: "gray"}}
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>Groups</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="dark">
          <IndexGroupList subscriptions={subscriptions}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}
