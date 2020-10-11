import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  wrapper: {
    cursor: 'pointer',
    textDecoration: 'none',
  },
  logoWrapper: {
    height: '46px',
    width: '128px',
  },
  image: {
    marginTop: '15px',
    height: '46px',
    width: '128px',
  },
});

const Logo: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.logoWrapper}>
      <RouterLink to="/">
        <img src="assets/hedget-logo.png" alt="Hedget logo" className={classes.image} />
      </RouterLink>
    </div>
  );
};

export default Logo;
