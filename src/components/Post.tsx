import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from "styled-components"
import * as moment from "moment"

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
    maxWidth: 1161,
  },
  media: {
    paddingTop: '28.125%', // wide view
  },
  reply: {
    maxWidth: '50%'
  },
  clicked: {
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

interface Props {
  key: number,
  id: number,
  user: string,
  children: string,
  created_at: string,
  image_url: string
}

export default function Post({ user, children, created_at, image_url } :Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Card className={`${classes.root} ${"dark"}`}>
      <CardHeader
        className={"dark"}
        avatar={
          <Img src={"https://planetbotanix.com/wp-content/uploads/2017/08/Female-Avatar-1-300x300-300x300.jpg"} alt="avatar-image"/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user}
        subheader={moment(created_at).calendar()}
      />
      {image_url && 
        <CardMedia
          className={clsx(classes.media, {
            [classes.clicked]: clicked,
          })}
          image={image_url}
          title="receive title from props"
          onClick={handleClick}
        />
      }
      <CardContent className="dark">
        <Typography variant="body2" color="textSecondary" component="p" className="dark">
          {children}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="dark">
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
          <Typography paragraph>Replies:</Typography>
          <Typography paragraph>
            Optional Post Replies from other users (map through replies in db)
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
