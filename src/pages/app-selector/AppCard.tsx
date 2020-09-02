import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  name: string;
  displayName: string;
  image: string;
  description: string;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

const AppCard: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid item lg={3} md={4} xs={6}>
      <Card className={classes.root}>
        <CardActionArea component={RouterLink} to="/hedget">
          <CardMedia className={classes.media} image={props.image} title={props.displayName} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.displayName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AppCard;
