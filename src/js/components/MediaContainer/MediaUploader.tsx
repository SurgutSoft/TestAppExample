import React, {useState} from 'react';
import {Button} from '../../components/common';

import {ReactComponent as EditIcon} from '../../../images/icons/editPen.svg';
import styles from './MediaContainer.module.scss';
import ModalUploader from './ModalUpload/ModalUploader';

interface IProps {
  type: 'video' | 'image';
  url?: string;
  onUploadImage?: (FileList: FileList | null) => void;
  onUploadVideoUrl?: (url: string) => void;
  onCancel?: () => void;
}

const MediaUploader = ({type, url, onUploadImage, onUploadVideoUrl, onCancel}: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mediaUploader}>
      {type === 'video'
        ? (
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            componentType='iconButton'
          >
            <EditIcon />
          </Button>
        )
        : (
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            onUpload={onUploadImage}
            componentType='iconButton'
            size='small'
          >
            <EditIcon />
          </Button>
        )
      }

      <ModalUploader
        open={open}
        type={type}
        url={url}
        handleClose={() => setOpen(false)}
        onUploadImage={onUploadImage}
        onUploadVideoUrl={onUploadVideoUrl}
        onCancel={onCancel}
      />
    </div>
  )
}

export default MediaUploader;
