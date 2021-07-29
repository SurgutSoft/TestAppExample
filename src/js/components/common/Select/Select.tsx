import React from 'react';
import {FormControl, MenuItem, InputLabel, Select as MuiSelect, withStyles} from "@material-ui/core";
import styles from './Select.module.scss';

export interface IOption {
  value: string,
  label: string
}

interface IProps {
  label?: string;
  width?: number | string;
  placeholder?: string;
  value?: string | number | null;
  options?: Array<IOption>;
  onChange: (value: any) => void;
  border?: 'round' | 'squar';
  bgColor?: 'darkBlue' | 'white';
  fontColor?: "primary" | "white";
  size?: 'small' | 'medium' | 'big';
}

const StyledSelect = withStyles({
  root: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  }
})(MuiSelect);

export const Select = (
  {
    label,
    value,
    options,
    placeholder,
    border = 'squar',
    fontColor = 'primary',
    width = 100,
    onChange
  }: IProps) => {
  const getBorder = () => {
    if (border === 'round') {
      return styles.brRound;
    }

    if (border === 'squar') {
      return styles.border;
    }
  }

  const getFontColor = () => {
    if (fontColor === 'primary') return styles.primaryFontColor;
    if (fontColor === 'white') return styles.whiteFontColor;
  }

  const styleClass = `
    ${styles.select}
    ${getBorder()}
    ${getFontColor()}
  `

  return (
    <FormControl className={styles.formControl} style={{width}}>
      {label && <InputLabel id="select-label" className={styles.label}>{label}</InputLabel>}
      <StyledSelect
        id="select"
        value={value}
        placeholder={placeholder}
        labelId="select-label"
        onChange={onChange}
        disableUnderline
        className={styleClass}
      >
        {options && options.map(option => <MenuItem key={option.value} value={option.value} >{option.label}</MenuItem>)}
      </StyledSelect>
    </FormControl>
  )
}
