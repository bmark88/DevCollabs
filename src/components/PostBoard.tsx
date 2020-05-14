import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import * as moment from "moment"
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel"
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import useApplicationData from "./hooks/useApplicationData"
import axios from "axios"

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
  },
}))(MuiExpansionPanelDetails)

interface Props {
  publicGroups: any
}

export default function PostBoard({ publicGroups }: Props) {
  const username = JSON.parse(
    localStorage.getItem("session") || "{}"
  ).username.toString()
  const [expanded, setExpanded] = useState("panel1")
  // const [subscription, setSubscription] = useState()

  const handleChange = (panel: any) => (newExpanded: any) => {
    setExpanded(newExpanded ? panel : false)
  }

  const { state } = useApplicationData()
  const { groups } = state
  const subscription = {
    unsubscribe: "-",
    toSubscribe: "+",
  }
  const groupsArr = publicGroups.groups
  const groupsList = groupsArr.map(group => {
    let button = subscription.toSubscribe
    groups.map(subscribedGroup => {
      if (subscribedGroup.id === group.id) button = subscription.unsubscribe
    })
    const onSubmitFunction = (event: any) => {
      if (button === subscription.unsubscribe) return console.log('already in group')
      event.preventDefault()
      button = subscription.unsubscribe
      const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
        .id
      const groupId = group.id
      const data = { userId }
      axios({
        method: "post",
        url: `http://localhost:3001/group/subscription/${groupId}`,
        data: data,
      }).then(res => {
        console.log(res.data)
      })
    }
    return (
      <div>
        {group.name}
        <button onClick={onSubmitFunction}>{button}</button>
      </div>
    )
  })
  return (
    <div>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>
            Welcome, <strong>{username}</strong>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
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
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
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
        {groupsList}
        <ExpansionPanelDetails>
          <Typography></Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography>Random Post 3</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
