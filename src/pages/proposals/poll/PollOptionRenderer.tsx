import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, MuiThemeProvider, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import { getPollOptionVoterDetails } from '../../../core/services/proposals.service';
import {
  COLOR_CHROMIA_DARK,
  COLOR_GRAY,
  COLOR_HEDGET_GREEN
} from '../../../core/dynamic-theme/DefaultTheme';
import ConfirmDialog from '../../../shared/ConfirmDialog';
import { PollOption, VoterDetails } from '../../../core/services/proposals.model';
import ApplicationState from '../../../core/redux/application-state';
import { formatedAuthor } from '../util';

interface Props {
  id: string;
  voteFor: () => void;
  pollOption: PollOption;
  votedFor: string;
  total: number;
  color: string;
  inProgress: boolean;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  outerWrapper: {
    marginBottom: '15px',
    padding: '10px',
    borderColor: '#F5F5F5',
  },
  clickable: {
    cursor: 'pointer',
  },
  infoBtn: {
    float: 'right',
    zIndex: 10,
    fontSize: '18px',
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
  modalWrapper: {
    position: 'absolute',
    width: 400,
    maxWidth: '90%',
    border: '1px solid',
    borderColor: COLOR_HEDGET_GREEN,
    background: theme.palette.background.paper,
    outline: 'none',
  },
  link: {
    textDecoration: 'none',
    color: COLOR_CHROMIA_DARK,
  },
}));

const PollOptionRenderer: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [voterDetailsOpen, setVoterDetailsOpen] = useState(false);
  const [voterDetails, setVoterDetails] = useState<VoterDetails[]>([]);

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

  const openVoterDetails = (): void => {
    if (voterDetails.length < 1) {
      getPollOptionVoterDetails(props.id, props.pollOption.text).then((details) => setVoterDetails(details));
    }

    setVoterDetailsOpen(true);
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

  const VoterDetailsModal: React.FunctionComponent = () => {
    return (
      <Modal
        open={voterDetailsOpen}
        onClose={() => setVoterDetailsOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.modalWrapper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account</TableCell>
                  <TableCell align="right">Amount (HGET)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voterDetails.map((details) => (
                  <TableRow key={details.address}>
                    <TableCell>
                      <Link to={`/account/${details.address}`} className={classes.link}>
                        {formatedAuthor(details.address)}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{details.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    );
  };

  const eligibleToVote = (): boolean => hasStaked() && !props.votedFor && props.inProgress;

  return (
    <>
      <Box
        className={`
        ${hasStaked() && !props.votedFor ? classes.clickable : ''}
        ${votedFor() ? classes.votedFor : classes.notVotedFor}
        ${classes.outerWrapper}
       `}
        style={{ borderLeftColor: props.color }}
        onClick={() => eligibleToVote() && setConfirmDialogOpen(true)}
      >
        <div className={classes.optionWrapper}>
          {!eligibleToVote() && (
            <IconButton size="small" className={classes.infoBtn} onClick={openVoterDetails}>
              <ThumbUpIcon fontSize="inherit" />
            </IconButton>
          )}
          <Typography variant="body1" component="p" className={classes.upperText}>
            {props.pollOption.text}
          </Typography>
          <MuiThemeProvider theme={createPollBarTheme()}>
            <LinearProgress
              color="primary"
              classes={{ colorPrimary: props.color, barColorPrimary: props.color }}
              variant="determinate"
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
      <VoterDetailsModal />
    </>
  );
};

export default PollOptionRenderer;
