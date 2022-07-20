<!--
 * @Author: ZLun
 * @Description: notify
-->
<template>
  <div :class="getClass">
    <a-popover trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <template #content>
        <a-tabs>
          <a-tab-pane
            v-for="item in listData"
            :key="item.key"
            :tab="`${item.name}(${item.list.length})`"
          >
            <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
            <NoticeList :list="item.list" v-else />
          </a-tab-pane>
        </a-tabs>
      </template>
      <a-badge count="5" dot>
        <BellOutlined />
      </a-badge>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { useMessage } from '@/hooks/web/useMessage';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { computed, ref, unref } from 'vue';
  import { ListItem, tabListData } from './data';
  import NoticeList from './NoticeList.vue';
  const { prefixCls } = useDesign('header-notify');
  const { createMessage } = useMessage();

  const getClass = computed(() => [unref(prefixCls)]);

  const listData = ref(tabListData);

  function onNoticeClick(record: ListItem) {
    createMessage.success('你点击了通知，ID=' + record.id);
    // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
    record.titleDelete = !record.titleDelete;
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';
  .@{prefix-cls} {
    .ant-badge {
      font-size: 16px;
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
      .ant-badge-dot {
        top: 10px;
      }
    }
    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }
  }
</style>
