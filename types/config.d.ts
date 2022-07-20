import { ThemeEnum } from '@/enums/appEnum';
import { MenuSplitTyeEnum } from '@/enums/menuEnum';
import { ThemeEnum } from 'build/config/themeConfig';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  bgColor: string;
  fixed?: boolean;
  collapsed: boolean;
  canDrag?: boolean;
  show: boolean;
  hidden?: boolean;
  splitType: MenuSplitTyeEnum;
  menuWidth: number | string;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign?: 'start' | 'center' | 'end';
  trigger?: TriggerEnum;
  accordion?: boolean;
  closeMixSidebarOnChange?: boolean;
  collapsedShowTitle?: boolean;
  mixSideTrigger?: MixSidebarTriggerEnum;
  mixSideFixed?: boolean;
  collapsedWidth: string;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface HeaderSetting {
  show: boolean;
  bgColor: string;
  theme: ThemeEnum;
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  // Whether to show the configuration button
  // showSettingButton: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  // settingButtonPosition: SettingButtonPositionEnum;
  // Permission mode
  permissionMode: PermissionModeEnum;
  // Session timeout processing
  // sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // Website gray mode, open for possible mourning dates
  // grayMode: boolean;
  // Whether to turn on the color weak mode
  // colorWeak: boolean;
  // Theme color
  themeColor: string;
  theme: ThemeEnum;

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  // fullContent: boolean;
  // content width
  // contentMode: ContentEnum;
  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  // showFooter: boolean;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  // multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  // transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive
  // openKeepAlive: boolean;
  // Lock screen time
  // lockTime: number;
  // Show breadcrumbs
  // showBreadCrumb: boolean;
  // Show breadcrumb icon
  // showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  // useErrorHandle: boolean;
  // Whether to open back to top
  // useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  // canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  // closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // removeAllHttpPending: boolean;
}
