<!--
 * @Author: ZLun
 * @Description: type-pick
-->
<template>
  <div :class="prefixCls">
    <template v-for="item in menuTypeList" :key="item.title">
      <a-tooltip :title="item.title" placement="bottom">
        <div
          @click="handler(item)"
          :class="[
            `${prefixCls}__item`,
            `${prefixCls}__item--${item.type}`,
            {
              [`${prefixCls}__item--active`]: def === item.type,
            },
          ]"
        >
          <div class="mix-sidebar"></div>
        </div>
      </a-tooltip>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { computed, PropType } from 'vue';
  import { menuTypeList } from '../enum';
  defineProps({
    menuTypeList: {
      type: Array as PropType<typeof menuTypeList>,
      default: () => [],
    },
    handler: {
      type: Function as PropType<Fn>,
      default: () => ({}),
    },
    def: {
      type: String,
      default: '',
    },
  });
  const { prefixCls } = useDesign('setting-menu-type-picker');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-menu-type-picker';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;

    &__item {
      width: 56px;
      height: 48px;
      background: #f0f2f5;
      position: relative;
      border-radius: 4px;
      border: 2px solid #fff;
      cursor: pointer;
      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &--sidebar {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          height: 100%;
          width: 33%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }
        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 33%;
          background: #fff;
          border-radius: 0 4px 0 0;
        }
      }
      &--mix {
        &::before {
          width: 33%;
          height: 100%;
          background: #fff;
          border-radius: 0 0 0 4px;
        }
        &::after {
          width: 100%;
          height: 33%;
          z-index: 1;
          background-color: #273352;
          border-radius: 4px 4px 0 0;
        }
      }
      &--top-menu {
        &::before {
          top: 0;
          left: 0;
          width: 100%;
          height: 33%;
          background-color: #273352;
          border-radius: 4px 4px 0 0;
        }
      }
      &--mix-sidebar {
        &::before {
          left: 0;
          top: 0;
          width: 20%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }
      }
      &:hover,
      &--active {
        border: 2px solid @theme-color;
      }
    }
  }
</style>
