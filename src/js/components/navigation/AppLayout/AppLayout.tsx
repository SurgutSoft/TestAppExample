import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Route, Switch, useHistory, withRouter} from "react-router";
import {Drawer} from '@material-ui/core';

import Sidebar from "../Sidebar/Sidebar";
import DesktopNav from '../DesktopNav/DesktopNav';
import Header from './Header/Header';
import Overview from '../../../screens/Overview/Overview';
import Students from '../../../screens/Students/Students';
import Teams from '../../../screens/Teams/Teams';
import Donations from '../../../screens/Donations/Donations';
import PrintInviteLetter from '../../../screens/PrintInviteLetter/PrintInviteLetter';
import Fundraiser from '../../../screens/Fundraiser/Fundraiser';
import {withStyles} from '@material-ui/core/styles';
import {Path} from '../../../consts/router';

import styles from './AppLayout.module.scss'

const StyledDrawer = withStyles({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
    
    '& .MuiPaper-elevation5': {
      boxShadow: 'none',
    },
  }
})(Drawer)

const AppLayout = observer(() => {
  useEffect(() => {
    document.getElementById('preLoading')?.remove();
  }, [])

  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.AppLayout}>
      <StyledDrawer anchor="left" open={menuOpen} elevation={5} onClose={() => setMenuOpen(false)}>
        <Sidebar onClose={() => setMenuOpen(false)} />
      </StyledDrawer>

      <DesktopNav onMenuClick={() => setMenuOpen(true)} />

      <Header breadCrumb={history.location.pathname}/>

      <div className={styles.screen}>
        <Switch>
          <Route exact path={Path.main}>
            <Overview />
          </Route>
          <Route exact path={Path.fundraiser}>
            <Fundraiser />
          </Route>
          <Route exact path={Path.teams}>
            <Teams />
          </Route>
          <Route exact path={Path.students}>
            <Students />
          </Route>
          <Route exact path={Path.donations}>
            <Donations />
          </Route>
          <Route exact path={Path.fundraiserInviteLetter}>
            <PrintInviteLetter />
          </Route>
        </Switch>
      </div>
    </div>
  )
})

export default withRouter(AppLayout);
