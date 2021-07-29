import React, {useState} from 'react';
import {FOLDER_CONTROLS} from '../../../consts/storyBook';
import {Checkbox} from './CheckBox';

export default {
  title: `${FOLDER_CONTROLS}/Checkbox`
};


export const CheckBox_ = () => {
  return (
    <div className="storybookContainer" style={{width: 300}}>
      <Checkbox />
    </div>
  )
}
