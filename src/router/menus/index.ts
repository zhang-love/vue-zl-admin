import { PermissionModeEnum } from '@/enums/appEnum';
import { useAppStoreWithOut } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { filter } from '@/utils/helper/treeHelper';
import { router } from '..';
import { getAllParentPath } from '../helper/menuHelper';
import { Menu } from '../types';

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectConfig.permissionMode;
};

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK;
};
const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};

async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu);
  }
  return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  return menus || [];
};

export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
  return shallowMenuList;
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus();
  const parent = menus.find((item) => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[];
  }
  return parent.children;
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  if (!menus) return;
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}
