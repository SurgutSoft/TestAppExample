import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './Progress.module.scss';

interface IProps {
  value: number;
  width?: string;
}

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: styles.primary,
    },
  }),
)(LinearProgress);

export const Progress = ({value, width}: IProps) => {
  return (
    <BorderLinearProgress variant="determinate" value={value} style={{width}}/>
  )
}