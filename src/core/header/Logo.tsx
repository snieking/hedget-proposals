import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  wrapper: {
    margin: '0 auto',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%',
  },
  image: {
    margin: '0 auto',
    marginTop: '15px',
    textAlign: 'center',
    display: 'block',
    height: '50%',
  },
  text: {
    display: 'inline',
  },
});

const Logo: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <RouterLink className={classes.wrapper} to="/">
      <img src="/assets/hedget-logo.png" alt="Hedget logo" className={classes.image} />
    </RouterLink>
  );
};

export default Logo;
