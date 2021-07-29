import {observer} from 'mobx-react-lite';
import React from 'react';
import strings from "../../../../i18n/strings";
import TeamMembersStore from '../../../store/TeamMembersStore';
import {SortColEnum, SortDirectionEnum} from '../../../consts/TeamMembers';
import moment from 'moment';
import {Menu, MenuItem} from '@material-ui/core';
import {ReactComponent as SortIcon} from '../../../../images/icons/sort.svg';
import {ReactComponent as MoreIcon} from '../../../../images/icons/more.svg';

import styles from './StudentsTable.module.scss';

const StudentsTable = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    TeamMembersStore.selectIdMember(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getActiveSortColumnStyle = (column: SortColEnum) => {
    return TeamMembersStore.activeSortCol === SortColEnum[column]
      ? styles.activeSortCol : ''
  }

  return (
    <>
      <table className="tableWithHover">
        <thead>
          <tr>
            <th></th>
            <th>{strings.students.table_columns.name}</th>

            <th
              className={`${styles.sortCol} ${getActiveSortColumnStyle(SortColEnum.ACTIVE_AT)}`}
              onClick={() => TeamMembersStore.setActiveSortCol(SortColEnum.ACTIVE_AT)}
            >
              <div className={styles.flexWrapper}>
                <span>{strings.students.table_columns.active_at}</span>

                <div hidden={!(TeamMembersStore.activeSortCol && TeamMembersStore.activeSortCol === SortColEnum.ACTIVE_AT)}>
                  <SortIcon className={
                    TeamMembersStore.sortDirection === SortDirectionEnum.ASCENDING
                      ? styles.sortDirection
                      : ''
                  }
                  />
                </div>
              </div>
            </th>

            <th className={`${styles.sortCol} ${getActiveSortColumnStyle(SortColEnum.GRADE)}`}
              onClick={() => TeamMembersStore.setActiveSortCol(SortColEnum.GRADE)}
            >
              <div className={styles.flexWrapper}>
                <span>{strings.students.table_columns.grade}</span>

                <div hidden={!(TeamMembersStore.activeSortCol && TeamMembersStore.activeSortCol === SortColEnum.GRADE)}>
                  <SortIcon className={
                    TeamMembersStore.sortDirection === SortDirectionEnum.ASCENDING
                      ? styles.sortDirection
                      : ''
                  }
                  />
                </div>
              </div>
            </th>

            <th className={`${styles.sortCol} ${getActiveSortColumnStyle(SortColEnum.MINUTES)}`}
              onClick={() => TeamMembersStore.setActiveSortCol(SortColEnum.MINUTES)}
            >
              <div className={styles.flexWrapper}>
                <span>{strings.students.table_columns.minutes}</span>

                <div hidden={!(TeamMembersStore.activeSortCol && TeamMembersStore.activeSortCol === SortColEnum.MINUTES)}>
                  <SortIcon className={
                    TeamMembersStore.sortDirection === SortDirectionEnum.ASCENDING
                      ? styles.sortDirection
                      : ''
                  }
                  />
                </div>
              </div>
            </th>

            <th className={`${styles.sortCol} ${getActiveSortColumnStyle(SortColEnum.BOOKS)}`}
              onClick={() => TeamMembersStore.setActiveSortCol(SortColEnum.BOOKS)}
            >
              <div className={styles.flexWrapper}>
                <span>{strings.students.table_columns.books}</span>

                <div hidden={!(TeamMembersStore.activeSortCol && TeamMembersStore.activeSortCol === SortColEnum.BOOKS)}>
                  <SortIcon className={
                    TeamMembersStore.sortDirection === SortDirectionEnum.ASCENDING
                      ? styles.sortDirection
                      : ''
                  }
                  />
                </div>
              </div>
            </th>

            <th className={`${styles.donationCol} ${getActiveSortColumnStyle(SortColEnum.DONATIONS)}`}
              onClick={() => TeamMembersStore.setActiveSortCol(SortColEnum.DONATIONS)}
            >
              <span>{strings.students.table_columns.donations}</span>
            </th>

            <th className={styles.actionCol}>
              <div hidden={!(TeamMembersStore.activeSortCol && TeamMembersStore.activeSortCol === SortColEnum.DONATIONS)}>
                <SortIcon className={
                  TeamMembersStore.sortDirection === SortDirectionEnum.ASCENDING
                    ? styles.sortDirection
                    : ''
                }
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {TeamMembersStore.filteredData?.map(item => (
            <tr key={item.id}>
              <td>
                <div className={styles.avatarWrapper}>
                  {item.user.avatar && <img src={item.user.avatar} alt='avatar' />}
                </div>
              </td>

              <td className={styles.nameCol}>
                {`${item.user.firstName} ${item.user.lastName} ${!item.user.email ? '(M)' : ''}`}
              </td>

              <td className={`
              ${item.user.activeAt && moment(new Date()).diff(item.user.activeAt, 'days') < 1 ? styles.greenColor : ''}
              ${getActiveSortColumnStyle(SortColEnum.ACTIVE_AT)}
            `}>
                {item.user.activeAt ? moment(item.user.activeAt).fromNow() : 'No activity'}
              </td>

              <td className={`
              ${getActiveSortColumnStyle(SortColEnum.GRADE)}
            `}>
                {item.team.gradeDisplay}
              </td>

              <td className={`
              ${item.progress.minsSum === 0 ? styles.grayColor : ''}
              ${getActiveSortColumnStyle(SortColEnum.MINUTES)}
            `}>
                {item.progress.minsSum?.toLocaleString()}
              </td>

              <td className={`
              ${item.progress.booksSum === 0 ? styles.grayColor : ''}
              ${getActiveSortColumnStyle(SortColEnum.BOOKS)}
            `}>
                {item.progress.booksSum?.toLocaleString()}
              </td>

              <td className={`
              ${item.progress.raisedSum === 0 ? styles.grayColor : ''}
              ${getActiveSortColumnStyle(SortColEnum.DONATIONS)}`
              }>
                {`$${item.progress.raisedSum?.toLocaleString()}`}
              </td>

              <td className={styles.actionCell}>
                <MoreIcon onClick={(e) => handleClick(e, item.user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*need refactor later*/}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div onClick={handleClose}>
          <MenuItem onClick={TeamMembersStore.deleteTeamMember}>{strings.buttons.delete}</MenuItem>
        </div>
      </Menu>
    </>
  )
})

export default StudentsTable;
