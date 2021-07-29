import moment from "moment";

import styles from './common.module.scss';

export const dayToEnd = (end: number) => {
  return moment(end).diff(moment(new Date()), 'days');
}

export const getSelectOptions = (options: string[]): {value: string, label: string}[] => {
  return options.map(item => {
    return {
      value: item,
      label: item
    }
  })
}

// from A - 65 ASCI code  to Z - 91 ASCI code
export const getAvatarBgColorByName = (name: string) => {
  const symbol = name.toUpperCase().charCodeAt(0);
  switch (true) {
    case symbol > 65 && symbol <= 70: return styles.blueBgAvatar;
    case symbol > 71 && symbol <= 75: return styles.redBgAvatar;
    case symbol > 76 && symbol <= 80: return styles.purpleBgAvatar;
    case symbol > 81 && symbol <= 85: return styles.darkBluBgAvatar;
    case symbol > 86 && symbol <= 91: return styles.greenBgAvatar;

    default: return styles.default;
  }
}
