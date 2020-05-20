import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Rating from "@material-ui/lab/Rating"
import { makeStyles } from "@material-ui/core/styles"
import Checkbox from "@material-ui/core/Checkbox"
import Favorite from "@material-ui/icons/Favorite"
import axios from "axios"

const useStyles = makeStyles({
  rate: {
    right: 0,
    marginTop: "-10px",
    marginBottom: 20,
  },
})

const Div = styled.div`
  position: relative;
  margin: 2px;
`

export default function UserListItem(props: any) {
  const [value, setValue] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const index = props.index
  const user = props.user
  const classes = useStyles()
  const currentUserID = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem("session")).id

  useEffect(() => {
    axios
      .get(`https://dev-collabs-backend.herokuapp.com/rate/${user.id}`)
      .then(data => setValue(Number(data.data.avg)))
      .catch(e => console.log(e))
  }, [])

  const handleOnChange = (_event: any, newValue: any) => {
    axios
      .post(`https://dev-collabs-backend.herokuapp.com/rate/${user.id}`, {
        raterId: currentUserID,
        rating: newValue,
      })
      .then(() => {
        axios
          .get(`https://dev-collabs-backend.herokuapp.com/rate/${user.id}`)
          .then(data => {

            setIsChecked(false)
            console.log(typeof data.data.avg)
            setValue(Number(data.data.avg))
          })
          .catch(e => console.log(e))
      })
  }

  const handleCheck = () => {
    setIsChecked(!isChecked)
  }
  return (
    <Div key={index}>
      {currentUserID === user.id ? (
        <Checkbox
          checked
          disabled
          checkedIcon={<Favorite />}
          name={user.username}
        />
      ) : (
        <Checkbox
          checked={isChecked}
          name={user.username}
          onChange={handleCheck}
        />
      )}

      {user.username}
      {currentUserID === user.id ? (
        <Rating
          readOnly
          className={classes.rate}
          name={user.username}
          value={value}
          precision={0.5}
        />
      ) : (
        <Rating
          readOnly={!isChecked}
          className={classes.rate}
          name={user.username}
          value={value}
          onChange={handleOnChange}
          precision={0.5}
        />
      )}
    </Div>
  )
}
