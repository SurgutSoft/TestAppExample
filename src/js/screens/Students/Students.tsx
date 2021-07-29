import React from 'react';
import strings from '../../../i18n/strings';
import TeamMembersStore from '../../store/TeamMembersStore';
import {Button, Input, Select} from '../../components/common';
import StudentsTable from './StudentsTable/StudentsTable';
import {ReactComponent as SearchIcon} from '../../../images/icons/search.svg';
import {ReactComponent as DownloadIcon} from '../../../images/icons/students/download.svg';
import {ReactComponent as AddIcon} from '../../../images/icons/students/add.svg';
import {ReactComponent as PeopleIcon} from '../../../images/icons/students/people.svg';

import styles from './Students.module.scss';
import {observer} from 'mobx-react-lite';
import {throttle} from 'lodash';
import {registrationType} from '../../consts/TeamMembers';
import TeamStore from '../../store/TeamStore';

const Students = observer(() => {
  return (
    <div className="screenWrapper">
      <div className="content">
        <div className="contentWrapper">
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div className={styles.titleWrapper}>
                <span className={styles.title}>{strings.students.title}</span>
                <span className={styles.titleDescription}>
                  {strings.formatString(strings.students.sub_title,
                    TeamMembersStore.data.length,
                    TeamMembersStore.getRegistredCount())}
                </span>
              </div>

              <div className={styles.headerControls}>
                <Button
                  border
                  width={120}
                  loading={TeamMembersStore.isExportLoading}
                  startIcon={!TeamMembersStore.isExportLoading ? <DownloadIcon fill={styles.downLoadIconColor} /> : <></>}
                  onClick={TeamMembersStore.exportTeamMembers}
                >
                  {strings.buttons.export}
                </Button>
                <Button border startIcon={<AddIcon />}>{strings.buttons.add}</Button>
                <Button type='primary' startIcon={<PeopleIcon />}>{strings.students.invite_btn}</Button>
              </div>
            </div>

            <div className={styles.filtersWrapper}>
              <Input
                startAdornment={<SearchIcon />}
                onChange={throttle(TeamMembersStore.handleChangeFilterByName, 100)}
                placeholder={strings.students.filters.search_by_name_email}
                width={'30%'}
              />

              <Select
                placeholder={strings.students.filters.registration_type}
                options={registrationType}
                label={strings.students.filters.registration_type}
                width={'20%'}
                value={TeamMembersStore.filterByRegistrationType}
                onChange={TeamMembersStore.handleChangeFilterByRegistrationType}
              />

              <Select
                label={strings.students.filters.team}
                options={TeamStore.getOptions()}
                onChange={TeamMembersStore.handleChangeFilterByTeamId}
                value={TeamMembersStore.filterByTeamId}
                width={'48%'}
              />
            </div>
          </div>
        </div>

        {TeamMembersStore.filteredData.length ? <StudentsTable /> : <></>}
      </div>
    </div>
  )
})

export default Students;
