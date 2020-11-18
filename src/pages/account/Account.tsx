import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Typography } from '@material-ui/core';
import {
  PollParticipation,
  ProposalOverview
} from '../../core/services/proposals.model';
import {
  getPollParticipationsByAddress,
  getProposalsByAddress
} from '../../core/services/proposals.service';
import BackToProposals from '../../shared/BackToProposals';
import ProposalOverviewItem from '../proposals/overview/ProposalOverviewItem';
import StatusChip from '../../shared/StatusChip';
import AccountDetailSection from './AccountDetailSection';
import SectionDivider from '../../shared/SectionDivider';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import StarsIcon from '@material-ui/icons/Stars';
import { isCoreEthAccount } from '../../core/services/account.service';
import { formatedAuthor } from '../proposals/util';
import { Link } from 'react-router-dom';
import {
  COLOR_CHROMIA_LIGHT,
  COLOR_CHROMIA_LIGHTER
} from '../../core/dynamic-theme/DefaultTheme';

interface MatchParams {
  address: string;
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none'
  },
  accountIcon: {
    position: 'relative',
    top: '10px',
    marginRight: '5px'
  },
  coreIcon: {
    position: 'relative',
    top: '4px',
    marginLeft: '5px'
  },
  tabMenu: {
    marginBottom: '15px'
  },
  voteWrapper: {

  },
  voteInnerWrapper: {
    margin: '4px',
    backgroundColor: COLOR_CHROMIA_LIGHTER,
    '&:hover': {
      backgroundColor: COLOR_CHROMIA_LIGHT,
    },
    marginBottom: '10px',
  },
  voteTitle: {
    marginBottom: '15px'
  },
  voteStatus: {
    marginRight: '15px'
  }
});

const Account: React.FunctionComponent<RouteComponentProps<MatchParams>> = (props) => {
  const classes = useStyles();
  const [proposals, setProposals] = useState<ProposalOverview[]>([]);
  const [pollParticipation, setPollParticipations] = useState<PollParticipation[]>([]);
  const [value, setValue] = React.useState(0);
  const [isCoreUser, setCoreUser] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.match.params.address) {
      getProposalsByAddress(props.match.params.address, 0).then((p) => setProposals(p));
      getPollParticipationsByAddress(props.match.params.address).then((p) => setPollParticipations(p));
      isCoreEthAccount(props.match.params.address).then(isCore => setCoreUser(isCore));
    }
  }, [props.match.params.address]);

  const renderCreatedProposals = () => {
    return value === 1 && proposals.map((p) => <ProposalOverviewItem
      key={`created:${p.id}`} proposal={p} hideDetails />);
  };

  const renderPollParticipations = () => {
    return (
      value === 0 &&
      pollParticipation.map((p) => (
        <Link to={`/proposal/${p.id}`}
              className={`${classes.voteWrapper} ${classes.link}`}
              key={`participation:${p.id}`}>
          <div className={classes.voteInnerWrapper}>
            <Typography variant="h6" component="p"
                        className={classes.voteTitle}>
              <b>{p.id}:</b> {p.title}
            </Typography>
            <StatusChip status={p.status} className={classes.voteStatus} />
            <Typography variant="body2" component="span">
              <b>{p.amount} HGET</b> for &quot;{p.option}&quot;
            </Typography>
          </div>
        </Link>
      ))
    );
  };

  return (
    <>
      <BackToProposals />
      <Tooltip title="View on Etherscan">
        <a href={`https://etherscan.io/address/${props.match.params.address}`}
           className={classes.link}>
          <LinkIcon fontSize="large" className={classes.accountIcon} />
          <Typography variant="h6"
                      component="span">{formatedAuthor(props.match.params.address)}</Typography>
          {isCoreUser && (
            <StarsIcon className={classes.coreIcon} color="secondary" />)}
        </a>
      </Tooltip>
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
