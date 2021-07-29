import React from 'react';
import MenuItemList from '../Sidebar/MenuItemList';

import styles from './DesktopNav.module.scss';

interface IProps {
  onMenuClick: () => void;
}

const DesktopNav = ({onMenuClick}: IProps) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <MenuItemList showOnlyIcons onMenuClick={onMenuClick} />
      </div>
    </div>
  )
}

export default DesktopNav;