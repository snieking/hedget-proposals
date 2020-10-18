import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import {
  getProposalPollOptions,
  getProposalPollVote,
  voteForOptionInPoll,
} from '../../../core/services/proposals.service';
import { PollOption } from '../../../core/services/proposals.model';
import ApplicationState from '../../../core/redux/application-state';
import PollOptionRenderer from './PollOptionRenderer';
import { notifyError, notifySuccess } from '../../../core/redux/snackbar/snackbar-actions';
import { COLOR_GRAY, COLOR_HEDGET_GREEN, COLOR_YELLOW } from '../../../core/dynamic-theme/DefaultTheme';

interface Props {
  proposalId: string;
  inProgress: boolean;
  notifyError: typeof notifyError;
  notifySuccess: typeof notifySuccess;
}

const useStyles = makeStyles({
  voteStatus: {
    marginBottom: '20px',
    fontWeight: 'bold',
    color: COLOR_GRAY,
  },
});

const Poll: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);
  const [optionVote, setOptionVote] = useState<string>();
  const accountState = useSelector((state: ApplicationState) => state.account);

  useEffect(() => {
    getProposalPollOptions(props.proposalId).then((o) => setPollOptions(o));
  }, [props.proposalId]);

  useEffect(() => {
    if (!optionVote && pollOptions && accountState.isChecked && accountState.accountDetail) {
      getProposalPollVote(accountState, props.proposalId).then((vote) => setOptionVote(vote));
    }
  }, [optionVote, pollOptions, accountState, props]);

  function getVoteStatusText() {
    if (!accountState.accountDetail) {
      return 'Sign-in to vote';
    }

    if (accountState.amountStaked < 10) {
      return 'You must stake 10 HGET to vote';
    }

    if (optionVote) {
      return null;
    }

    return 'Vote on this proposal';
  }

  function voteForOption(text: string) {
    voteForOptionInPoll(accountState, props.proposalId, text)
      .then(() => {
        getProposalPollOptions(props.proposalId).then((o) => setPollOptions(o));
        setOptionVote(text);
        props.notifySuccess('Successfully voted');
      })
      .catch((error) => props.notifyError(error?.message));
  }

  function getOptionColor(index: number) {
    switch (index) {
      case 0:
        return COLOR_HEDGET_GREEN;
      case 1:
        return COLOR_YELLOW;
      case 2:
        return '#0B88CE';
      case 3:
        return '#884BD4';
      default:
        return COLOR_HEDGET_GREEN;
    }
  }

  return (
    <div>
      {getVoteStatusText() && (
        <Typography variant="subtitle1" component="p" className={classes.voteStatus}>
          {getVoteStatusText()}
        </Typography>
      )}
      {pollOptions.map((po) => (
        <PollOptionRenderer
          key={po.text}
          id={props.proposalId}
          voteFor={() => voteForOption(po.text)}
          pollOption={po}
          votedFor={optionVote}
          total={pollOptions.map((p) => p.votes).reduce((a, b) => a + b, 0)}
          color={getOptionColor(pollOptions.indexOf(po))}
          inProgress={props.inProgress}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  notifyError,
  notifySuccess,
};

export default connect(null, mapDispatchToProps)(Poll);
