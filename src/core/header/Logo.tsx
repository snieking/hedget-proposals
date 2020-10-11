import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import * as config from '../../config';

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
    height: '56px',
    width: '140px',
  },
});

const Logo: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.logoWrapper}>
      <RouterLink to="/">
        <img src="https://hedget.com/images/logo.png" alt="Hedget logo" className={classes.image} />
      </RouterLink>
    </div>
  );
};

export default Logo;
