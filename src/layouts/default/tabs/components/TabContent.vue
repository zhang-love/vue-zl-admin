<!--
 * @Author: ZLun
 * @Description: tab-content
-->
<template>
  <a-dropdown
    :trigger="[trigger]"
    :overlayClassName="prefixCls"
    v-model:visible="showMenu"
    :destroyPopupOnHide="true"
  >
    <span v-if="content">{{ content }}</span>
    <Icon icon="ion:chevron-down" v-else />
    <template #overlay>
      <a-menu>
        <template v-for="(item, index) in getContList" :key="item.icon">
          <a-menu-item @click="handleClickMenu(item)" :disabled="item.disabled">
            <Icon :icon="item.icon" />
            <span class="ml-1"> {{ item.text }} </span>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${index}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { DropMenu } from '@/components/application/typing';
  import Icon from '@/components/icon/Icon.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useTabsTore } from '@/store/modules/tabs';
  import { computed, nextTick, PropType, ref } from 'vue';
  import { RouteLocationNormalized, useRouter } from 'vue-router';

  const props = defineProps({
    trigger: {
      type: String,
      default: 'click',
    },
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null,
    },
    content: {
      type: String,
      default: '',
    },
    curPath: {
      type: String,
      default: '',
    },
    tabIndex: {
      type: Number,
      default: -1,
    },
  });

  const { prefixCls } = useDesign('tabs-content');
  const { t } = useI18n();
  const tabStore = useTabsTore();

  const showMenu = ref();
  const isCurrent = computed(() => props.curPath === props.tabItem.path);
  const affix = computed(() => props.tabItem.meta.affix);
  const tabList = computed(() => tabStore.getTabList);
  const tabListLen = computed(() => tabList.value.length);
  const getContList = computed(() => [
    {
      icon: 'ion:reload-sharp',
      callback: tabStore.refreshPage,
      text: t('layout.multipleTab.reload'),
      disabled: !isCurrent.value,
    },
    {
      icon: 'clarity:close-line',
      callback: tabStore.closeTab,
      text: t('layout.multipleTab.close'),
      divider: true,
      disabled: !!affix.value,
    },
    {
      icon: 'line-md:arrow-close-left',
      callback: tabStore.closeLeftTabs,
      text: t('layout.multipleTab.closeLeft'),
      divider: false,
      disabled: props.tabIndex === 0 || !isCurrent.value,
    },
    {
      icon: 'line-md:arrow-close-right',
      callback: tabStore.closeRightTabs,
      text: t('layout.multipleTab.closeRight'),
      divider: true,
      disabled: props.tabIndex === tabListLen.value - 1 || !isCurrent.value,
    },
    {
      icon: 'dashicons:align-center',
      callback: tabStore.closeOtherTabs,
      text: t('layout.multipleTab.closeOther'),
      divider: false,
      disabled: !isCurrent.value,
    },
    {
      icon: 'clarity:minus-line',
      callback: tabStore.closeAllTab,
      text: t('layout.multipleTab.closeAll'),
      divider: true,
    },
  ]);
  const router = useRouter();
  function handleClickMenu(item: DropMenu) {
    showMenu.value = false;
    nextTick(() => {
      if (!item?.callback) return;
      item?.callback(router, props.tabIndex);
    });
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-tabs-content';
  .@{prefix-cls}{
    .ant-dropdown-menu{
      &-title-content{
        display: flex;
      }
      .ant-menu-item-divider{
        margin: 4px 0;
      }
    }
  }
</style>
