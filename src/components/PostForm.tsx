import React, { useState } from "react"
import {
  Container,
  makeStyles,
  OutlinedInput,
  InputLabel,
  Button,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
    minWidth: "310px",
  },
  label: {
    margin: theme.spacing(0, 0, 1),
  },
}))

export default function PostForm(props: any) {
  const classes = useStyles()
  const [postData, setPostData] = useState("")
  const [error, setError] = useState(false)

  const onSubmitFunction = (event: any) => {
    setError(false)
    event.preventDefault()
    const groupId = props.group // <---------------- Change accordinly
    const session = JSON.parse(localStorage.getItem("session") || '{}')
    const userId = session.id
    const data = { userId, data: postData }
    axios({
      method: "post",
      url: `http://localhost:3001/group/${groupId}/post/create`,
      data: data,
    })
      .then(res => {
        console.log(res.data)
        setPostData("")
        props.postFunction(props.group)
      })
      .catch(() => setError(true))
    
  }
  return (
    <Container component="main" maxWidth="sm">
      <form className={classes.form} onSubmit={onSubmitFunction}>
        <InputLabel htmlFor="create-post" className={classes.label}>
          CREATE POST
        </InputLabel>
        <OutlinedInput
          id="create-post"
          placeholder="What's up?"
          fullWidth
          autoComplete="off"
          value={postData}
          onChange={event => {
            setPostData(event.target.value)
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
        >
          POST
        </Button>
      </form>
      {error && <Alert severity="error">Could Not Create Post</Alert>}
    </Container>
  )
}
