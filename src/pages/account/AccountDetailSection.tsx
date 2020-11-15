import React, { useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import Stake from '../../shared/Stake';
import StakeInfo from './StakeInfo';
import { useSelector } from 'react-redux';
import ApplicationState from '../../core/redux/application-state';

interface Props {
  address: string;
}

const useStyles = makeStyles({
  wrapper: {
    marginTop: '10px',
  },
  stakeBtn: {
    marginTop: '10px',
  }
});

const AccountDetailSection: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const accountState = useSelector((state: ApplicationState) => state.account);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);

  return (
    <Grid container spacing={1} className={classes.wrapper}>
      <StakeInfo address={props.address} />
      {props.address === accountState?.ethAddress && (
        <>
          <Button
            className={classes.stakeBtn}
            variant="contained"
            color="primary"
            onClick={() => setStakeModalOpen(true)}
          >
            Manage My Stake
          </Button>
          <Stake open={stakeModalOpen} onClose={() => setStakeModalOpen(false)} />
        </>
      )}
    </Grid>
  );
};

export default AccountDetailSection;
