import React from 'react';
import {InputAdornment, TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import styles from './Input.module.scss';

interface IProps {
  className?: string;
  label: string;
  value?: string | number;
  error?: boolean;
  width?: number | string;
  disabled?: boolean;
  multiline?: boolean;
  endAdornment?: string;
  startAdornment?: string;
  size?: 'small' | 'medium';
  onChange?: (value: string) => void;
}

//TODO
//- нужно отрефакторить (пока просто копипаста инпута )

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      fontFamily: "Montserrat",
      fontWeight: 400,
      fontSize: '14px',
      '& fieldset': {
        borderColor: styles.borderColor,
      },
      '&:hover fieldset': {
        borderColor: styles.borderColor,
      },
      '&.Mui-focused fieldset': {
        borderColor: styles.borderColorFocused,
      },
    },

    '& .MuiFormLabel-root.Mui-focused': {
      color: styles.FocusedTextColor,
    }
  }
})(TextField);

export const TextArea = ({
  className,
  label,
  value,
  disabled,
  width = "100%",
  size = 'small',
  onChange,
  startAdornment,
  endAdornment,
}: IProps) => {

  return (
    <StyledTextField
      className={`${styles.input} ${className}`}
      label={label}
      size={size}
      style={{width, height: '100%'}}
      value={value}
      onChange={(e: any) => {
        if (onChange) onChange(e.target.value)
      }}
      multiline={true}
      variant="outlined"
      disabled={disabled}
      // InputLabelProps={{
      //   shrink: true,
      // }}
      InputProps={{
        startAdornment: value && <InputAdornment className={styles.adornment} position="start">{startAdornment}</InputAdornment>,
        endAdornment: <InputAdornment className={styles.adornment} position="end">{endAdornment}</InputAdornment>,
      }}
    />
  )
}
