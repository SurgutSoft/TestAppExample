import React, {useState} from 'react';
import {FOLDER_CONTROLS} from '../../../consts/storyBook';
import {Button} from './Button';
import {ReactComponent as EditIcon} from '../../../../images/icons/editPen.svg'

export default {
  title: `${FOLDER_CONTROLS}/Button`
};


export const Button_ = () => {
  return (
    <div className="storybookContainer" style={{width: 300}}>
      <Button type='primary'>
        primary <EditIcon />
      </Button>

      <br /><br />

      <Button type='accent'>
        accent <EditIcon />
      </Button>

      <br /><br />

      <Button type='default'>
        default
      </Button>

      <br /><br />

      <Button type='link'>
        link
      </Button>
    </div>
  )
}
