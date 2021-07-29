import {observer} from "mobx-react-lite";
import React from 'react';
import strings from "../../../../i18n/strings";
import Avatar from '@material-ui/core/Avatar';
import TeamStore from "../../../store/TeamStore";
import {SortTeamColsEnum, SortDirectionEnum} from "../../../consts/TeamMembers";
import {ReactComponent as MoreIcon} from '../../../../images/icons/more.svg';
import {ReactComponent as SortIcon} from '../../../../images/icons/sort.svg';

import styles from "./TeamsTable.module.scss";
import {getAvatarBgColorByName} from "../../../utils/common";

const TeamsTable = observer(() => {
  const getActiveSortColumnStyle = (column: SortTeamColsEnum) => {
    return TeamStore.activeSortCol === SortTeamColsEnum[column]
      ? styles.activeSortCol : ''
  }

  return (
    <table className="tableWithHover">
      <thead>
        <tr>
          <th
            className={styles.teamLeadNameColumn}
            onClick={() => TeamStore.setActiveSortCol(SortTeamColsEnum.STUDENTS_COUNT)}
          >
            <div>{strings.teams.table_columns.name}</div>
          </th>

          <th
            className={`${styles.registredCountColumn} ${getActiveSortColumnStyle(SortTeamColsEnum.STUDENTS_COUNT)}`}
            onClick={() => TeamStore.setActiveSortCol(SortTeamColsEnum.STUDENTS_COUNT)}
          >
            <div className={styles.flexWrapper}>
              <span>{strings.teams.table_columns.registredCount}</span>

              <div hidden={!(TeamStore.activeSortCol && TeamStore.activeSortCol === SortTeamColsEnum.STUDENTS_COUNT)}>
                <SortIcon className={
                  TeamStore.sortDirection === SortDirectionEnum.ASCENDING
                    ? styles.sortDirection
                    : ''
                }
                />
              </div>
            </div>
          </th>

          <th
            className={`${styles.sortCol} ${getActiveSortColumnStyle(SortTeamColsEnum.GRADE)}`}
            onClick={() => TeamStore.setActiveSortCol(SortTeamColsEnum.GRADE)}
          >
            <div className={styles.flexWrapper}>
              <span>{strings.teams.table_columns.grade}</span>

              <div hidden={!(TeamStore.activeSortCol && TeamStore.activeSortCol === SortTeamColsEnum.GRADE)}>
                <SortIcon className={
                  TeamStore.sortDirection === SortDirectionEnum.ASCENDING
                    ? styles.sortDirection
                    : ''
                }
                />
              </div>
            </div>
          </th>

          <th
            className={`${styles.sortCol} ${getActiveSortColumnStyle(SortTeamColsEnum.MINUTES)}`}
            onClick={() => TeamStore.setActiveSortCol(SortTeamColsEnum.MINUTES)}
          >
            <div className={styles.flexWrapper}>
              <span>{strings.teams.table_columns.minutes}</span>

              <div hidden={!(TeamStore.activeSortCol && TeamStore.activeSortCol === SortTeamColsEnum.MINUTES)}>
                <SortIcon className={
                  TeamStore.sortDirection === SortDirectionEnum.ASCENDING
                    ? styles.sortDirection
                    : ''
                }
                />
              </div>
            </div>
          </th>

          <th
            className={`${styles.sortCol} ${getActiveSortColumnStyle(SortTeamColsEnum.BOOKS)}`}
            onClick={() => TeamStore.setActiveSortCol(SortTeamColsEnum.BOOKS)}
          >
            <div className={styles.flexWrapper}>
              <span>{strings.teams.table_columns.books}</span>

              <div hidden={!(TeamStore.activeSortCol && TeamStore.activeSortCol === SortTeamColsEnum.BOOKS)}>
                <SortIcon className={
                  TeamStore.sortDirection === SortDirectionEnum.ASCENDING
                    ? styles.sortDirection
                    : ''
                }
                />
              </div>
            </div>
          </th>

          <th
            className={`${styles.donationCol} ${getActiveSortColumnStyle(SortTeamColsEnum.DONATIONS)}`}
            onClick={() => TeamStore.setActiveSortCol(SortTeamColsEnum.DONATIONS)}
          >
            <span>{strings.teams.table_columns.donations}</span>
          </th>

          <th className={styles.actionCol}>
            <div hidden={!(TeamStore.activeSortCol && TeamStore.activeSortCol === SortTeamColsEnum.DONATIONS)}>
              <SortIcon className={
                TeamStore.sortDirection === SortDirectionEnum.ASCENDING
                  ? styles.sortDirection
                  : ''
              }
              />
            </div>
          </th>
        </tr>

      </thead>

      <tbody>
        {TeamStore.items?.map(item => (
          <tr key={item.id}>
            <td className={styles.teamLeadNameCell}>
              <Avatar style={{backgroundColor: getAvatarBgColorByName(item.owner.firstName)}}>
                {`${item.owner.firstName.substr(0, 1).toUpperCase()}${item.owner?.lastName?.substr(0, 1).toUpperCase() || ''}`}
              </Avatar>

              <div className={styles.nameWrapper}>
                <span className={styles.name}>
                  {`${item.owner.firstName} ${item.owner.lastName || ''}`}
                </span>

                <span className={styles.email}>
                  {item.owner.email}
                </span>
              </div>
            </td>

            <td className={getActiveSortColumnStyle(SortTeamColsEnum.STUDENTS_COUNT)}>{`${item.size} / ${item.targetSize}`}</td>

            <td className={getActiveSortColumnStyle(SortTeamColsEnum.GRADE)}>
              {item.gradeDisplay}
            </td>

            <td className={`              
              ${item.progress.minsSum === 0 ? styles.grayColor : ''}
              ${getActiveSortColumnStyle(SortTeamColsEnum.MINUTES)}
            `}>
              {item.progress.minsSum}
            </td>

            <td className={`
              ${item.progress.minsSum === 0 ? styles.grayColor : ''}
              ${getActiveSortColumnStyle(SortTeamColsEnum.BOOKS)}
            `}>
              {item.progress.booksSum}
            </td>

            <td className={`
              ${item.progress.minsSum === 0 ? styles.grayColor : ''}
              ${getActiveSortColumnStyle(SortTeamColsEnum.DONATIONS)}
            `}>
              {`$${item.progress.raisedSum}`}
            </td>

            <td className={styles.actionCell}>
              <MoreIcon onClick={(e) => 123} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})

export default TeamsTable;
