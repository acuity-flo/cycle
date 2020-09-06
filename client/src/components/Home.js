import React from 'react';
import Fade from 'react-reveal/Fade';
import { makeStyles, Button, Typography } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';

function Home(props) {
  const isLoggedIn = props.isLoggedIn;
  const classes = useStyles();

  const handleClick = () => {
    if (isLoggedIn) {
      props.history.push('/calendar');
    } else {
      props.history.push('/login');
    }
  };
  return (
    <div className={classes.container}>
      <Fade delay={100}>
        <img
          src={require('../images/Logo_Update.svg')}
          className={classes.image}
          alt={'Cycle Logo'}
        />
      </Fade>
      <div classes={classes.fadeHome}>
        <Typography variant="h4" align="center">
          <Fade delay={300}> Introducing Cycle: </Fade>{' '}
        </Typography>
        <Typography variant="subtitle2" align="center">
          <div className={classes.fadeItem}>
            <Fade delay={700}>
              {' '}
              <FiberManualRecordIcon style={{ fill: '#DEB88F' }} />
              Menstruation Tracking{' '}
            </Fade>
            <Fade delay={1100}>
              {' '}
              <FiberManualRecordIcon style={{ fill: '#8FB5DE' }} /> Symptom
              Tracking{' '}
            </Fade>
            <Fade delay={1500}>
              {' '}
              <FiberManualRecordIcon style={{ fill: '#9BB47A' }} /> Finance
              Tracking{' '}
            </Fade>
          </div>
          <br />
          <br />
        </Typography>
      </div>

      <Typography variant="body1" align="center">
        <div>
          <Fade delay={1900}>
            A cyclical health data tracking app for female-identifying,
            non-binary, and trans people {''} to record their monthly symptoms,
            menstruation, and/or related finances
          </Fade>
        </div>
      </Typography>

      <br />
      <Fade delay={1900}>
        <Button
          onClick={handleClick}
          variant="outlined"
          color="primary"
          type="submit"
        >
          Get Started
        </Button>
      </Fade>
      <br />
      <br />
    </div>
  );
}

const mapState = (state) => ({
  isLoggedIn: !!state.authUser._id,
});

export default withRouter(connect(mapState)(Home));

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
  fadeHome: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  fadeItem: {
    display: 'flex',
  },
});
