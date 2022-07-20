<!--
 * @Author: ZLun
 * @Description: qr-code-form
-->
<template>
  <div>
    <LoginFormTitle :title="t('sys.login.qrSignInFormTitle')" />
    <div>
      <QrCode
        :value="qrCodeUrl"
        class="enter-x flex justify-center xl:justify-start"
        :width="280"
      />
      <a-divider class="enter-x">{{ t('sys.login.scanSign') }}</a-divider>
      <a-button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import LoginFormTitle from '@/views/sys/login/LoginFormTitle.vue';
  import QrCode from '@/components/qr/QrCode.vue';
  import { useLoginState } from './useLogin';

  const { t } = useI18n();

  const qrCodeUrl = 'https://vvbin.cn/next/login';

  const { handleBackLogin } = useLoginState();
</script>
<style lang="less" scoped></style>
