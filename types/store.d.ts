import { RoleInfo } from '@/api/sys/model/userModel';

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}
export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
