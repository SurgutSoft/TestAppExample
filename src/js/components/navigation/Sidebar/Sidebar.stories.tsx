import React, {useState} from 'react';
import Sidebar from './Sidebar'
import {FOLDER_APP} from '../../../consts/storyBook';

export default {
  title: `${FOLDER_APP}/Sidebar`
};


export const Sidebar_ = () => {

  return (
    <Sidebar onClose={() => 123}/>
  )
}