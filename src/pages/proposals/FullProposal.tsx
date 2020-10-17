import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BackspaceIcon from '@material-ui/icons/Backspace';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { RouteComponentProps } from 'react-router';
import { Typography, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Proposal, PollOption } from '../../core/services/proposals.model';
import {
  deleteProposal,
  getFullProposal,
  getProposalPollOptions,
  getProposalPollVote,
} from '../../core/services/proposals.service';
import StatusChip from '../../shared/StatusChip';
import ApplicationState from '../../core/redux/application-state';
import { COLOR_DARKER_GREEN, COLOR_GRAY, COLOR_RED } from '../../core/dynamic-theme/DefaultTheme';
import { formatedAuthor } from './util';
import TimeRemainingDetail from './TimeRemainingDetail';
import SectionDivider from '../../shared/SectionDivider';
import Poll from './poll/Poll';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { snackbarActions } from '../../core/redux/snackbar/snackbar-actions';

interface MatchParams {
  id: string;
}
const useStyles = makeStyles({
  returnWrapper: {
    position: 'relative',
    top: -10,
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  },
  returnText: {
    color: COLOR_DARKER_GREEN,
    fontWeight: 'bold',
    position: 'relative',
    top: -5,
    textDecoration: 'none',
    marginLeft: '5px',
  },
  returnIcon: {
    color: COLOR_DARKER_GREEN,
  },
  stats: {
    display: 'inline',
    marginRight: '10px',
  },
  statsIcon: {
    color: COLOR_GRAY,
  },
  iconDetailsWrapper: {
    display: 'inline',
    position: 'relative',
    top: 6,
  },
  iconText: {
    position: 'relative',
    top: -7,
    marginLeft: '2px',
    color: COLOR_GRAY,
  },
  title: {
    marginTop: '20px',
    marginBottom: '5px',
  },
  titleId: {
    color: COLOR_GRAY,
    fontWeight: 'bold',
  },
  coreActions: {
    float: 'right',
  },
  deleteBtn: {
    backgroundColor: COLOR_RED,
  },
  description: {
    whiteSpace: 'pre-wrap',
    marginBottom: '15px',
  },
});

const FullProposal: React.FunctionComponent<RouteComponentProps<MatchParams>> = (props) => {
  const classes = useStyles();

  const [proposal, setProposal] = useState<Proposal>();
  const [pollOptions, setPollOptions] = useState<PollOption[]>();
  const [optionVote, setOptionVote] = useState<string>();
  const [proposalDeletionDialogOpen, setProposalDeletionDialogOpen] = useState(false);
  const accountState = useSelector((state: ApplicationState) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.id) {
      getFullProposal(props.match.params.id).then((p) => setProposal(p));
      getProposalPollOptions(props.match.params.id).then((o) => setPollOptions(o));
    }
  }, [props]);

  useEffect(() => {
    if (!optionVote && pollOptions && accountState.isChecked && accountState.accountDetail) {
      getProposalPollVote(accountState, props.match.params.id).then((vote) => setOptionVote(vote));
    }
  }, [optionVote, pollOptions, accountState, props]);

  if (!proposal || !pollOptions) return null;

  const closeProposalDeletionDialog = () => setProposalDeletionDialogOpen(false);

  const triggerProposalDeletion = () => {
    closeProposalDeletionDialog();
    deleteProposal(accountState, proposal.id)
      .then(() => {
        window.location.href = window.location.origin;
      })
      .catch((error: Error) => dispatch(snackbarActions.notifyError(error.message)));
  };

  const Details: React.FunctionComponent = () => {
    return (
      <div>
        <div className={classes.stats}>
          <StatusChip status={proposal.status} />
        </div>
        <div className={classes.iconDetailsWrapper}>
          <div className={classes.stats}>
            <PersonIcon className={classes.statsIcon} />
            <Link to={`/account/${proposal.author}`} className={classes.link}>
              <Typography variant="body2" component="span" className={classes.iconText}>
                {formatedAuthor(proposal.author)}
              </Typography>
            </Link>
          </div>
          <div className={classes.stats}>
            <CategoryIcon className={classes.statsIcon} />
            <Typography variant="body2" component="span" className={classes.iconText}>
              {proposal.category}
            </Typography>
          </div>
          <div className={classes.stats}>
            <TimeRemainingDetail
              endTimestamp={proposal.endTimestamp}
              iconClassName={classes.statsIcon}
              iconTextClassName={classes.iconText}
            />
          </div>
          {accountState.isCoreAccount && (
            <div className={classes.coreActions}>
              <Button
                variant="contained"
                className={classes.deleteBtn}
                onClick={() => setProposalDeletionDialogOpen(true)}
              >
                <DeleteForeverIcon />
              </Button>
              <ConfirmDialog
                text={`This action will delete the proposal (${proposal.id}) and you won't be able to undo it.`}
                open={proposalDeletionDialogOpen}
                onClose={closeProposalDeletionDialog}
                onConfirm={triggerProposalDeletion}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.returnWrapper}>
        <RouterLink to="/" className={classes.link}>
          <BackspaceIcon fontSize="small" className={classes.returnIcon} />
          <Typography variant="body2" component="span" className={classes.returnText}>
            Back to proposals
          </Typography>
        </RouterLink>
      </div>
      <Typography variant="h6" component="span" className={classes.title}>
        <Typography variant="h6" component="span" className={classes.titleId}>
          {proposal.id}
        </Typography>{' '}
        {proposal.title}
      </Typography>
      <Details />
      <SectionDivider />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" component="p" className={classes.description}>
            {proposal.description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Poll proposalId={proposal.id} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FullProposal;
