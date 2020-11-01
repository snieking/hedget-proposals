import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Navigation from './Navigation';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
}));

const Header: React.FunctionComponent<unknown> = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container alignContent="center" className={classes.wrapper}>
        <Grid item xs={8}>
          <Logo />
        </Grid>
        <Grid item xs={4}>
          <Navigation />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
