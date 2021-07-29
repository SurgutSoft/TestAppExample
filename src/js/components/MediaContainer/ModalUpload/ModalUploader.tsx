import React, {useState} from 'react';
import {Modal} from "@material-ui/core";

import styles from './ModalUploader.module.scss';
import {Button, Input} from '../../common';
import strings from '../../../../i18n/strings';

interface IProps {
  type: "video" | 'image';
  open: boolean;
  url?: string;
  handleClose?: () => void;
  onCancel?: () => void;
  onUploadImage?: (FileList: FileList | null) => void;
  onUploadVideoUrl?: (url: string) => void;
}

const ModalUploader = ({type, open, url, handleClose, onUploadImage, onUploadVideoUrl, onCancel}: IProps) => {
  const [videoUrl, setVideoUrl] = useState('');
  const imageDescription = strings.fundraiser_details.modal_upload_image_description;
  const videoDescription = strings.fundraiser_details.modal_upload_video_description;

  const ImageModalFooterControls = () => (
    <>
      <Button onClick={handleClose}>{strings.buttons.cancel}</Button>
      {url && <Button onClick={() => 123} textColor='red'>{strings.buttons.delete}</Button>}
      {url
        ? <Button onUpload={onUploadImage}>{strings.buttons.change}</Button>
        : <Button uploader onUpload={onUploadImage}>{strings.buttons.upload}</Button>
      }
    </>
  )

  const onCancelChangeVideoUrl = () => {
    onCancel && onCancel();
    handleClose && handleClose();
  }

  const handleClickSaveVideo = () => {
    onUploadVideoUrl && onUploadVideoUrl(videoUrl)
    handleClose && handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.modalTitle}>
          {strings.formatString(strings.fundraiser_details.modal_upload_title, type)}
        </div>

        <div className={styles.modalDesctiption}>
          {type === 'video' ? videoDescription : imageDescription}
          {type === 'video' &&
            <Input
              label={strings.fundraiser_details.modal_upload_video_link}
              value={url}
              onChange={(value) => setVideoUrl(value)}
            />}
        </div>

        <div className={styles.footer}>
          {type === 'image'
            ? <ImageModalFooterControls />
            : (
              <>
                <Button onClick={onCancelChangeVideoUrl}>{strings.buttons.cancel}</Button>
                <Button onClick={handleClickSaveVideo}>{strings.buttons.save}</Button>
              </>
            )
          }
        </div>
      </div>
    </Modal>
  )
}

export default ModalUploader;
