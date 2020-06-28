import React from 'react';
import styled from 'styled-components';
import {Grid} from '@material-ui/core';

export const Body = styled.div`
  margin-left: 80px;
  margin-right: 20px;
  margin-top: 80px;
  flex-grow: 1;
`;

export const GridContainer = (props) => (
  <Grid {...props} container style={{margin: 0, padding: 0}} spacing={2} />
);
