import React from 'react';
import strings from '../../../i18n/strings';

import {ReactComponent as ImageIcon} from '../../../images/icons/image.svg';
import {ReactComponent as VideoIcon} from '../../../images/icons/video.svg';
import styles from './MediaContainer.module.scss';

interface IProps {
  type: 'image' | 'video';
  mode: 'view' | 'edit';
}

const EmptyMediaContent = ({type, mode}: IProps) => {

  return (
    <div className={styles.emptyWrapper}>
      {type === 'video'
        ? <VideoIcon />
        : <ImageIcon />
      }

      {mode !== 'edit' &&
        <span className={styles.noText}>
          {type === 'video'
            ? strings.fundraiser_details.no_video
            : strings.fundraiser_details.no_image
          }
        </span>
      }
    </div>
  )
}

export default EmptyMediaContent;
