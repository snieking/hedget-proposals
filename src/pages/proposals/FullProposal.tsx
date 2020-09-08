import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import TimerIcon from '@material-ui/icons/Timer';
import EventIcon from '@material-ui/icons/Event';
import { RouteComponentProps } from 'react-router';
import { Typography, makeStyles } from '@material-ui/core';
import { Proposal, PollOption } from '../../core/services/proposals.model';
import { getFullProposal, getProposalPollOptions } from '../../core/services/proposals.service';
import StatusChip from '../../shared/StatusChip';
import PollOptionStats from './poll/PollOptionStats';

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

const app = 'hedget';

const FullProposal: React.FunctionComponent<RouteComponentProps<MatchParams>> = (props) => {
  const classes = useStyles();
  const [proposal, setProposal] = useState<Proposal>();
  const [pollOptions, setPollOptions] = useState<PollOption[]>();

  useEffect(() => {
    if (props.match.params.id) {
      getFullProposal(app, props.match.params.id).then((p) => setProposal(p));
      getProposalPollOptions(app, props.match.params.id).then((o) => setPollOptions(o));
    }
  }, [props]);

  function renderPollStats(total: number) {
    return pollOptions.map((option) => (
      <PollOptionStats key={option.option} text={option.option} votes={option.votes} total={total} selected={false} />
    ));
  }

  if (!proposal || !pollOptions) return null;

  const total = pollOptions.map((opt) => opt.votes).reduce((a, b) => a + b);

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
          {renderPollStats(total)}
        </Grid>
      </Grid>
    </div>
  );
};

export default FullProposal;
