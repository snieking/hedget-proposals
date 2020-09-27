import { Grid, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-40%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  detailTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  detailInfo: {
    textAlign: 'right',
  },
}));

const gitInfo = GitInfo();

const About: React.FunctionComponent = () => {
  const classes = useStyles();

  function formatDate(date: Date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  function detail(title: string, stat: string) {
    return (
      <>
        <Grid item md={6} className={classes.detailTitle}>
          {title}
        </Grid>
        <Grid item md={6} className={classes.detailInfo}>
          {stat}
        </Grid>
      </>
    );
  }

  return (
    <div className={classes.paper}>
      <IconButton href="https://github.com/snieking/hedget-proposals">
        <GitHubIcon />
      </IconButton>
      <Grid container>
        {detail('Block height', '0')}
        {detail('Updated', formatDate(new Date(gitInfo.commit.date)))}
        {detail('Commit', gitInfo.commit.shortHash)}
      </Grid>
    </div>
  );
};

export default About;
