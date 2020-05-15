import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";

interface Props {
  children: ReactNode
  image :string
  title :string
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    marginTop: 0,
    margin: 15,
    ['@media (max-width:1200px)']: {
      maxWidth: 200,
      minWidth: 200,
    }
  },
  media: {
    height: 140,
  },
});

const RoomContainer = styled.div`
  margin: 1em;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1880px) {
    justify-content: center;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  font-size: 20px;
`;

const RoomCard = ({ children, image, title } :Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>  
        <CardMedia
          className={classes.media}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom align="center" variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
        <Div>
          {children}
        </Div>
    </Card>
  );
}

export { RoomCard, RoomContainer }