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
    maxWidth: 240,
    minWidth: 240,
    marginTop: 0,
    margin: 15,
    ['@media (max-width:1200px)']: {
      maxWidth: 240,
      minWidth: 240,
    },
    ['@media (max-width: 620px)']: {
      maxWidth: 260,
      minWidth: 260,
    }
  },
  font: {
    fontSize: '18px',
  },
  media: {
    height: 140,
  },
});

const RoomContainer = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
  min-width: 330px;
  
  @media (max-width: 1880px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em;
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
          <Typography gutterBottom align="center" variant="h5" component="h2" className={classes.font}>
            {title}
          </Typography>
        </CardContent>
        <Div className={classes.font}>
          {children}
        </Div>
    </Card>
  );
}

export { RoomCard, RoomContainer }