import React from 'react';

import Header from '../../../components/Header';
import {Body} from './styles';
import ListProduct from './ListProduct';
import {Grid} from '@material-ui/core';

function Product() {
  return (
    <div>
      <Header />
      <Body>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{height: '500px'}}>
            <ListProduct />
          </Grid>
        </Grid>
      </Body>
    </div>
  );
}

export default Product;
