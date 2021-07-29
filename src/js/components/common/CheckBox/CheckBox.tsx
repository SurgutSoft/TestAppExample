import React from 'react';
import {Checkbox as MuiCheckbox} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

import styles from './CheckBox.module.scss';

interface IProps {
  checked?: boolean;
  onChange?: () => void;
}

const StyledCheckbox = withStyles({
  root: {
    color: styles.colorMain,

    '&$checked': {
      color: styles.colorMain,
    }
  },
  checked: {},
})(MuiCheckbox);

export const Checkbox = ({checked, onChange}: IProps) => {
  return (
    <StyledCheckbox checked={checked} onChange={onChange}/>
  )
}
