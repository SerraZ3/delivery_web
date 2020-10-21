import styled from 'styled-components';
import {Grid, TextField} from '@material-ui/core';

const primary = process.env.REACT_APP_PRIMARY_COLOR;
const secondary = process.env.REACT_APP_SECONDARY_COLOR;

export const Container = styled(Grid).attrs({
  container: true,
  direction: 'column',
  justify: 'center',
  alignItems: 'center',
})`
  min-height: 100vh;
  background-color: 'red';
  margin: 0;
  background-image: linear-gradient(to bottom right, ${primary}, ${secondary});
  align-items: 'center';
`;

export const ContainerBox = styled(Grid).attrs({
  container: true,
  direction: 'column',
  justify: 'center',
})`
  align-self: 'center' !important;
  width: 80vw !important;
  background-color: #ffffff44;
  border-radius: 10px;
  min-height: 500px;
`;
export const DivInput = styled(Grid).attrs({
  item: true,
  justify: 'center',
  direction: 'column',
  container: true,
})`
  margin-top: 10px !important;
`;
export const Input = styled(TextField).attrs({
  margin: 'dense',
})``;
