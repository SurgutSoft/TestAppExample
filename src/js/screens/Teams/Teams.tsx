import React from 'react';
import {observer} from 'mobx-react-lite';
import TeamStore from '../../store/TeamStore';
import TeamsTable from './TeamsTable/TeamsTable';
import strings from '../../../i18n/strings';
import {Button} from '../../components/common';
import {ReactComponent as GroupPlusIcon} from '../../../images/icons/groupPlus.svg';

import styles from './Teams.module.scss';

const Teams = observer(() => {
  return (
    <div className="screenWrapper">
      <div className="content">
        <div className="contentWrapper">
          <div className={styles.headerWrapper}>
            <div className={styles.pageTitleWrapper}>
              <span className={styles.title}>{strings.teams.title}</span>
              <span className={styles.subTitle}>{strings.teams.sub_title}</span>
            </div>

            <Button type="primary" startIcon={<GroupPlusIcon />}>
              {strings.teams.create_btn}
            </Button>
          </div>
        </div>

        {/* TODO add no data component */}
        {TeamStore.items.length ? <TeamsTable /> : <></>}
      </div>
    </div>
  )
})

export default Teams;
