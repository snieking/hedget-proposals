import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, MuiThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ApplicationState from '../../../core/redux/application-state';
import { PollOption } from '../../../core/services/proposals.model';
import ConfirmDialog from '../../../shared/ConfirmDialog';
import { COLOR_GRAY } from '../../../core/dynamic-theme/DefaultTheme';

interface Props {
  voteFor: () => void;
  pollOption: PollOption;
  votedFor: string;
  total: number;
  color: string;
}

const useStyles = makeStyles({
  outerWrapper: {
    marginBottom: '15px',
    padding: '10px',
    borderColor: '#F5F5F5',
  },
  clickable: {
    cursor: 'pointer',
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
    fontWeight: 'bold',
  },
  lowerText: {
    color: COLOR_GRAY,
    fontSize: '14px',
  },
  pollBar: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  votedFor: {
    border: '1px solid #EDF2F5',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.21)',
    borderRadius: '5px',
    borderLeft: 'solid 3px',
  },
  notVotedFor: {
    border: '1px solid #D1D6D7',
    boxSizing: 'border-box',
    borderRadius: '5px',
    borderLeft: 'solid 3px',
  },
});

const PollOptionRenderer: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const accountState = useSelector((state: ApplicationState) => state.account);

  const hasStaked = (): boolean => accountState.amountStaked > 0;
  const votedFor = (): boolean => props.pollOption.text === props.votedFor;

  const close = (): void => setConfirmDialogOpen(false);

  const vote = (): void => {
    close();
    if (hasStaked() && !props.votedFor) {
      props.voteFor();
    }
  };

  const percent = (): number =>
    props.pollOption.votes !== 0 ? Math.round((props.pollOption.votes / props.total) * 100) : 0;

  const createPollBarTheme = () => {
    return createMuiTheme({
      palette: {
        primary: {
          main: props.color,
        },
      },
    });
  };

  return (
    <>
      <Box
        className={`
        ${hasStaked() && !props.votedFor ? classes.clickable : ''}
        ${votedFor() ? classes.votedFor : classes.notVotedFor}
        ${classes.outerWrapper}
       `}
        style={{ borderLeftColor: props.color }}
        onClick={() => hasStaked() && !props.votedFor && setConfirmDialogOpen(true)}
      >
        <div className={classes.optionWrapper}>
          <Typography variant="body1" component="p" className={classes.upperText}>
            {props.pollOption.text}
          </Typography>
          <MuiThemeProvider theme={createPollBarTheme()}>
            <LinearProgress
              color="primary"
              classes={{ colorPrimary: props.color, barColorPrimary: props.color }}
              variant="buffer"
              value={percent()}
              className={classes.pollBar}
            />
          </MuiThemeProvider>
          <Typography variant="body1" component="p" className={classes.lowerText}>
            {percent()}% ({props.pollOption.votes} HGET)
          </Typography>
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
