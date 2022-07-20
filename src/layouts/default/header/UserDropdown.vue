<!--
 * @Author: ZLun
 * @Description: dropdown
-->
<template>
  <a-dropdown :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls]">
      <img :src="getUserInfo?.avatar" />
      <span :class="`${prefixCls}__name`">
        {{ getUserInfo?.realName }}
      </span>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="handleLoginOut">
          <template #icon>
            <Icon icon="ion:power-outline" />
          </template>
          {{ t('layout.header.dropdownItemLoginOut') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { useUserStore } from '@/store/modules/user';
  import Icon from '@/components/icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { prefixCls } = useDesign('header-user-dropdown');

  const userStore = useUserStore();
  const { t } = useI18n();

  const getUserInfo = userStore.getUserInfo;

  function handleLoginOut() {
    userStore.confirmLoginOut();
  }
</script>
<style lang="less">
  @prefix-cls:~'@{namespace}-header-user-dropdown';
  .@{prefix-cls}{
    display: flex;
    align-items: center;
    padding: 0 10px;
    img{
      width: 24px;
      height: 24px;
      margin-right: 12px;
      border-radius: 50%;
    }
    &__name{
      font-size: 14px;
    }
  }
</style>
