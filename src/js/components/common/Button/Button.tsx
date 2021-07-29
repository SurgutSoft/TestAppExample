import React from 'react';
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
  ButtonTypeMap
} from "@material-ui/core";
import styles from './Button.module.scss';
import {withStyles} from '@material-ui/core/styles';
import {ExtendButtonBase} from '@material-ui/core';
import {Loader} from '../index';

interface IProps {
  children?: any;
  className?: string;
  width?: number | string;
  border?: boolean;
  disabled?: boolean;
  uploader?: boolean;
  loading?: boolean;
  componentType?: 'base' | 'uploader' | 'iconButton'
  size?: "large" | 'medium' | "small";
  type?: "default" | "primary" | "accent" | "link";
  textColor?: "white" | 'red' | 'blue';
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onClick?: () => void;
  onUpload?: (files: FileList | null) => void;
}

export const Button = ({
  className,
  children,
  type = 'default',
  textColor,
  border,
  width,
  disabled,
  uploader,
  componentType = 'base',
  size = 'medium',
  loading,
  startIcon,
  endIcon,
  onClick,
  onUpload,
}: IProps) => {

  const getColorBtn = () => {
    switch (type) {
      case 'primary': return styles.primaryColorBtn;
      case 'accent': return styles.accentColorBtn;
      case 'link': return styles.linkColorBtn;

      default: return 'transporent';
    }
  };

  const getTextColor = () => {
    if (type === 'default' && !textColor) return styles.primaryTextColorBtn;
    if (type !== 'default' && !textColor) return styles.whiteTextColorBtn;

    switch (textColor) {
      case 'white': return styles.whiteTextColorBtn;
      case 'red': return styles.redTextColorBtn;

      default: return styles.primaryTextColorBtn;
    }
  };

  const getBorder = () => {
    if(border) {
      return `1px solid ${styles.primaryColorBtn}`;
    }
  }

  const rootStyles = {
    backgroundColor: getColorBtn(),
    color: getTextColor(),
    height: styles.heightButton,
    borderRadius: 10,
    border: getBorder(),
    width,
    padding: "13px 22px",

    '&:hover': {
      backgroundColor: getColorBtn(),
      opacity: 0.8,
    },
  }

  const StyledButton = withStyles({
    root: {...rootStyles, textTransform: 'none'},
  })(MuiButton) as ExtendButtonBase<ButtonTypeMap<{}, "button">>;

  const StyledIconButton = withStyles({
    root: {
      ...rootStyles, width: 40, height: 40, borderRadius: 30,
    },
    sizeSmall: {
      width: 40,
      height: 40,
    }
  })(MuiIconButton) as ExtendButtonBase<ButtonTypeMap<{}, "button">>;

  const uploaderChildren = <>
    {children}
    <input
      accept="image/jpeg, image/png"
      type="file"
      hidden
      onChange={(e) => onUpload && onUpload(e.target.files)}
    />
  </>

  const BaseBtnComponent = () => (
    <StyledButton
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      component={uploader ? "label" : 'button'}
      endIcon={endIcon}
      startIcon={startIcon}
      size={size}
    >
      {loading
        ? <Loader color={type !== 'primary' ? styles.primaryColorBg : styles.whiteColorBg}/>
        : uploader ? uploaderChildren : children
      }
    </StyledButton>
  )


  const IconBtnComponent = () => (
    <StyledIconButton
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      component={uploader ? "label" : 'button'}
      size={size}
      endIcon={endIcon}
      startIcon={startIcon}
    >
      {uploader ? uploaderChildren : children}
    </StyledIconButton>
  )


  return (
    <>
      {componentType === 'iconButton' ? <IconBtnComponent /> : <BaseBtnComponent />}
    </>
  )
}
