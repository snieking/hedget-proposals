import React from 'react';
import {Container, Grid, Typography} from '@material-ui/core';
import Logo from './Logo';
import NavigationIcons from './NavigationIcons';

const Header: React.FunctionComponent<unknown> = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Logo />
        </Grid>
        <Grid item xs={4}>
          <NavigationIcons />
        </Grid>
        <Grid item xs={12}>
          <Container><Typography variant="h4">Proposals</Typography></Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
