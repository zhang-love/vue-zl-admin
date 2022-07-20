import { LocaleType } from '#/config';

export interface DropMenu {
  onClick?: Fn;
  to?: string;
  icon?: string;
  event?: string | number;
  text: string;
  disabled?: boolean;
  divider?: boolean;
  callback?: Fn;
}

export interface MenuInfo {
  key: LocaleType;
}
