import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import * as moment from "moment"
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

export default function TopicBoard({ subscriptions }: Props) {

  const username = JSON.parse(localStorage.getItem("session") || "{}").username.toString()
  const [expanded, setExpanded] = useState("panel1")
  // const [subscription, setSubscription] = useState()
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
            <p>
              <strong>{username}</strong>, we are happy you've made the decision
              to collaborate with other developers.
            </p>
            <h3>Getting Started:</h3>
            <ol>
              <li>
                Chatting with others: Feel free to use the public chat on the
                right.
              </li>
              <li>
                Joining a Group: Join any public group that you find relevant.
              </li>
              <li>Search hackathons near you: Find a hackathon near you.</li>
              <li>Consuming post content: See other posts below.</li>
            </ol>
            <div>Created At: {moment().format("lll")}</div>
          {/* </Typography> */}
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
