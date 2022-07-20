<!--
 * @Author: ZLun
 * @Description: login-form
-->
<template>
  <LoginFormTitle :title="t('sys.login.signInFormTitle')" />
  <a-form :model="formData">
    <a-form-item name="account" class="enter-x">
      <a-input
        v-model:value="formData.account"
        size="large"
        :placeholder="t('sys.login.userName')"
      />
    </a-form-item>
    <a-form-item name="password" class="enter-x">
      <a-input-password
        v-model:value="formData.password"
        size="large"
        :placeholder="t('sys.login.password')"
      />
    </a-form-item>
    <a-row class="enter-x">
      <a-col :span="12">
        <a-form-item>
          <a-checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="12" class="text-right">
        <a-form-item>
          <a-button type="link" size="small">
            {{ t('sys.login.forgetPassword') }}
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item class="enter-x">
      <a-button type="primary" size="large" block @click="handleLogin">
        {{ t('sys.login.loginButton') }}
      </a-button>
      <!-- <a-button size="large" class="mt-4" block>
        {{ t('sys.login.registerButton') }}
      </a-button> -->
    </a-form-item>
    <a-row class="enter-x">
      <a-col :xs="24" :md="8">
        <a-button block @click="setLoginState(LoginStateEnum.MobileForm)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </a-button>
      </a-col>
      <a-col :xs="24" :md="8" class="my-2 md:mx-1 md:my-0">
        <a-button block @click="setLoginState(LoginStateEnum.QRCODEFORM)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </a-button>
      </a-col>
      <a-col :xs="24" :md="7">
        <a-button block @click="setLoginState(LoginStateEnum.REGISTERFORM)">
          {{ t('sys.login.registerButton') }}
        </a-button>
      </a-col>
    </a-row>
    <a-divider>
      {{ t('sys.login.otherSignIn') }}
    </a-divider>
    <div class="flex justify-evenly" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import LoginFormTitle from '@/views/sys/login/LoginFormTitle.vue';
  import { reactive, ref } from 'vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { LoginStateEnum, useLoginState } from './useLogin';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  const formData = reactive({
    account: 'zlun',
    password: '123456',
  });

  const rememberMe = ref(false);
  const loading = ref(false);

  const { t } = useI18n();

  const userStore = useUserStore();

  const { notification, createErrorModal } = useMessage();

  const { prefixCls } = useDesign('login');

  const { setLoginState } = useLoginState();

  async function handleLogin() {
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        username: formData.account,
        password: formData.password,
      });
      if (true) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style lang="less"></style>
