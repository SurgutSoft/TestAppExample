import React, {useState} from 'react';
import {Checkbox} from '../../../components/common';
import {ReactComponent as InfoIcon} from '../../../../images/icons/info.svg';
import {Event} from '../../../models/Event';
import {IFundraiserOptionFormData} from '../../../interfaces/IFundraisers';

import styles from './FundraiserOptions.module.scss';
import strings from '../../../../i18n/strings';

interface IProps {
  eventData: Event | undefined;
  onChange: (data: IFundraiserOptionFormData) => void;
}

export const FundraiserOptions = ({eventData, onChange}: IProps) => {
  const [formData, setFormData] = useState<IFundraiserOptionFormData>({
    hideComments: eventData?.hideComments || false,
    accessToDonationPage: eventData?.accessToDonationPage || false,
    showDonations: eventData?.showDonations || false,
    readingBooksEnabled: eventData?.readingBooksEnabled === 1,
  });

  const onHandleChangeOption = (key: keyof IFundraiserOptionFormData) => {
    setFormData(
      {
        ...formData,
        [key]: !formData[key]
      }
    )

    onChange({
      ...formData,
      [key]: !formData[key]
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className="contentTitle">
        {strings.fundraiser_options.fundraiser_view_options}
      </div>

      <div className={styles.rowWrapper}>
        <Checkbox checked={formData?.readingBooksEnabled} onChange={() => onHandleChangeOption('readingBooksEnabled')} />
        <span className={styles.text}>
          {strings.fundraiser_options.show_books_as_reading_goal}
        </span>
        <InfoIcon />
      </div>

      <div className={styles.rowWrapper}>
        <Checkbox checked={formData?.hideComments} onChange={() => onHandleChangeOption('hideComments')} />
        <span className={styles.text}>
          {strings.fundraiser_options.show_donor_messages_on_Donation_page}
        </span>
        <InfoIcon />
      </div>

      <div className={styles.rowWrapper}>
        <Checkbox checked={formData?.showDonations} onChange={() => onHandleChangeOption('showDonations')} />
        <span className={styles.text}>
          {strings.fundraiser_options.allow_students_to_see_raised_donations_of_teammates}
        </span>
        <InfoIcon />
      </div>

      <div className={styles.rowWrapper}>
        <Checkbox checked={formData?.accessToDonationPage} onChange={() => onHandleChangeOption('accessToDonationPage')} />
        <span className={styles.text}>
          {strings.fundraiser_options.allow_students_to_see_the_teammates_donation_pages}
        </span>
        <InfoIcon />
      </div>
    </div>
  )
}