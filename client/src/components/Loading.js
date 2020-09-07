import React from 'react';
import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { makeStyles } from '@material-ui/core/styles'

export default function Loading () {
  const classes = useStyles()

  return (
    <div className={classes.container}>
    <PacmanLoader css={css} size={50} color={'#8FB5DE'} />;
    </div>
  )
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px"
  }
}));
