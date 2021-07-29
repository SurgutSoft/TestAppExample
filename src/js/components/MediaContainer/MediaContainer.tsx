import React from 'react';
import EmptyMediaContent from './EmptyMediaContent';

import styles from './MediaContainer.module.scss';
import MediaUploader from './MediaUploader';

interface IProps {
  type: 'video' | 'image';
  mode: 'view' | 'edit';
  url?: string;
  className?: string;
  onUploadImage?: (FileList: FileList | null) => void;
  onUploadVideoUrl?: (url: string) => void;
  onCancel?: () => void;
}

const MediaContainer = ({type, mode, url, className, onUploadImage, onUploadVideoUrl, onCancel}: IProps) => {
  const getMedia = () => {
    if (type === 'video') {
      return (
        <iframe
          className={styles.commnStyles}
          title="video"
          src={url?.replace("watch?v=", "embed/")}
          allowFullScreen
        ></iframe>
      )
    } else {
      return <img className={styles.commnStyles} src={url} alt="img" />
    }
  }

  return (
    <div className={`${styles.mediaWrapper} ${className}`}>
      {url
        ? getMedia()
        : <EmptyMediaContent type={type} mode={mode} />}

      {mode === 'edit' &&
        <MediaUploader
          type={type}
          url={url}
          onUploadImage={onUploadImage}
          onUploadVideoUrl={onUploadVideoUrl}
          onCancel={onCancel}
        />
      }
    </div>
  )
}

export default MediaContainer;
