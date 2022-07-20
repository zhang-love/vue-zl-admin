import type { RouteLocationNormalized } from 'vue-router';

import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  LAYOUT_TABS_KEY,
} from '@/enums/cacheEnum';
import { UserInfo } from '#/store';
import { ProjectConfig } from '#/config';
import { createLocalStorage, createSessionStorage } from '.';
import { toRaw } from 'vue';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [LAYOUT_TABS_KEY]: RouteLocationNormalized[];
}

type LocalStore = BasicStore;
export type SessionStore = BasicStore;

export type LocalKeys = keyof LocalStore;
export type SessionKeys = keyof SessionStore;

export type BasicKeys = keyof BasicStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return ls.get(key) as Nullable<T>;
  }
  static getSession<T>(key: LocalKeys) {
    return ss.get(key) as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = true) {
    ls.set(key, toRaw(value));
  }
  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false) {
    ss.set(key, value);
  }

  static removeLocal(key: LocalKeys, immediate = false) {
    ls.remove(key);
  }
}
