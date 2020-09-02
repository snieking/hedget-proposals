import React from 'react';
import { Grid } from '@material-ui/core';
import AppCard from './AppCard';

const AppSelector: React.FunctionComponent = () => {
  return (
    <Grid container>
      <AppCard
        name="hedget"
        displayName="Hedget"
        image={`${process.env.PUBLIC_URL}/assets/hedget-logo.webp`}
        description="Easy Hedge for your Cryptocurrencies"
      />
    </Grid>
  );
};

export default AppSelector;
