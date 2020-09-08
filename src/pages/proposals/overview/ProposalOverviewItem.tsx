import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link } from 'react-router-dom';
import { ProposalOverview } from '../../../core/services/proposals.model';
import StatusChip from '../../../shared/StatusChip';
import {
  COLOR_CHROMIA_LIGHTER,
  COLOR_CHROMIA_DARKER,
  COLOR_CHROMIA_LIGHT,
} from '../../../core/dynamic-theme/DefaultTheme';
import { hoursFromNow, formatedAuthor } from '../util';

interface Props {
  proposal: ProposalOverview;
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    backgroundColor: COLOR_CHROMIA_DARKER,
  },
  wrapper: {
    margin: '4px',
    backgroundColor: COLOR_CHROMIA_LIGHTER,
    '&:hover': {
      backgroundColor: COLOR_CHROMIA_LIGHT,
    },
  },
  detailsWrapper: {
    marginTop: '5px',
  },
  chip: {
    marginRight: '20px',
  },
  detail: {
    display: 'inline',
    marginRight: '10px',
  },
  iconText: {
    position: 'relative',
    top: -8,
    left: 2,
    maxWidth: '2ch',
    marginLeft: '2px',
  },
});

const ProposalOverviewItem: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const getTimeDetail = () => {
    const currentTime = Date.now();

    if (props.proposal.endTimestamp > currentTime) {
      return (
        <div className={classes.detail}>
          <ScheduleIcon />
          <Typography variant="body2" component="span" className={classes.iconText}>
            {hoursFromNow(props.proposal.endTimestamp)} hours remaining
          </Typography>
        </div>
      );
    }

    return null;
  };

  return (
    <Link className={classes.link} to={`/proposal/${props.proposal.id}`}>
      <div className={classes.wrapper}>
        <div>
          <StatusChip status={props.proposal.status} className={classes.chip} />
          <Typography variant="h6" component="span">
            <b>{props.proposal.id}:</b> {props.proposal.title}
          </Typography>
        </div>
        <div className={classes.detailsWrapper}>
          <div className={classes.detail}>
            <PersonIcon />
            <Typography variant="body2" component="span" className={classes.iconText}>
              {formatedAuthor(props.proposal.author)}
            </Typography>
          </div>
          <div className={classes.detail}>
            <CategoryIcon />
            <Typography variant="body2" component="span" className={classes.iconText}>
              {props.proposal.category}
            </Typography>
          </div>
          {getTimeDetail()}
        </div>
      </div>
    </Link>
  );
};

export default ProposalOverviewItem;
