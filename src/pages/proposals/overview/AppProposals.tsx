/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ProposalOverview } from '../../../core/services/proposals.model';
import { getProposals } from '../../../core/services/proposals.service';
import { COLOR_HEDGET_GREEN } from '../../../core/dynamic-theme/DefaultTheme';
import ProposalOverviewList from './ProposalOverviewList';
import AddProposal from './AddProposal';
import ApplicationState from '../../../core/redux/application-state';
import Stake from '../../../shared/Stake';
import SectionDivider from '../../../shared/SectionDivider';

const useStyles = makeStyles({
  createNew: {
    cursor: 'pointer',
    display: 'inline',
    marginLeft: '20px',
    position: 'relative',
    top: -2,
  },
  filterPanel: {},
  filterPickerWrapper: {
    marginTop: '10px',
    maxWidth: '400px',
  },
  filterDescription: {
    marginRight: '10px',
  },
  filterButton: {
    marginLeft: '5px',
    borderRadius: '25px',
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
    if (accountState.accountDetail && accountState.accountDetail.validUntil > Date.now() / 1000) {
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

  const CategoryPickerGridItem: React.FunctionComponent = () => {
    return (
      <Grid item md={6} sm={12} className={classes.filterPickerWrapper}>
        <Typography variant="body1" component="span" className={classes.filterDescription}>
          Category
        </Typography>
        <Button
          variant={includeCore && includeCommunity ? 'contained' : 'outlined'}
          color="primary"
          className={classes.filterButton}
          onClick={() => {
            setIncludeCore(true);
            setIncludeCommunity(true);
          }}
        >
          All
        </Button>
        <Button
          variant={includeCore && !includeCommunity ? 'contained' : 'outlined'}
          color="primary"
          className={classes.filterButton}
          onClick={() => {
            setIncludeCore(true);
            setIncludeCommunity(false);
          }}
        >
          Core
        </Button>
        <Button
          variant={!includeCore && includeCommunity ? 'contained' : 'outlined'}
          color="primary"
          className={classes.filterButton}
          onClick={() => {
            setIncludeCommunity(true);
            setIncludeCore(false);
          }}
        >
          Community
        </Button>
      </Grid>
    );
  };

  const StatusPickerGridItem: React.FunctionComponent = () => {
    return (
      <Grid item md={6} sm={12} className={classes.filterPickerWrapper}>
        <Typography variant="body1" component="span" className={classes.filterDescription}>
          Status
        </Typography>
        <Button
          variant={includeInProgress && includeCompleted ? 'contained' : 'outlined'}
          color="primary"
          className={classes.filterButton}
          onClick={() => {
            setIncludeInProgress(true);
            setIncludeCompleted(true);
          }}
        >
          All
        </Button>
        <Button
          variant={includeInProgress && !includeCompleted ? 'contained' : 'outlined'}
          color="primary"
          className={classes.filterButton}
          onClick={() => {
            setIncludeInProgress(true);
            setIncludeCompleted(false);
          }}
        >
          In Progress
        </Button>
        <Button
          variant={!includeInProgress && includeCompleted ? 'contained' : 'outlined'}
          color="primary"
          className={classes.filterButton}
          onClick={() => {
            setIncludeCompleted(true);
            setIncludeInProgress(false);
          }}
        >
          Completed
        </Button>
      </Grid>
    );
  };

  const FilterPickerGrid: React.FunctionComponent = () => {
    return (
      <Grid container>
        <CategoryPickerGridItem />
        <StatusPickerGridItem />
      </Grid>
    );
  };

  const Header: React.FunctionComponent = () => {
    return (
      <>
        <Typography variant="h5" component="span">
          Proposals
        </Typography>
        <div className={classes.createNew} onClick={openAddProposalDialog}>
          <Typography variant="body1" component="span" color="primary">
            + Create new
          </Typography>
        </div>
      </>
    );
  };

  return (
    <div>
      <Header />
      <FilterPickerGrid />
      <SectionDivider />
      <ProposalOverviewList proposals={proposals} />
      <AddProposal open={addDialogOpen} onClose={closeAddProposalDialog} refreshProposals={refreshProposals} />
      <Stake open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default AppProposals;
