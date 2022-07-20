import { computed, ref, watchEffect } from 'vue';

export enum LoginStateEnum {
  LOGINFORM = 'LoginForm',
  MobileForm = 'MobileForm',
  QRCODEFORM = 'QrCodeForm',
  REGISTERFORM = 'RegisterForm',
}

const currentState = ref(LoginStateEnum.LOGINFORM);

export function useLoginState() {
  const getLoginState = computed(() => currentState.value);

  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  function handleBackLogin() {
    currentState.value = LoginStateEnum.LOGINFORM;
  }

  return {
    getLoginState,
    setLoginState,
    handleBackLogin,
  };
}
