import React from 'react';
import {MenuItem} from '@material-ui/core';
import {FOLDER_CONTROLS} from '../../../consts/storyBook';
import {ProfileMenu} from './ProfileMenu';

export default {
  title: `${FOLDER_CONTROLS}/ProfileMenu`
};

export const MenuProfile = () => (
  <ProfileMenu avatar="https://dev-rfms.pledgetree.com/assets/avatars/admins/20.png" name="Erin Ratner">
    <MenuItem>Account settings</MenuItem>
    <MenuItem>Billing settings</MenuItem>
    <MenuItem>Log out</MenuItem>
  </ProfileMenu>
)