<!--
 * @Author: ZLun
 * @Description: logo
-->
<template>
  <div :class="getAppLogoClass" @click="goHome">
    <img src="@/assets/images/logo.png" />
    <div :class="getTitleClass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ThemeEnum } from '@/enums/appEnum';
  import { PageEnum } from '@/enums/pageEnum';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useGo } from '@/hooks/web/usePage';
  import { useGlobSetting } from '@/settings/index';
  import { useMenuSetting } from '@/settings/useMenuSetting';
  import { computed, PropType, unref } from 'vue';

  const { title } = useGlobSetting();

  const props = defineProps({
    theme: {
      type: String as PropType<ThemeEnum>,
      default: ThemeEnum.LIGHT,
    },
  });

  const { prefixCls } = useDesign('app-logo');
  const go = useGo();

  const { getCollapsed } = useMenuSetting();
  const showTitle = computed(() => !unref(getCollapsed));

  const getAppLogoClass = computed(() => [
    prefixCls,
    `${prefixCls}-${props.theme}`,
    'collapse-title',
  ]);
  const getTitleClass = computed(() => [`${prefixCls}__title`]);

  const goHome = () => {
    go(PageEnum.BASE_HOME);
  };
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-app-logo';
  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    background-color: transparent;
    &-light {
      color: @theme-color;
    }
    &-dark {
      color: @white;
    }
    img {
      width: 48px;
    }
    &__title {
      font-weight: bold;
      font-size: 16px;
      transition: all 0.5s;
      margin-left: 0.6rem;
    }
  }
</style>
