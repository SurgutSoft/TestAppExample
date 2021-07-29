import React from 'react';
import {Tooltip} from '../Tooltip/Tooltip';
import styles from './InfoCard.module.scss';

interface IProps {
  className?: string;
  icon?: JSX.Element;
  title?: string | number | JSX.Element;
  subTitle?: string | number;
  titleColor?: "blue" | "black";
  description?: string | string[] | JSX.Element;
  tooltip?: string | string[];
}

export const InfoCard = (
  {
    className,
    description,
    icon,
    title,
    subTitle,
    titleColor = 'blue',
    tooltip,
  }: IProps) => {

  const getTitleColor = () => titleColor === 'blue' ? styles.blueTitle : styles.blackTitle;


  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.titleWrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={getTitleColor()}>{title}</span>&nbsp;
        <span className={`${styles.subTitle} ${getTitleColor()}`}>{subTitle}</span>
      </div>

      {tooltip
        ? (
          <Tooltip title={tooltip}>
            <div className={styles.descriptionWrapper}>
              {description}
            </div>
          </Tooltip>
        )
        : (
          <div className={styles.descriptionWrapper}>
            {description}
          </div>
        )}

    </div>
  )
}