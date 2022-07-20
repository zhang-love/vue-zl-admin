<!--
 * @Author: ZLun
 * @Description: mobile login
-->
<template>
  <div>
    <LoginFormTitle :title="t('sys.login.mobileSignInFormTitle')" class="enter-x" />
    <a-form>
      <a-form-item class="enter-x">
        <a-input
          :placeholder="t('sys.login.mobile')"
          v-model:value="formData.phone"
          size="large"
          class="fix-auto-fill"
      /></a-form-item>
      <a-form-item class="enter-x">
        <CountdownInput
          v-model:value="formData.code"
          size="large"
          class="countdown fix-auto-fill"
          :placeholder="t('sys.login.smsCode')"
        />
      </a-form-item>
      <a-form-item class="enter-x">
        <a-button type="primary" size="large" block @click="handleBackLogin">
          {{ t('sys.login.loginButton') }}
        </a-button>
        <a-button size="large" class="mt-4" block @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import LoginFormTitle from '@/views/sys/login/LoginFormTitle.vue';
  import { reactive } from 'vue';
  import { useLoginState } from './useLogin';
  import CountdownInput from '@/components/countdown/CountdownInput.vue';

  const { t } = useI18n();

  const formData = reactive({
    phone: '',
    code: '',
  });

  const { handleBackLogin } = useLoginState();
</script>
<style lang="less"></style>
