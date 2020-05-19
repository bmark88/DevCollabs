import React from "react"
import { Button, makeStyles } from "@material-ui/core"

interface Props {
  setGroup: any
  name: string
  id: any
}

const useStyles = makeStyles(() => ({
  groupButton: {
    borderColor: "#551A8B",
    marginBottom: "0.5em",
    fontWeight: "bold",
    color: "#551A8B",
    backgroundColor: "#FFF",
    "&:hover": {
      backgroundColor: "#C0C0C0",
      color: "#FFF",
      borderColor: "#551A8B",
      fontWeight: "bold",
      borderWidth: "2px",
    },
  },
}))

export default function GroupListItem({ id, name, setGroup }: Props) {
  const classes = useStyles()

  return (
    <Button
      key={id}
      fullWidth
      className={classes.groupButton}
      variant="outlined"
      onClick={() => setGroup(id)}
    >
      {name}
    </Button>
  )
}
