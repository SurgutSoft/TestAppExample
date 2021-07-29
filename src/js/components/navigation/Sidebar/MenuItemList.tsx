import React from 'react';
import {Link} from 'react-router-dom';
import {Path} from '../../../consts/router';
import strings from '../../../../i18n/strings';

import {ReactComponent as FundraiserIcon} from '../../../../images/menuIcons/fundraiser.svg';
import {ReactComponent as OverviewIcon} from '../../../../images/menuIcons/overview.svg';
import {ReactComponent as PrintIcon} from '../../../../images/menuIcons/print.svg';
import {ReactComponent as StudentsIcon} from '../../../../images/menuIcons/students.svg';
import {ReactComponent as TeamsIcon} from '../../../../images/menuIcons/teams.svg';
import {ReactComponent as DonationsIcon} from '../../../../images/menuIcons/donations.svg';
import {ReactComponent as SidebarMenuIcon} from '../../../../images/icons/sidebarMenu.svg';
import styles from './Sidebar.module.scss';
import AppStore from '../../../store/AppStore';

interface IProps {
  onClose?: () => void,
  onMenuClick?: () => void,
  showOnlyIcons?: boolean,
}

const MenuItemList = ({onClose, onMenuClick, showOnlyIcons}: IProps) => {

  const getRouteStyle = (path: string) => {
    if (AppStore.activePath === path) {
      return styles.selectedRoute
    } else {
      return styles.route
    }
  }

  const onRoute = (path: string) => {
    AppStore.setActivePath(path);
    onClose && onClose()
  }

  return (
    <div className={styles.menuItem}>
      <div>
        {showOnlyIcons &&
          <div onClick={onMenuClick} className={styles.menuBtn}>
            <SidebarMenuIcon />
          </div>
        }

        <Link to={Path.main} onClick={() => onRoute(Path.main)} className={getRouteStyle(Path.main)}>
          <OverviewIcon />
          <div hidden={showOnlyIcons} >{strings.sidebar.overview}</div>
        </Link>

        <Link to={Path.fundraiser} onClick={() => onRoute(Path.fundraiser)} className={getRouteStyle(Path.fundraiser)}>
          <FundraiserIcon className={styles.strokeSvg}/>
          <div hidden={showOnlyIcons} >{strings.sidebar.fundraiser}</div>
        </Link>

        <Link to={Path.teams} onClick={() => onRoute(Path.teams)} className={getRouteStyle(Path.teams)}>
          <TeamsIcon />
          <div hidden={showOnlyIcons} >{strings.sidebar.teams}</div>
        </Link>

        <Link to={Path.students} onClick={() => onRoute(Path.students)} className={getRouteStyle(Path.students)}>
          <StudentsIcon />
          <div hidden={showOnlyIcons} >{strings.sidebar.students}</div>
        </Link>

        <Link to={Path.donations} onClick={() => onRoute(Path.donations)} className={getRouteStyle(Path.donations)}>
          <DonationsIcon />
          <div hidden={showOnlyIcons} >{strings.sidebar.donations}</div>
        </Link>

        <Link to={Path.fundraiserInviteLetter} onClick={() => onRoute(Path.fundraiserInviteLetter)} className={getRouteStyle(Path.fundraiserInviteLetter)}>
          <PrintIcon />
          <div hidden={showOnlyIcons} >{strings.sidebar.print}</div>
        </Link>
      </div>
    </div>
  )
}

export default MenuItemList;
