import { cacheCipher } from '@/settings/encryptionSetting';
import { AesEncryption } from '../cipher';
import { isNullOrUnDef } from '../is';
import type { EncryptionParams } from '@/utils/cipher';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = false,
}: Partial<CreateStorageParams>) => {
  const encryption = new AesEncryption({ key, iv });

  class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private hasEncrypt: boolean;
    private encryption: AesEncryption;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? Date.now() + expire * 1000 : null,
      });

      const stringValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
      this.storage.setItem(this.getKey(key), stringValue);
    }

    get(key: string, def: any = null) {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value } = data;
        return value;
      } catch (e) {
        return def;
      }
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }
  }

  return new WebStorage();
};
