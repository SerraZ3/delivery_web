import React from 'react';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: '#ffffff99',
  },
}));
function LoadingScreen({open}) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress
        size={80}
        style={{color: process.env.REACT_APP_PRIMARY_COLOR}}
      />
    </Backdrop>
  );
}

export default LoadingScreen;
