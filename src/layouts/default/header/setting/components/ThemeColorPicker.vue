<!--
 * @Author: ZLun
 * @Description: primary-color-picker
-->
<template>
  <div :class="prefixCls">
    <template v-for="item in colorList" :key="item">
      <span
        :class="[`${prefixCls}__item`, { [`${prefixCls}__item-active`]: def === item }]"
        :style="{ background: item }"
        @click="change(item)"
      >
        <CheckOutlined />
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { PropType } from 'vue';
  import { CheckOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    colorList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    change: {
      type: Function as PropType<Fn>,
      default: () => ({}),
    },
    def: {
      type: String,
      default: '',
    },
  });

  const { prefixCls } = useDesign('setting-theme-picker');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-theme-picker';
  .@{prefix-cls}{
    display: flex;
    justify-content: space-between;
    &__item{
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border: 1px solid #ddd;
      border-radius: 2px;
      cursor: pointer;
      .anticon svg{
        display: none;
      }
    }
    &__item-active{
      border: 1px solid @theme-color-active;
      .anticon svg{
        display: inline-block;
        font-size: 12px;
      }
    }
  }
</style>
