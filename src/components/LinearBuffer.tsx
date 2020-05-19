import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import styled from "styled-components"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    // field: {
    //   backgroundColor: "green",
    // },
    // barColorPrimary: {
    //   backgroundColor: "green",
    // },
    // MuiLinearProgress: {
    //   backgroundColor: "green",
    // },
  })
)

// const useStyles = makeStyles({
//     root: {
//       width: '25%',
//     },
//     container: {
//       maxHeight: 440,
//     },
//     text: {
//       textAlign: 'center',
//     },
//     title: {
//       textAlign: 'center',
//     },
//   });

const Div = styled.div`
  border: solid;
  border-radius: 6px;
  border-color: #f0f0f0;
  border-width: 2px;
  min-width: 400px;
  position: relative;
  margin: 1em;
  opacity: 80%;

  @media (max-width: 1000px) {
    display: none;
  }

  //   display: flex;
  //   align-items: center;
  //   flex-direction: column;

  @media (max-width: 1890px) {
  }
`
export default function LinearBuffer() {
  const classes = useStyles()
  const [completed, setCompleted] = React.useState(0)
  const [buffer, setBuffer] = React.useState(10)

  const progress = React.useRef(() => {})
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0)
        setBuffer(10)
      } else {
        const diff = Math.random() * 10
        const diff2 = Math.random() * 10
        setCompleted(completed + diff)
        setBuffer(completed + diff + diff2)
      }
    }
  })

  React.useEffect(() => {
    function tick() {
      progress.current()
    }
    const timer = setInterval(tick, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Div className={classes.barColorPrimary}>
      <LinearProgress
        className={classes.barColorPrimary}
        variant="buffer"
        value={completed}
        valueBuffer={buffer}
      />
      <LinearProgress
              className={classes.barColorPrimary}
        variant="buffer"
        value={completed}
        valueBuffer={buffer}
        color="secondary"
      />
    </Div>
  )
}
