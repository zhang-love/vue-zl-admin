import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '@/settings/encryptionSetting';
import { getStorageShortName } from '../env';
import { createStorage as create, CreateStorageParams } from './storageCache';

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}) => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export function createStorage(storage: Storage, options: Options = {}) {
  return create(createOptions(storage, options));
}
export function createLocalStorage(options: Options = {}) {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
}

export function createSessionStorage(options: Options = {}) {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
}
