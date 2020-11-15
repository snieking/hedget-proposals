import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getStakeByEthAddress } from '../../core/services/account.service';

interface Props {
  address: string;
}

const StakeInfo: React.FunctionComponent<Props> = (props) => {
  const [amountStaked, setAmountStaked] = useState(0);
  const [stakedUntil, setStakedUntil] = useState<number>(0);

  useEffect(() => {
    getStakeByEthAddress(props.address).then(stakeDetails => {
      setAmountStaked(stakeDetails.staked_amount);
      setStakedUntil(stakeDetails.valid_until * 1000);
    })
  }, [props.address]);

  if (!amountStaked || !stakedUntil) return null;

  return (
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="p">
            Tokens
          </Typography>
          <Typography variant="body1" component="p">
            {amountStaked} HGET
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="p">
            Frozen until
          </Typography>
          <Typography variant="body1" component="p">
            {new Date(stakedUntil).toLocaleDateString(window.navigator.language)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StakeInfo;
