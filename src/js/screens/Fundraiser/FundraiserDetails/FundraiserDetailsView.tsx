import React from 'react';
import {Button} from '../../../components/common';

import {Event} from '../../../models/Event';
import MediaContainer from '../../../components/MediaContainer/MediaContainer';
import {dayToEnd} from '../../../utils/common';

import {Divider} from '@material-ui/core';
import {ReactComponent as LocationIcon} from '../../../../images/icons/location.svg';
import {ReactComponent as EditIcon} from '../../../../images/icons/editPen.svg';
import {ReactComponent as PreviewIcon} from '../../../../images/icons/redirect.svg';
import styles from './FundraiserDetails.module.scss';
import strings from '../../../../i18n/strings';


interface IProps {
  eventData?: Event;
  onChangeViewMode: () => void;
}

const FundraiserDetails = ({eventData, onChangeViewMode}: IProps) => {
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.headerInfo}>
          <div className={styles.location}>
            <div className={styles.locationInfo}>
              <LocationIcon />
              <span>{eventData?.locationInfo}</span>
            </div>

            <div className={styles.btnWrapper}>
              <Button type="primary" onClick={onChangeViewMode} endIcon={<EditIcon />}>
                {strings.buttons.edit}
              </Button>
              <Button type="accent" endIcon={<PreviewIcon fill="white"/>}>
                {strings.buttons.preview}
              </Button>
            </div>
          </div>

          <span className={styles.name}>
            {eventData?.name}
          </span>

          <span className={styles.description}>
            There are&nbsp;
            <span className={styles.dayToEnd}>{`${eventData?.end && dayToEnd(eventData.end)} days left`}</span>&nbsp;
            in your fundraiser
          </span>
        </div>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.bodyWrapper}>
        <div className={styles.bodyTitle}>{strings.fundraiser_details.fundraiser_story}</div>
        <div className={styles.bodyText}>{eventData?.summary}</div>
      </div>

      <div className={styles.mediaWrapper}>
        <MediaContainer type="image" mode="view" url={eventData?.photo}/>
        <MediaContainer className={styles.videoWrapper} type="video" mode="view" url={eventData?.video} />
      </div>
    </>
  )
}

export default FundraiserDetails;