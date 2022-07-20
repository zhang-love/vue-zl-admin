<!--
 * @Author: ZLun
 * @Description: register
-->
<template>
  <div>
    <LoginFormTitle :title="t('sys.login.signUpFormTitle')" />
    <a-form class="p-4 enter-x">
      <a-form-item class="enter-x">
        <a-input
          class="fix-auto-fill"
          v-model:value="formData.account"
          size="large"
          :placeholder="t('sys.login.userName')"
        />
      </a-form-item>
      <a-form-item class="enter-x">
        <a-input
          class="fix-auto-fill"
          v-model:value="formData.mobile"
          size="large"
          :placeholder="t('sys.login.mobile')"
        />
      </a-form-item>
      <a-form-item class="enter-x">
        <CountdownInput
          v-model="formData.code"
          size="large"
          class="fix-auto-fill"
          :placeholder="t('sys.login.smsCode')"
        />
      </a-form-item>
      <a-form-item class="enter-x">
        <StrengthMeter
          size="large"
          :placeholder="t('sys.login.password')"
          v-model:value="formData.password"
        />
      </a-form-item>
      <a-form-item class="enter-x">
        <a-input-password
          v-model="formData.confirmPassword"
          size="large"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </a-form-item>
      <a-form-item class="enter-x">
        <a-checkbox v-model="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </a-checkbox>
      </a-form-item>
      <a-button
        class="enter-x"
        :loading="loading"
        type="primary"
        size="large"
        block
        @click="handleBackLogin"
      >
        {{ t('sys.login.registerButton') }}
      </a-button>
      <a-button size="large" class="enter-x mt-4" block @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import CountdownInput from '@/components/countdown/CountdownInput.vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useLoginState } from './useLogin';
  import StrengthMeter from '@/components/strengthmeter/StrengthMeter.vue';

  const { t } = useI18n();

  const loading = ref(false);

  const formData = reactive({
    account: '',
    mobile: '',
    code: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });

  const { handleBackLogin } = useLoginState();
</script>
<style lang="less" scoped></style>
