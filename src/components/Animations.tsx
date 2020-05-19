import React from "react"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components"

const useStyles = makeStyles({
  root: {
    width: 600,
  },

})

const Container  = styled.div`
margin-top: 5em;

display: flex;
// width: 40%;
// float: left;
@media (max-width: 1200px) {
  display: none;
}

`
const Div = styled.div`
// margin-top: 5em;
margin: 1em;
    // display: flex;

  // @media (max-width: 1000px) {
  //   display: none;
  // }

  //   align-items: center;
  //   flex-direction: column;

  @media (max-width: 1890px) {
  }
`
export default function Animations() {
  const classes = useStyles()
  return (
    <Container>

    <Div className={classes.root}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </Div>
    </Container>
  )
}
