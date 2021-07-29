import React from 'react';
import {Button, InfoCard} from '../../../components/common';

import {ReactComponent as ClockIcon} from '../../../../images/icons/clock.svg';
import {ReactComponent as BookIcon} from '../../../../images/icons/book.svg';
import {ReactComponent as GroupIcon} from '../../../../images/icons/group.svg';
import {ReactComponent as EditIcon} from '../../../../images/icons/editPen.svg';
import styles from './FundraiserGoals.module.scss';
import {IFunsraiserGoals} from '../../../interfaces/IFundraisers';
import strings from '../../../../i18n/strings';

interface IProps {
  data: IFunsraiserGoals;
  onChangeViewMode: () => void;
}

export const FundraserGoalsView = ({data, onChangeViewMode}: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className="contentTitle">
          {strings.fundraiser_goals.title}
        </div>
        <Button type="primary" onClick={onChangeViewMode} endIcon={<EditIcon />}>
          {strings.buttons.edit}
        </Button>
      </div>

      <div className={styles.flexWrapper}>
        <div className={styles.gridWrapper}>
          <InfoCard
            className={styles.cardWrapper}
            title={`$${data.fundraising.toLocaleString()}`}
            description={strings.fundraiser_goals.fundraising_goal}
            titleColor='black'
          />

          <InfoCard
            className={styles.cardWrapper}
            title={`$${data.fundraisingPerMember.toLocaleString()}`}
            description={strings.fundraiser_goals.student_goal}
            titleColor='black'
          />
        </div>

        <div className={styles.gridWrapper}>
          <InfoCard
            className={styles.cardWrapper}
            title={data.readingMins.toLocaleString()}
            icon={<ClockIcon />}
            description={strings.fundraiser_goals.reading_minutes}
          />

          <InfoCard
            className={styles.cardWrapper}
            title={data.readingMinsPerMember.toLocaleString()}
            icon={<ClockIcon />}
            description={strings.fundraiser_goals.minutes_per_student}
          />
        </div>

        <div className={styles.gridWrapper}>
          <InfoCard
            className={styles.cardWrapper}
            title={data.readingBooks.toLocaleString()}
            icon={<BookIcon />}
            description={strings.fundraiser_goals.reading_books}
          />

          <InfoCard
            className={styles.cardWrapper}
            title={data.readingBooksPerMember.toLocaleString()}
            icon={<BookIcon />}
            description={strings.fundraiser_goals.books_per_student}
          />
        </div>

        <div className={styles.gridWrapper}>
          <InfoCard
            className={styles.cardWrapper}
            title="350"
            subTitle=" / 60%"

            icon={<GroupIcon />}
            description={strings.fundraiser_goals.participants_goal}
          />

          <InfoCard />
        </div>
      </div>
    </div>
  )
}