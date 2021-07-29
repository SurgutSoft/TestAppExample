import React from 'react';
import {Tooltip as MuiTooltip} from '@material-ui/core';

interface IProps {
  children?: any;
  title: string | string[];
}

export const Tooltip = ({title, children}: IProps) => {
  return (
    <MuiTooltip title={title}>
      {children}
    </MuiTooltip>
  )
}
