import { RequestOptions, Result } from '#/axios';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { useGlobSetting } from '@/settings';
import { useUserStoreWithOut } from '@/store/modules/user';
import { deepMerge } from '@/utils';
import { getToken } from '@/utils/auth';
import { isString } from '@/utils/is';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { clone } from 'lodash-es';
import { VAxios } from './Axios';
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { checkStatus } from './checkStatus';

const globSetting = useGlobSetting();
const { urlPrefix, apiUrl } = globSetting;
const { createMessage, createErrorModal } = useMessage();

const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n();

    const { isTransformResponse, errorMessageMode } = options;
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    const { data } = res;
    if (!data) {
      throw new Error(t('sys.api.apiRequestFailed'));
    }

    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data;
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) return result;

    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT: {
        timeoutMsg = t('sys.api.timeoutMessage');
        const userStore = useUserStoreWithOut();
        userStore.setToken(undefined);
        userStore.logout(true);
        break;
      }
      default: {
        if (message) {
          timeoutMsg = message;
        }
      }
    }
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'));
  },
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { joinPrefix, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    return config;
  },
  requestInterceptors: (config: AxiosRequestConfig, options: CreateAxiosOptions) => {
    const token = getToken();
    if (token && (config as Recordable).requestOptions?.withToken !== false) {
      (config as Recordable).headers.authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch(error: any) {
    const { t } = useI18n();

    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = t('sys.api.apiTimeoutMessage');
    }
    if (err?.includes('Network Error')) {
      errMessage = t('sys.api.networkExceptionMsg');
    }

    if (errMessage) {
      if (errorMessageMode === 'modal') {
        createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
      } else if (errorMessageMode === 'message') {
        createMessage.error(errMessage);
      }
      return Promise.reject(error);
    }
    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 100 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  );
}

export const http = createAxios();
