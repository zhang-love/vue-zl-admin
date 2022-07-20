import { PermissionModeEnum, ThemeEnum } from '@/enums/appEnum';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import { MenuModeEnum, MenuSplitTyeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { primaryColor } from 'build/config/themeConfig';
import { HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from './designSetting';

export default {
  themeColor: primaryColor,
  showDarkModeToggle: true,
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  permissionCacheType: CacheTypeEnum.LOCAL,
  showLogo: true,
  theme: ThemeEnum.LIGHT,
  menuSetting: {
    collapsedWidth: '48px',
    menuWidth: '210px',
    splitType: MenuSplitTyeEnum.LEFT,
    mode: MenuModeEnum.INLINE,
    collapsed: false,
    show: true,
    theme: ThemeEnum.LIGHT,
    type: MenuTypeEnum.SIDEBAR,
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
  },
  headerSetting: {
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    show: true,
  },
};
