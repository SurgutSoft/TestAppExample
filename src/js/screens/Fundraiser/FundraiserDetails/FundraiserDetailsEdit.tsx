import React, {useState} from 'react';
import {Button, DatePicker, Input, Select, TextArea} from '../../../components/common';
import moment from 'moment';

import styles from './FundraiserDetails.module.scss';
import MediaContainer from '../../../components/MediaContainer/MediaContainer';
import {Event} from '../../../models/Event';
import {StateItems} from '../../../consts/stateItems';
import {getSelectOptions} from '../../../utils/common';
import strings from '../../../../i18n/strings';


interface IProps {
  onChangeViewMode: () => void;
  onUploadPhoto: (files: FileList | null) => void;
  onSave: (data?: Event) => void;
  isLoading?: boolean;
  eventData?: Event;
}

const FundraiserDetails = ({eventData, isLoading, onChangeViewMode, onUploadPhoto, onSave}: IProps) => {
  const [formData, setFormData] = useState<Event | undefined>(eventData);

  const handleEditFormData = (value: string | number, key: keyof Event) => {
    if (formData) {
      setFormData({...formData, [key]: value})
    }
  }

  const onCancelChangeVideoUrl = () => {
    setFormData({...formData!, 'video': eventData?.video})
  }

  const onHandleSave = async () => {
    await onSave(formData);
    onChangeViewMode.call({});
  };

  const onHandleChangeDate = (date: Date | null) => {
    setFormData({...formData!, end: +moment(date)})
  }

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.editedHeaderInfo}>
          <div className={styles.location}>
            <div className={styles.widthWrapper}>
              <Input
                label={strings.fundraiser_details.fundraiser_name}
                width='85%'
                value={formData?.name}
                onChange={(val) => handleEditFormData(val, 'name')}
              />
              <DatePicker
                className={styles.datePicker}
                value={moment(formData?.end)}
                label={strings.fundraiser_details.end_date}
                format="MM/dd/yyyy"
                onChange={(date) => onHandleChangeDate(date)}
              />
            </div>

            <div className={styles.btnWrapper}>
              <Button onClick={onChangeViewMode}>{strings.buttons.cancel}</Button>
              <Button type='primary' onClick={onHandleSave} loading={isLoading}>{strings.buttons.save}</Button>
            </div>
          </div>

          <div className={styles.location}>
            <Input
              label={strings.fundraiser_details.school_name}
              width='35%'
              value={formData?.schoolName}
              onChange={(val) => handleEditFormData(val, 'schoolName')}
            />

            <Select
              label={strings.fundraiser_details.us_state}
              options={getSelectOptions(StateItems)}
              width='20%'
              value={formData?.state}
              onChange={(e) => handleEditFormData(e.target.value, 'state')}
            />
            <Input
              label={strings.fundraiser_details.zip_code}
              width='10%'
              value={formData?.zip}
              onChange={(val) => handleEditFormData(val, 'zip')}
            />
            <Input
              label={strings.fundraiser_details.city}
              width='30%'
              value={formData?.city}
              onChange={(val) => handleEditFormData(val, 'city')}
            />
          </div>
        </div>
      </div>

      <div className={styles.editedBodyWrapper}>
        <TextArea
          label={strings.fundraiser_details.fundraiser_story}
          value={formData?.summary}
          onChange={(val) => handleEditFormData(val, 'summary')}
        />
      </div>

      <div className={styles.mediaWrapper}>
        <MediaContainer
          type="image"
          mode="edit"
          onUploadImage={onUploadPhoto}
          url={formData?.photo}
        />
        <MediaContainer
          className={styles.videoWrapper}
          type="video"
          mode="edit"
          onUploadVideoUrl={(val) => handleEditFormData(val, 'video')}
          url={formData?.video}
          onCancel={() => onCancelChangeVideoUrl()}
        />
      </div>
    </>
  )
}

export default FundraiserDetails;