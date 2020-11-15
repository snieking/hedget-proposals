import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Typography } from '@material-ui/core';
import { PollParticipation, ProposalOverview } from '../../core/services/proposals.model';
import { getPollParticipationsByAddress, getProposalsByAddress } from '../../core/services/proposals.service';
import BackToProposals from '../../shared/BackToProposals';
import ProposalOverviewItem from '../proposals/overview/ProposalOverviewItem';
import StatusChip from '../../shared/StatusChip';
import AccountDetailSection from './AccountDetailSection';
import SectionDivider from '../../shared/SectionDivider';

interface MatchParams {
  address: string;
}

const useStyles = makeStyles({
  tabMenu: {
    marginBottom: '15px',
  },
  voteWrapper: {
    marginBottom: '15px',
    marginLeft: '4px',
  },
  voteTitle: {
    marginBottom: '15px',
  },
  voteStatus: {
    marginRight: '15px',
  },
});

const Account: React.FunctionComponent<RouteComponentProps<MatchParams>> = (props) => {
  const classes = useStyles();
  const [proposals, setProposals] = useState<ProposalOverview[]>([]);
  const [pollParticipation, setPollParticipations] = useState<PollParticipation[]>([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.match.params.address) {
      getProposalsByAddress(props.match.params.address, 0).then((p) => setProposals(p));
      getPollParticipationsByAddress(props.match.params.address).then((p) => setPollParticipations(p));
    }
  }, [props.match.params.address]);

  const renderCreatedProposals = () => {
    return value === 1 && proposals.map((p) => <ProposalOverviewItem key={`created:${p.id}`} proposal={p} hideDetails />);
  };

  const renderPollParticipations = () => {
    return (
      value === 0 &&
      pollParticipation.map((p) => (
        <div className={classes.voteWrapper} key={`participation:${p.id}`}>
          <Typography variant="h6" component="p" className={classes.voteTitle}>
            <b>{p.id}:</b> {p.title}
          </Typography>
          <StatusChip status={p.status} className={classes.voteStatus} />
          <Typography variant="body2" component="span">
            <b>{p.amount} HGET</b> for &quot;{p.option}&quot;
          </Typography>
        </div>
      ))
    );
  };

  return (
    <>
      <BackToProposals />
      <AccountDetailSection address={props.match.params.address} />
      <SectionDivider />
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        className={classes.tabMenu}
      >
        <Tab label="Votes" />
        <Tab label="Created proposals" />
      </Tabs>
      {renderCreatedProposals()}
      {renderPollParticipations()}
    </>
  );
};

export default Account;
