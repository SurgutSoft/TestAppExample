//TODO need refactor to common component
import React from 'react';
import {Menu as MuiMenu, Button} from '@material-ui/core';

import {ReactComponent as ArrowDownIcon} from '../../../../images/icons/arrows/arrow-down.svg';
import styles from './Menu.module.scss'

interface IProps {
  avatar?: string;
  name?: string;
  width?: string;
  children: JSX.Element[];
}

export const Menu = ({width, name, children}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.wrapper} style={{width}}>
      <Button aria-controls="simple-menu" className={styles.contentWrapper} onClick={handleClick}>
        <div className={styles.content}>
          {name}
        </div>

        <ArrowDownIcon className={Boolean(anchorEl) ? styles.rotateArrow : ''} />
      </Button>

      <MuiMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >
        <div onClick={handleClose}>
          {children}
        </div>
      </MuiMenu>
    </div>
  )
}
