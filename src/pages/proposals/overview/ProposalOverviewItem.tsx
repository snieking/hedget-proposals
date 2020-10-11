import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
import { ProposalOverview } from '../../../core/services/proposals.model';
import StatusChip from '../../../shared/StatusChip';
import {
  COLOR_CHROMIA_LIGHTER,
  COLOR_CHROMIA_DARKER,
  COLOR_CHROMIA_LIGHT,
} from '../../../core/dynamic-theme/DefaultTheme';
import { formatedAuthor } from '../util';
import TimeRemainingDetail from '../TimeRemainingDetail';

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
    marginBottom: '10px',
  },
  detailsWrapper: {
    marginTop: '5px',
  },
  chip: {
    marginRight: '15px',
  },
  detail: {
    position: 'relative',
    top: '6px',
    display: 'inline',
    marginRight: '15px',
  },
  iconText: {
    position: 'relative',
    top: -6,
    left: 2,
    maxWidth: '2ch',
    marginLeft: '2px',
  },
});

const ProposalOverviewItem: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Link className={classes.link} to={`/proposal/${props.proposal.id}`}>
      <div className={classes.wrapper}>
        <Typography variant="h6" component="span">
          <b>{props.proposal.id}:</b> {props.proposal.title}
        </Typography>
        <div className={classes.detailsWrapper}>
          <StatusChip status={props.proposal.status} className={classes.chip} />
          <div className={classes.detail}>
            <CategoryIcon />
            <Typography variant="body2" component="span" className={classes.iconText}>
              {props.proposal.category}
            </Typography>
          </div>
          <div className={classes.detail}>
            <PersonIcon />
            <Typography variant="body2" component="span" className={classes.iconText}>
              {formatedAuthor(props.proposal.author)}
            </Typography>
          </div>
          <div className={classes.detail}>
            <TimeRemainingDetail endTimestamp={props.proposal.endTimestamp} iconTextClassName={classes.iconText} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProposalOverviewItem;
