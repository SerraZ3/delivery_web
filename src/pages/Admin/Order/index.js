import React from 'react';

import Header from '../../../components/Header';
import {Body} from './styles';
import ListOrder from './ListOrder';
import {Grid} from '@material-ui/core';

function Order() {
  return (
    <div>
      <Header></Header>
      <Body>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{height: '500px'}}>
            <ListOrder />
          </Grid>
        </Grid>
      </Body>
    </div>
  );
}

export default Order;
