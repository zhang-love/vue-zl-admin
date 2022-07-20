import { UserInfo } from '#/store';
import { Api } from '@/api/api';
import { LoginParams, LoginResultModel } from '@/api/types';
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { PageEnum } from '@/enums/pageEnum';
import { RoleEnum } from '@/enums/roleEnum';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/basic';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { http } from '@/utils/http/axios';
import { defineStore } from 'pinia';
import { h } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { store } from '..';
import { usePermissionStore } from './permission';

interface UserState {
  token?: string;
  sessionTimeout: boolean;
  roleList: RoleEnum[];
  userInfo: Nullable<UserInfo>;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: undefined,
    sessionTimeout: false,
    roleList: [],
    userInfo: null,
    lastUpdateTime: 0,
  }),
  getters: {
    getToken(): string | undefined {
      return this.token || getAuthCache(TOKEN_KEY);
    },
    getSessionTimeout(): boolean {
      return this.sessionTimeout;
    },
    getRoleList(): RoleEnum[] {
      return this.roleList;
    },
    getUserInfo(): UserInfo | null {
      return this.userInfo;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
    },
    setSessionTimeout(timeout: boolean) {
      this.sessionTimeout = timeout;
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    async getUserInfoAction() {
      if (!this.getToken) return;
      const userInfo = await http.get(Api.GetUserInfo, {}, { errorMessageMode: 'none' });
      const { roles } = userInfo;
      if (Array.isArray(roles)) {
        const roleList = roles.map((item) => item.value);
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    async afterLoginAction() {
      if (!this.getToken) return null;
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.getSessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setIsDynamicAddedRoute(true);
        }
        router.replace(PageEnum.BASE_HOME);
      }
      return userInfo;
    },
    async login(loginParams: LoginParams) {
      const data = await http.post<LoginResultModel>(Api.LOGIN, { data: loginParams });
      const { token } = data;
      this.setToken(token);
      return this.afterLoginAction();
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        await http.get(Api.LOGOUT);
      }
      this.setToken('');
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      // router.replace(PageEnum.BASE_LOGIN);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    async confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
