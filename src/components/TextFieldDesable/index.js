import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {TextField, FormControl} from '@material-ui/core';

const CssTextField = withStyles({
  root: {
    // Cor quando o input estar ativo
    '& label.Mui-focused': {
      color: 'green',
    },
    // Cor da fonte do input
    '& .MuiInputBase-root.Mui-disabled': {
      color: '#606060',
    },
    // Cor da fonte do input
    '&:hover .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
    // Cor do label
    '& .MuiFormLabel-root.Mui-disabled': {
      color: '#606060',
    },
    // Cor do label quando mouse em cima
    '&:hover .MuiFormLabel-root.Mui-disabled': {
      color: 'black',
    },
    // Cor da linha lateral
    '& .MuiOutlinedInput-root.Mui-disabled': {
      '& fieldset': {
        borderColor: '#606060',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
    },
  },
})(TextField);

export default function CustomizedInputs(props) {
  return (
    <FormControl fullWidth>
      <CssTextField
        {...props}
        variant="outlined"
        disabled={true}
        margin="dense"
      />
    </FormControl>
  );
}
