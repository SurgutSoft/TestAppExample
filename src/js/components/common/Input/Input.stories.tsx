import React, {useState} from 'react';
import {FOLDER_CONTROLS} from '../../../consts/storyBook';
import {Input} from './Input';

export default {
  title: `${FOLDER_CONTROLS}/Input`
};


export const Input_ = () => {
  return (
    <div className="storybookContainer" style={{width: 300}}>
      <Input label="Input label" size='small'/>
      
      <br /><br />

      <Input label="Input label"/>
    </div>
  )
}
