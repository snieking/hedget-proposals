import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    cursor: 'pointer',
    textDecoration: 'none',
  },
  logoWrapper: {
    height: '56px',
    width: '140px',
    [theme.breakpoints.down('sm')]: {
      height: '41px',
      width: '115px',
    },
  },
  image: {
    marginTop: '15px',
    height: '56px',
    width: '140px',
    [theme.breakpoints.down('sm')]: {
      height: '41px',
      width: '115px',
    },
  },
}));

const Logo: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.logoWrapper}>
      <RouterLink
        to="#"
        onClick={() => {
          window.location.href = 'https://hedget.com';
        }}
      >
        <img src="https://hedget.com/images/logo.png" alt="Hedget logo" className={classes.image} />
      </RouterLink>
    </div>
  );
};

export default Logo;
