import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, IconButton } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useSelector } from 'react-redux';
import { ProposalOverview } from '../../../core/services/proposals.model';
import { getProposals } from '../../../core/services/proposals.service';
import { COLOR_HEDGET_GREEN } from '../../../core/dynamic-theme/DefaultTheme';
import ProposalOverviewList from './ProposalOverviewList';
import AddProposal from './AddProposal';
import ApplicationState from '../../../core/redux/application-state';
import Stake from '../../../Stake';

const useStyles = makeStyles({
  filterPanel: {
    marginBottom: '10px',
  },
  filterIcon: {
    position: 'relative',
    top: 5,
  },
  filterOption: {
    fontWeight: 'bold',
  },
  optionItem: {
    marginLeft: '5px',
  },
  clickable: {
    cursor: 'pointer',
  },
  clicked: {
    color: COLOR_HEDGET_GREEN,
    fontWeight: 'bold',
  },
  separator: {
    marginLeft: '6px',
  },
});

const AppProposals: React.FunctionComponent = () => {
  const classes = useStyles();

  const [proposals, setProposals] = useState<ProposalOverview[]>([]);
  const [includeCore, setIncludeCore] = useState(true);
  const [includeCommunity, setIncludeCommunity] = useState(true);
  const [includeCompleted, setIncludeCompleted] = useState(true);
  const [includeInProgress, setIncludeInProgress] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const accountState = useSelector((state: ApplicationState) => state.account);

  function refreshProposals() {
    let categoryFilter = '';
    if (!includeCommunity) {
      categoryFilter = 'Core';
    } else if (!includeCore) {
      categoryFilter = 'Community';
    }

    let statusFilter = '';
    if (!includeCompleted) {
      statusFilter = 'In Progress';
    } else if (!includeInProgress) {
      statusFilter = 'Completed';
    }
    getProposals(categoryFilter, statusFilter).then((p) => setProposals(p));
  }

  function openAddProposalDialog() {
    console.log("AccountState", accountState);
    console.log("Valid: ", accountState.accountDetail.validUntil > (Date.now() / 1000));
    console.log("ValidUntil: ", accountState.accountDetail.validUntil);
    console.log("Current time: ", Date.now());
    if (accountState.accountDetail && accountState.accountDetail.validUntil > (Date.now() / 1000)) {
      setAddDialogOpen(true);
    } else {
      setLoginOpen(true);
    }
  }

  function closeAddProposalDialog() {
    setAddDialogOpen(false);
  }

  useEffect(() => {
    refreshProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeCore, includeCommunity, includeCompleted, includeInProgress]);

  return (
    <div>
      <Grid container className={classes.filterPanel}>
        <Grid item md={8} sm={12}>
          <CategoryIcon className={classes.filterIcon} />
          <Typography
            variant="body2"
            component="span"
            className={`${classes.optionItem} ${includeCommunity ? classes.clickable : ''} ${
              includeCore ? classes.clicked : ''
            }`}
            onClick={() => {
              if (includeCommunity) {
                setIncludeCore(!includeCore);
              }
            }}
          >
            Core
          </Typography>
          <span className={classes.separator}>•</span>
          <Typography
            variant="body2"
            component="span"
            className={`${classes.optionItem} ${includeCore ? classes.clickable : ''} ${
              includeCommunity ? classes.clicked : ''
            }`}
            onClick={() => {
              if (includeCore) {
                setIncludeCommunity(!includeCommunity);
              }
            }}
          >
            Community
          </Typography>
          <CheckCircleIcon className={classes.filterIcon} style={{ marginLeft: '20px' }} />
          <Typography
            variant="body2"
            component="span"
            className={`${classes.optionItem} ${includeInProgress ? classes.clickable : ''} ${
              includeCompleted ? classes.clicked : ''
            }`}
            onClick={() => {
              if (includeInProgress) {
                setIncludeCompleted(!includeCompleted);
              }
            }}
          >
            Completed
          </Typography>
          <span className={classes.separator}>•</span>
          <Typography
            variant="body2"
            component="span"
            className={`${classes.optionItem} ${includeCompleted ? classes.clickable : ''} ${
              includeInProgress ? classes.clicked : ''
            }`}
            onClick={() => {
              if (includeCompleted) {
                setIncludeInProgress(!includeInProgress);
              }
            }}
          >
            In Progress
          </Typography>
        </Grid>
        <Grid item md={4} sm={12}>
          {accountState.accountDetail && (
            <IconButton onClick={openAddProposalDialog}>
              <NoteAddIcon fontSize="large" />
            </IconButton>
          )}
          <Stake open={loginOpen} onClose={() => setLoginOpen(false)} />
        </Grid>
      </Grid>
      <ProposalOverviewList proposals={proposals} />
      <AddProposal open={addDialogOpen} onClose={closeAddProposalDialog} refreshProposals={refreshProposals} />
    </div>
  );
};

export default AppProposals;
