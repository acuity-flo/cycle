import React from 'react';
import { Typography } from '@material-ui/core';
import { GrGithub } from 'react-icons/gr';
import { IoLogoLinkedin } from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.repo}>
        <a href="https://github.com/acuity-flo/cycle">
          <GrGithub color="#545454" />
        </a>{' '}
        <Typography className={classes.text}>Cycle Github Repo</Typography>
      </div>
      <div className={classes.names}>
        <Typography>Developed by:</Typography>
        <div className={classes.singleName}>
          <a href="https://github.com/arng0123">
            <GrGithub color="#545454" />
          </a>
          <a href="https://www.linkedin.com/in/arielng/">
            <IoLogoLinkedin color="#545454" />
          </a>{' '}
          <Typography className={classes.text}>Ariel Ng</Typography>
        </div>
        <div className={classes.singleName}>
          <a href="https://github.com/laurenpitruz">
            <GrGithub color="#545454" />
          </a>{' '}
          <a href="https://www.linkedin.com/in/laurenpitruzzello/">
            <IoLogoLinkedin color="#545454" />
          </a>
          <Typography className={classes.text}>Lauren Pitruzzello</Typography>
        </div>
        <div className={classes.singleName}>
          <a href="https://github.com/oliviakasmin">
            <GrGithub color="#545454" />
          </a>{' '}
          <a href="https://www.linkedin.com/in/olivia-kasmin/">
            <IoLogoLinkedin color="#545454" />
          </a>
          <Typography className={classes.text}>Olivia Kasmin</Typography>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#C1C1C2',
  },
  names: {
    display: 'flex',
    padding: '1em',
  },
  repo: {
    display: 'flex',
    padding: '1em',
  },
  singleName: {
    display: 'flex',
    paddingLeft: '2em',
  },
  text: {
    paddingLeft: '0.5em',
  },
});
