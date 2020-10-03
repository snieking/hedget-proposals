import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import TimerIcon from '@material-ui/icons/Timer';
import EventIcon from '@material-ui/icons/Event';
import { RouteComponentProps } from 'react-router';
import { Typography, makeStyles } from '@material-ui/core';
import {connect, useSelector} from 'react-redux';
import { KeyPair } from 'ft3-lib';
import { Proposal, PollOption } from '../../core/services/proposals.model';
import { getFullProposal, getProposalPollOptions, voteForOptionInPoll } from '../../core/services/proposals.service';
import StatusChip from '../../shared/StatusChip';
import PollOptionStats from './poll/PollOptionStats';
import PollVoteOption from './poll/PollVoteOption';
import ApplicationState from '../../core/redux/application-state';

interface MatchParams {
  id: string;
}
const useStyles = makeStyles({
  leftContainer: {
    marginRight: '10px',
  },
  authorWrapper: {
    marginTop: '10px',
  },
  iconText: {
    position: 'relative',
    top: -7,
    left: 2,
    maxWidth: '2ch',
    marginLeft: '2px',
  },
});

const FullProposal: React.FunctionComponent<RouteComponentProps<MatchParams>> = (props) => {
  const classes = useStyles();
  const [proposal, setProposal] = useState<Proposal>();
  const [pollOptions, setPollOptions] = useState<PollOption[]>();
  const [optionVote, setOptionVote] = useState<string>();
  const accountState = useSelector((state: ApplicationState) => state.account);

  console.log("FULL PROPOSAL", props);
  useEffect(() => {
    if (props.match.params.id) {
      getFullProposal(props.match.params.id).then((p) => setProposal(p));
      getProposalPollOptions(props.match.params.id).then((o) => setPollOptions(o));
    }
  }, [props]);

  function renderPollStats(total: number) {
    console.log(pollOptions);
    return pollOptions.map((option) => (
      <PollOptionStats
        key={option.text}
        text={option.text}
        votes={option.votes}
        total={total}
        selected={option.text === optionVote}
      />
    ));
  }

  function voteForOption(voteAnswer: string): void {
    const answer = pollOptions.find((a) => a.text === voteAnswer);

    if (answer) {
      answer.votes++;
      setOptionVote(answer.text);
      voteForOptionInPoll(accountState, proposal.id, answer.text);
    }
  }

  function renderPollOptions() {
    return pollOptions.map((option) => <PollVoteOption text={option.text} voteHandler={voteForOption} />);
  }

  if (!proposal || !pollOptions) return null;

  const total = pollOptions.map((opt) => opt.votes).reduce((a, b) => a + b, 0);

  return (
    <div>
      <Typography variant="h5" component="h5">
        {proposal.id}: {proposal.title}
      </Typography>
      <Grid container>
        <Grid item sm={12} md={6}>
          <div className={classes.leftContainer}>
            <p>{proposal.description}</p>
          </div>
        </Grid>
        <Grid item sm={12} md={6}>
          <div>
            <StatusChip status={proposal.status} />
            <div className={classes.authorWrapper}>
              <PersonIcon />
              <Typography variant="body2" component="span" className={classes.iconText}>
                {proposal.author}
              </Typography>
            </div>
            <div>
              <CategoryIcon />
              <Typography variant="body2" component="span" className={classes.iconText}>
                {proposal.category}
              </Typography>
            </div>
            <div>
              <TimerIcon />
              <Typography variant="body2" component="span" className={classes.iconText}>
                {new Date(proposal.startTimestamp).toDateString()}
              </Typography>
            </div>
            <div>
              <EventIcon />
              <Typography variant="body2" component="span" className={classes.iconText}>
                {new Date(proposal.endTimestamp).toDateString()}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={6}>
          {accountState.isChecked && accountState.accountDetail ? renderPollOptions() : renderPollStats(total)}
        </Grid>
      </Grid>
    </div>
  );
};

export default FullProposal;
