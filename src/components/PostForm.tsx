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
    margin: theme.spacing(1, 50, 0),
    maxWidth: "310px",
  },
  label: {
    margin: theme.spacing(0, 0, 1),
  },
}))

export default function PostForm(props: any) {
  const classes = useStyles()
  // const [postData, setPostData] = useState("")
  const [postState, setPostState] = useState({
    message: "",
    image: ""
  })
  const [error, setError] = useState(false)

  const onSubmitFunction = (event: any) => {
    // setError(false)
    event.preventDefault()
    const groupId = props.group // <---------------- Change accordinly
    const session = JSON.parse(localStorage.getItem("session") || '{}')
    const userId = session.id
    // const data = { userId, data: postData }
    console.log('postState.image ==>', postState.image)
    const data = { userId, data: postState.message, image_url: postState.image }

    if(data.data !== "") {
      axios({
        method: "post",
        url: `http://localhost:3001/group/${groupId}/post/create`,
        data: data,
      })
        .then(res => {
          console.log('postState ==>', postState)
          console.log('res.data in PostForm.tsx',res.data)
          // console.log(postData)

          props.postFunction(props.group)
          setPostState({...postState, message: "",
          image: ""})
        })
        .catch(() => setError(true))
    }
  }
  return (
    <Container component="main" >
      <form className={classes.form} onSubmit={onSubmitFunction}>
        <InputLabel htmlFor="create-post" className={classes.label}>
          CREATE POST
        </InputLabel>
        <OutlinedInput
          id="create-post"
          placeholder="What's up?"
          fullWidth
          autoComplete="off"
          value={postState.message}
          // onChange={e => setPostData(e.target.value)}
          onChange={e => setPostState({...postState, message: e.target.value})}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={e => setPostState({...postState, image: e.target.value})}
          // onSubmit={e => setState({...state, image: e.target.value})}
        />
        <label htmlFor="raised-button-file">
          <Button component="span">
            Upload Image
          </Button>
        </label> 
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
