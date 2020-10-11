import React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { util } from 'postchain-client';
import log from 'loglevel';
import { POST } from '../lib/util';
import useMetaMask from '../lib/hooks/use-meta-mask';
import ApplicationState from '../core/redux/application-state';
import { setAccountDetail } from '../core/redux/account/account.actions';
import * as config from '../config';
import SectionDivider from './SectionDivider';
import { snackbarActions } from '../core/redux/snackbar/snackbar-actions';

const useStyles = makeStyles({
  description: {
    margin: '10px',
  },
  textInput: {
    marginTop: '10px',
    marginRight: '5px',
  },
  button: {
    marginTop: '18px',
    marginLeft: '5px',
  },
  stakedTokens: {
    fontWeight: 'bold',
  },
  message: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
  metaMaskInfo: {
    textAlign: 'center',
  },
});

const StakeMain: React.FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const { loginAPI, haveAccounts, selectedAddress, provider, updateStakeState } = useMetaMask();
  const [stakeAmount, setStakeAmount] = React.useState(10);
  const [duration, setDuration] = React.useState(7);
  const [loading, setLoading] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const contracts = loginAPI?.contracts;
  const accountState = useSelector((state: ApplicationState) => state.account);
  const dispatch = useDispatch();
  const needRefresh =
    loginAPI?.stakeState &&
    (accountState.accountDetail == null || accountState.accountDetail.validUntil !== loginAPI.stakeState.until);

  React.useEffect(() => {
    if (!initialized && loginAPI) {
      if (loginAPI.stakeState != null) {
        const remainingDuration = (Date.now() / 1000 - loginAPI.stakeState.until) / 86400;
        setDuration(Math.max(remainingDuration, 7));
        setStakeAmount(Math.max(loginAPI.stakeState.amount, 10));
      }
      setInitialized(true);
    }
  }, [initialized, loginAPI]);

  async function login(stakeUntilDate: number) {
    const wasLoading = loading;

    try {
      const pubkey = accountState.keyPair.pubKey.toString('hex');
      const loginMessage = `Please sign your public key '${pubkey}' in order to login`;
      const signature = await loginAPI.messageSigner.sign(selectedAddress, loginMessage);

      const response = await POST(`${config.authServer.url}/login`, {
        signature,
        pubkey,
      });

      log.debug(`Login response: ${response}`);
      if (response.status === 'SUCCESS') {
        const accountID = util.sha256(selectedAddress.toLowerCase()).toString('hex');
        // yes, accountID is sha256 of selected address text
        dispatch(
          setAccountDetail({
            accountID,
            validUntil: stakeUntilDate,
          })
        );
      } else {
        dispatch(snackbarActions.notifyError('Login server failed, please try later'));
      }
    } catch (e) {
      dispatch(snackbarActions.notifyError(`Error: ${e.message}`));
    }
    if (!wasLoading) setLoading(false);
  }

  async function stake() {
    if (!contracts.staker || !selectedAddress || !stakeAmount || !duration) return;

    if (loginAPI.stakeState && loginAPI.stakeState.amount > stakeAmount) {
      dispatch(snackbarActions.notifyError('You cannot reduce your stake'));
      return;
    }
    try {
      if (stakeAmount < 10) {
        dispatch(snackbarActions.notifyError('You must stake at least 10 HGET'));
        return;
      }

      if (duration < 7) {
        dispatch(snackbarActions.notifyError('You must stake for at least 7 days'));
        return;
      }

      const actualStakeAmount = stakeAmount * 1000000;
      const allowance = await contracts.hget.getAllowance(selectedAddress);
      setLoading(true);
      if (allowance < actualStakeAmount) {
        await contracts.hget.approve(selectedAddress, actualStakeAmount);
      }
      const stakeUntilDate = Math.round(Date.now() / 1000 + duration * 86400);
      await contracts.staker.stake(selectedAddress, stakeAmount, stakeUntilDate);
      await updateStakeState();
      await login(stakeUntilDate);
    } catch (e) {
      dispatch(snackbarActions.notifyError(`Error: ${e.message}`));
    }
    setLoading(false);
  }

  const mainContent = () => {
    return (
      <Grid container spacing={1}>
        {loginAPI?.stakeState && (
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body2" component="p">
                  Tokens
                </Typography>
                <Typography variant="body1" component="p">
                  {loginAPI.stakeState.amount} HGET
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" component="p">
                  Frozen until
                </Typography>
                <Typography variant="body1" component="p">
                  {new Date(loginAPI.stakeState.until * 1000).toLocaleDateString(window.navigator.language)}
                </Typography>
              </Grid>
            </Grid>
            <SectionDivider />
          </Grid>
        )}
        {needRefresh && (
          <Grid item container>
            <Grid item container>
              <Typography variant="h5">Account needs to be refreshed</Typography>
            </Grid>
            <Grid item container>
              <Button
                variant="contained"
                color="primary"
                onClick={() => login(loginAPI.stakeState.until)}
                disabled={loading}
              >
                Refresh account
                {loading && <CircularProgress />}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item container>
          <TextField
            variant="outlined"
            label="Amount to stake"
            type="number"
            fullWidth
            value={stakeAmount}
            inputProps={{ min: 10 }}
            onChange={(e) => setStakeAmount(parseInt(e.target.value))}
            className={classes.textInput}
          />
          <TextField
            variant="outlined"
            label="Duration"
            type="number"
            fullWidth
            value={duration}
            inputProps={{ min: 7 }}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className={classes.textInput}
          />
          <div style={{ textAlign: 'right', display: 'inline-block', width: '100%' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              disabled={loading}
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => stake()}
              disabled={loading}
              className={classes.button}
            >
              {loading ? <CircularProgress size={24} /> : <span>{loginAPI?.stakeState ? 'Re-stake' : 'Stake'}</span>}
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <DialogContent dividers>
      {!provider && (
        <div>
          <Typography color="error" variant="h5" component="h5">
            MetaMask not detected
          </Typography>
          <Typography variant="body2" component="p" className={classes.message}>
            In order to submit & vote on proposals, <a href="https://metamask.io/">MetaMask</a> is required.
          </Typography>
        </div>
      )}
      {provider && !haveAccounts && (
        <div className={classes.metaMaskInfo}>
          <CircularProgress size={48} />
          <Typography variant="body2" className={classes.message}>
            Please connect MetaMask
          </Typography>
        </div>
      )}
      {initialized && provider && haveAccounts && selectedAddress && !loginAPI && (
        <Typography color="error" variant="h3">
          Error while initializing
        </Typography>
      )}
      {provider && haveAccounts && selectedAddress && loginAPI && mainContent()}
    </DialogContent>
  );
};

const StakeDialog: React.FunctionComponent<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Account</DialogTitle>
      <StakeMain onClose={onClose} />
    </Dialog>
  );
};

export default StakeDialog;
