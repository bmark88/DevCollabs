import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { RFC_2822 } from 'moment';
import styled from "styled-components"

const Img = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  border: solid;
  border-width: thin;
  margin: 0;
  background-color: black;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    borderColor: 'black',
    marginBottom: 15,
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      // duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));

interface Props {
  key: number,
  id: number,
  user: string,
  children: string,
}

export default function Post({ user, children } :Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Img src={"https://planetbotanix.com/wp-content/uploads/2017/08/Female-Avatar-1-300x300-300x300.jpg"} alt="avatar-image"/>
          // <Avatar aria-label="recipe" className={classes.avatar}>
          //   R
          // </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user}
        subheader="Props Date - September 14, 2016"
      />
      {/* <CardMedia
        className={classes.media}
        image="(insert image path)"
        title="receive title from props"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {children}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Reply:</Typography>
          <Typography paragraph>
            Optional Post Replies from other users - Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
