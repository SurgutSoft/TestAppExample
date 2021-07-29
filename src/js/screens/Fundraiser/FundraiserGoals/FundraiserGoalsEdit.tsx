import React, {useState} from 'react';
import strings from '../../../../i18n/strings';
import {Button, Input} from "../../../components/common"
import {IFunsraiserGoals} from "../../../interfaces/IFundraisers";

import styles from './FundraiserGoals.module.scss';

interface IProps {
  data: IFunsraiserGoals;
  isLoading?: boolean;
  onSave: (data: IFunsraiserGoals) => void;
  onChangeViewMode: () => void;
}

export const FundraserGoalsEdit = ({data, isLoading, onSave, onChangeViewMode}: IProps) => {
  const [formData, setFormData] = useState(data);

  const handleEditFormData = (value: string | number, key: keyof IFunsraiserGoals) => {
    if (formData) {
      setFormData({...formData, [key]: value})
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className="contentTitle">
          {strings.fundraiser_goals.title}
        </div>
        <div>
          <Button onClick={onChangeViewMode}>{strings.buttons.cancel}</Button>
          <Button type="primary" onClick={() => onSave(formData)} loading={isLoading}>
            {strings.buttons.save}
          </Button>
        </div>
      </div>

      <div className={styles.flexWrapper}>
        <div className={styles.gridWrapper}>
          <Input
            className={styles.cardWrapper}
            width={150}
            value={formData.fundraising}
            placeholder={data.fundraising}
            onChange={(value) => handleEditFormData(value, 'fundraising')}
            label={strings.fundraiser_goals.fundraising_goal}
            endAdornment="$"
          />

          <Input
            className={styles.cardWrapper}
            width={140}
            value={formData.fundraisingPerMember}
            placeholder={data.fundraisingPerMember}
            onChange={(value) => handleEditFormData(value, 'fundraisingPerMember')}
            label={strings.fundraiser_goals.student_goal}
            endAdornment="$"
          />
        </div>

        <div className={styles.gridWrapper}>
          <Input
            className={styles.cardWrapper}
            width={150}
            value={formData.readingMins}
            placeholder={data.readingMins}
            onChange={(value) => handleEditFormData(value, 'readingMins')}
            label={strings.fundraiser_goals.reading_minutes}
            endAdornment="M"
          />

          <Input
            className={styles.cardWrapper}
            width={140}
            value={formData.readingMinsPerMember}
            placeholder={data.readingMinsPerMember}
            onChange={(value) => handleEditFormData(value, 'readingMinsPerMember')}
            label={strings.fundraiser_goals.minutes_per_student}
            endAdornment="M"
          />
        </div>

        <div className={styles.gridWrapper}>
          <Input
            className={styles.cardWrapper}
            width={140}
            value={formData.readingBooks}
            placeholder={data.readingBooks}
            onChange={(value) => handleEditFormData(value, 'readingBooks')}
            label={strings.fundraiser_goals.reading_books}
            endAdornment="B"
          />

          <Input
            className={styles.cardWrapper}
            width={140}
            value={formData.readingBooksPerMember}
            placeholder={data.readingBooksPerMember}
            onChange={(value) => handleEditFormData(value, 'readingBooksPerMember')}
            label={strings.fundraiser_goals.books_per_student}
            endAdornment="B"
          />
        </div>

        <div className={styles.gridWrapper}>
          <Input
            className={styles.cardWrapper}
            width={140}
            label={strings.fundraiser_goals.students_count}
          />
        </div>
      </div>
    </div>
  )
}