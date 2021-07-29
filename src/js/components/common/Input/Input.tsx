import React from 'react';
import {InputAdornment, TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import styles from './Input.module.scss';

interface IProps {
  className?: string;
  label?: string;
  placeholder?: string | number;
  value?: string | number;
  width?: number | string;
  disabled?: boolean;
  endAdornment?: string;
  startAdornment?: string | JSX.Element;
  size?: 'small' | 'medium';
  onChange?: (value: string) => void;
}

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      fontFamily: "Montserrat",
      fontWeight: 400,
      fontSize: '14px',
      paddingLeft: '5px',
      height: '42px',
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

    '& .MuiFormLabel-root': {
      color: styles.labelTextColor,
      fontSize: '14px'
    },

    '& .MuiFormLabel-root.Mui-focused': {
      color: styles.focusedTextColor,
    }
  }
})(TextField);

export const Input = ({
  className,
  label,
  value,
  disabled,
  width = "100%",
  size = 'small',
  placeholder,
  onChange,
  startAdornment,
  endAdornment,
}: IProps) => {

  return (
    <StyledTextField
      className={`${styles.input} ${className}`}
      label={label}
      size={size}
      placeholder={placeholder?.toString()}
      style={{width}}
      value={value}
      onChange={(e: any) => {
        if (onChange) onChange(e.target.value)
      }}
      variant="outlined"
      disabled={disabled}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        startAdornment: <InputAdornment className={styles.adornment} position="start">{startAdornment}</InputAdornment>,
        endAdornment: <InputAdornment className={styles.adornment} position="end">{endAdornment}</InputAdornment>,
      }}
    />
  )
}
