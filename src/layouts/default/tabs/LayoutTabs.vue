<!--
 * @Author: ZLun
 * @Description: tabs
-->
<template>
  <div :class="prefixCls">
    <a-tabs
      type="editable-card"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="curPath"
      @change="handleChange"
    >
      <template v-for="(item, index) in getTabList" :key="item.path">
        <a-tab-pane>
          <template #tab>
            <TabContent
              trigger="contextmenu"
              :content="`${t(item.meta.title as string)}`"
              :tabIndex="index"
              :tabItem="item"
              :curPath="curPath"
            />
          </template>
        </a-tab-pane>
      </template>
      <template #rightExtra>
        <TabRedo />
        <TabContent :tabIndex="curIndex" :tabItem="getTabList[curIndex]" :curPath="curPath" />
        <FoldButton />
      </template>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import TabRedo from './components/TabRedo.vue';
  import { useGo } from '@/hooks/web/usePage';
  import TabContent from './components/TabContent.vue';
  import FoldButton from './components/FoldButton.vue';
  import { useLayoutTabs } from './useLayoutTabs';
  const { t } = useI18n();
  const { curPath, prefixCls, getTabList, curIndex } = useLayoutTabs();
  const go = useGo();

  const handleChange = (key: string) => {
    go(key, false);
  };
</script>
<style lang="less">
  @import './tabs.less';
</style>
