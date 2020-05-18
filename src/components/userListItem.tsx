import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Rating from "@material-ui/lab/Rating"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"

const useStyles = makeStyles({
  rate: {
    position: "absolute",
    right: "0px",
  },
})

const Li = styled.li`
  display: inline;
`

const Div = styled.div`
  position: relative;
  margin: 2px;
`

export default function UserListItem(props: any) {
  const [value, setValue] = useState(0)
  const index = props.index
  const user = props.user
  const classes = useStyles()
  const currentUserID = JSON.parse(localStorage.getItem("session")).id

  useEffect(() => {
    axios
      .get(`http://localhost:3001/rate/${user.id}`)
      .then(data => 
         setValue(data.data.avg))
      .catch(e => console.log(e))
  }, [])

  const handleOnChange = (event, newValue) => {
    console.log(user.id)
    console.log(currentUserID)
    setValue(newValue)
  }
  return (
    <Div key={index}>
      <Li>{user.username}</Li>
      <Rating
        readOnly={currentUserID === user.id ? true : false}
        className={classes.rate}
        name={user.username}
        value={value}
        onChange={handleOnChange}
        precision={0.5}
      />
    </Div>
  )
}
