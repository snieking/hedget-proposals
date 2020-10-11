import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import ApplicationState from '../../../core/redux/application-state';
import { PollOption } from '../../../core/services/proposals.model';
import ConfirmDialog from '../../../shared/ConfirmDialog';

interface Props {
  voteFor: () => void;
  pollOption: PollOption;
  votedFor: string;
  total: number;
}

const useStyles = makeStyles({
  outerWrapper: {
    marginBottom: '15px',
    padding: '5px',
  },
  clickable: {
    cursor: 'pointer',
  },
  icon: {
    float: 'left',
    marginRight: '20px',
  },
  percentage: {
    display: 'inline',
    position: 'relative',
    top: '30px',
    float: 'right',
    marginRight: '10px',
  },
  votes: {
    marginLeft: '50px',
  },
  optionWrapper: {
    display: 'inline',
    position: 'relative',
  },
  upperText: {
    display: 'inline',
  },
  pollBar: {
    marginRight: '5px',
  },
  votedFor: {
    border: '1px solid #EDF2F5',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.21)',
    borderRadius: '5px',
  },
  notVotedFor: {
    border: '1px solid #EDF2F5',
    boxSizing: 'border-box',
    borderRadius: '5px',
  },
});

const PollOptionRenderer: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const accountState = useSelector((state: ApplicationState) => state.account);

  useEffect(() => {
    console.log('Changed confirmDialog: ', confirmDialogOpen);
  }, [confirmDialogOpen]);

  useEffect(() => {
    console.log('Redrawing');
  }, []);

  const hasStaked = (): boolean => accountState.amountStaked > 0;
  const votedFor = (): boolean => props.pollOption.text === props.votedFor;

  const close = (): void => setConfirmDialogOpen(false);

  const vote = (): void => {
    close();
    if (hasStaked() && !props.votedFor) {
      props.voteFor();
    }
  };

  const percent = (): number => (props.pollOption.votes / props.total) * 100;

  function LinearProgressWithLabel() {
    const value = props.pollOption.votes > 0 ? Math.round(percent()) : 0;
    return (
      <Box display="flex" alignItems="center">
        <Box width="50%" mr={1}>
          <LinearProgress
            color={votedFor() ? 'primary' : 'secondary'}
            variant="determinate"
            className={classes.pollBar}
            value={value}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${value}% - ${props.pollOption.votes} HGET`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box
        className={`
        ${classes.outerWrapper}
        ${hasStaked() && !props.votedFor ? classes.clickable : ''}
        ${votedFor() ? classes.votedFor : classes.notVotedFor}
       `}
        onClick={() => hasStaked() && !props.votedFor && setConfirmDialogOpen(true)}
      >
        <HowToVoteIcon color={votedFor() ? 'primary' : 'secondary'} fontSize="large" className={classes.icon} />
        <div className={classes.optionWrapper}>
          <div className={classes.upperText}>
            <Typography variant="body1" component="span">
              {props.pollOption.text}
            </Typography>
          </div>
          <LinearProgressWithLabel />
        </div>
      </Box>
      <ConfirmDialog
        text={`Confirming will cast your vote on '${props.pollOption.text}'.`}
        open={confirmDialogOpen}
        onClose={close}
        onConfirm={vote}
      />
    </>
  );
};

export default PollOptionRenderer;
