import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AppLayout from './components/navigation/AppLayout/AppLayout';
import userStore from './store/UserStore';
import {Path} from './consts/router';
import {ACCESS_TOKEN, ACCESS_TOKEN_URL_PARAM} from './consts/localStorage';
import OverviewStore from './store/OverviewStore';
import EventStore from './store/EventStore';
import TeamStore from './store/TeamStore';
import TeamMembersStore from './store/TeamMembersStore';


const App = observer(() => {
  const {user} = userStore;

  useEffect(() => {
    const url = new URL(window.location.href)
    const accessToken = url.searchParams.get(ACCESS_TOKEN_URL_PARAM);

    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken)
    }
    
    userStore.fetchData();
    OverviewStore.fetchItemsList();
    EventStore.fetchEventData();
    TeamStore.fetchItemsList();
    TeamMembersStore.fetchTeamMember();
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={{pathname: Path.main}} />} />

        {user && <AppLayout />}
      </Switch>
    </BrowserRouter>
  );
})

export default App;
