import React from 'react';
import MenuItemList from './MenuItemList';

import {ReactComponent as CloseIcon} from '../../../../images/icons/close.svg';
import ColorLogoIcon from '../../../../images/icons/rfms-logo-color.svg';
import css from './Sidebar.module.scss';

interface IProps {
  onClose: () => void,
}

const Sidebar = ({onClose}: IProps) => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <div className={css.logoWrapper}>
          <CloseIcon onClick={onClose} className={css.closeMenu} />
          <img src={ColorLogoIcon} alt="logo"/>
        </div>
      </div>

      <MenuItemList onClose={onClose}/>
    </div>
  )
}

export default Sidebar;
