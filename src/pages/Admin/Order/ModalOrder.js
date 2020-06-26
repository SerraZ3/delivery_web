import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Modal, Grid, CircularProgress, Box} from '@material-ui/core';
import showOrder from '../../../services/showOrder';
import {TextFieldDesabled} from './styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${process.env.REACT_APP_PRIMARY_COLOR}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// import { Container } from './styles';

function ModalOrder({open, handleClose, data}) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (data) getOrder();
  }, [data]);

  const getOrder = async () => {
    try {
      let response = await showOrder(data.order_id);
      setOrder(response);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div
        style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}}
        className={classes.paper}>
        {data ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}>
            <Grid container xs={6}>
              <Grid item xs={3}>
                <Box boxShadow={2}>
                  <TextFieldDesabled
                    label="Disabled"
                    defaultValue="Hello World"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <h1>aaaaa</h1>
              </Grid>
            </Grid>
            <Grid container xs={6}>
              <Grid item xs={3}>
                <h1>aaaaa</h1>
              </Grid>
              <Grid item xs={3}>
                <h1>aaaaa</h1>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>
    </Modal>
  );
}

export default ModalOrder;
