<!--
 * @Author: ZLun
 * @Description: search-model
-->
<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div :class="prefixCls">
        <div :class="`${prefixCls}-content`">
          <div :class="`${prefixCls}-input__wrapper`">
            <a-input @change="handleSearch" :class="`${prefixCls}-input`">
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
          </div>
          <div :class="`${prefixCls}-not-data`" v-show="getIsNotData">
            {{ t('component.app.searchNotData') }}
          </div>
          <ul :class="`${prefixCls}-list`" v-show="!getIsNotData">
            <li> xx </li>
          </ul>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { computed, ref } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { prefixCls } = useDesign('app-search-model');
  const { t } = useI18n();

  const getIsNotData = ref();

  const handleSearch = () => {};
</script>
<style lang="less">
  @prefix-cls:~ '@{namespace}-app-search-model';
  .@{prefix-cls} {
    position: absolute;
    display: none;
  }
</style>
