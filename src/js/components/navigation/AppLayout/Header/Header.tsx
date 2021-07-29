import React from 'react';
import {MenuItem} from '@material-ui/core';
import {ReactComponent as WhiteLogoIcon} from '../../../../../images/icons/whiteLogo.svg';
import UserStore from '../../../../store/UserStore';
import EventStore from '../../../../store/EventStore';
import {Menu, ProfileMenu} from '../../../common';

import styles from './Header.module.scss'
import AppStore from '../../../../store/AppStore';
import {observer} from 'mobx-react-lite';
interface IProps {
  breadCrumb?: string;
}

const Header = observer(({breadCrumb}: IProps) => {
  const {user} = UserStore;
  const {setEventId, items} = EventStore;
  // const [event, setEvent] = useState(localStorage.getItem(EVENT_ID));

  //todo fix any
  const handleChangeType = (event: any) => {
    // setEvent(event.target.value);
    setEventId(event.target.value);
  }

  const getOptions = () => (
    user?.events.map(item => {
      return {
        label: item.name,
        value: item.id.toString(),
      }
    })
  )

  return (
    <div className={styles.wrapper}>
      {items &&
        <div className={styles.conent}>
          <WhiteLogoIcon className={styles.logo}/>

          <div className={styles.contentMenu}>
            <div className={styles.breadCrumb}>
              <Menu name={`${items?.name}`} width="283px">
                {getOptions()?.map(item => (
                  <MenuItem key={item.value} value={item.value} onClick={(value) => handleChangeType(value)}>
                    {item.label}
                  </MenuItem>
                )) || []}
              </Menu>
              <span className={styles.bread}>{AppStore.getBreadCrumbByPath()}</span>
            </div>

            <ProfileMenu avatar={user?.avatar} name={`${user?.firstName} ${user?.lastName}`}>
              <MenuItem>Account settings</MenuItem>
              <MenuItem>Billing settings</MenuItem>
              <MenuItem>Log out</MenuItem>
            </ProfileMenu>
          </div>
        </div>
      }
    </div>
  )
})

export default Header;
