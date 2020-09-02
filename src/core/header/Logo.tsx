import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
  },
});

const Logo: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <RouterLink className={classes.wrapper} to="/">
      <Typography variant="h1" component="h1">
        Proposia
      </Typography>
    </RouterLink>
  );
};

export default Logo;
