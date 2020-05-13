// import React, { ReactNode } from "react"
// import styled from "styled-components"

// interface Props {
//   children: ReactNode
// }

// const RoomLinks = styled.div`
//   width: 55vw;
//   position: relative;
// `;

// const Div = styled.div`
//   border: solid;
//   margin: 1em 0;
//   height: 120px;
//   padding: 1em;
// `;

// const Room = ({ children } :Props) => {
//   return (
//     <Div>{children}</Div>
//   )
// };

// const Rooms = ({ children } :Props) => {
//   return (
//     <RoomLinks>{children}</RoomLinks>
//   )
// };

// export { Rooms, Room};

import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface Props {
  children: ReactNode
  image :string
  title :string
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function RoomCard({ children, image, title } :Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
        <>
        <CardMedia
          className={classes.media}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
        </>
      {/* </CardActionArea> */}
      {/* <CardActions> */}
        <Button size="large" color="primary">
          {children}
        </Button>
      {/* </CardActions> */}
    </Card>
  );
}