import styled from 'styled-components';
import {TextField} from '@material-ui/core';

export const Body = styled.div`
  margin-left: 80px;
  margin-right: 20px;
  margin-top: 80px;
  flex-grow: 1;
`;

export const TextFieldDesabled = styled(TextField).attrs({
  id: 'outlined-disabled',
  variant: 'outlined',
  disabled: true,
  margin: 'dense',
})`
  border-color: red;
`;
