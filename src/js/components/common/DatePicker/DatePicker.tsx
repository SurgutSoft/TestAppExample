import React from 'react';
import 'date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {withStyles} from '@material-ui/core/styles';
import {ParsableDate} from '@material-ui/pickers/constants/prop-types';

import styles from './DatePicker.module.scss';

interface IProps {
  className?: string;
  label?: string;
  value?: ParsableDate;
  format?: string;
  onChange: (date: Date | null) => void;
}

const StyledDatePicker = withStyles({
  root: {
    border: `1px solid ${styles.borderColor}`,
    borderRadius: styles.borderRadius,
    width: '170px',
    height: '41px',
    '& .MuiFormLabel-root': {
      position: 'absolute',
      top: `-${styles.unit}`,
      left: styles.unit,
      padding: `0 ${styles.unit}`,
      backgroundColor: 'white',
    },

    '& .MuiInputBase-root': {
      marginTop: '6px',
      paddingLeft: styles.unit,
    }
  },
})(KeyboardDatePicker);

//TODO сделать дата пикер по дизайну, пока не используемый компонент
export const DatePicker = ({
  className,
  value,
  label,
  format,
  onChange,
}: IProps) => {

  //TODO: need work;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledDatePicker
        className={className}
        disableToolbar
        variant="inline"
        format={format}
        id="date-picker-inline"
        label={label}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
