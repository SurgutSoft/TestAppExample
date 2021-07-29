import React from 'react';
import {Menu, Button} from '@material-ui/core';

import {ReactComponent as ArrowDownIcon} from '../../../../images/icons/arrows/arrow-down.svg';
import styles from './ProfileMenu.module.scss'

interface IProps {
  avatar?: string;
  name?: string;
  children: JSX.Element[];
}

export const ProfileMenu = ({avatar, name, children}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.wrapper}>
      <Button aria-controls="simple-menu" onClick={handleClick}>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt="avatar" />
        </div>

        <div className={styles.userName}>{name}</div>

        <ArrowDownIcon className={Boolean(anchorEl) ? styles.rotateArrow : ''} />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div onClick={handleClose}>
          {children}
        </div>
      </Menu>
    </div>
  )
}
