<!--
 * @Author: ZLun
 * @Description: strength-meter
-->
<template>
  <div :class="prefixCls">
    <a-input-password v-bind="$attrs" v-model:value="innerValue" allowClear />
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { zxcvbn } from '@zxcvbn-ts/core';
  import { useDesign } from '@/hooks/web/useDesign';
  import { watch } from 'fs';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:value']);

  const innerValue = computed({
    get() {
      return props.value;
    },
    set(val) {
      emit('update:value', val);
    },
  });

  const { prefixCls } = useDesign('strength-meter');

  const getPasswordStrength = computed(() => {
    if (props.disabled || unref(innerValue as unknown as string).length === 0) return -1;
    return zxcvbn(innerValue.value as unknown as string).score ?? 1;
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-strength-meter';

  .@{prefix-cls} {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      background-color: @disabled-color;
      border-radius: 6px;

      &::before,
      &::after {
        position: absolute;
        z-index: 10;
        display: block;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-color: @white;
        border-style: solid;
        border-width: 0 5px;
        content: '';
      }

      &::before {
        left: 20%;
      }

      &::after {
        right: 20%;
      }

      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        background-color: transparent;
        border-radius: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;

        &[data-score='0'] {
          width: 20%;
          background-color: darken(@error-color, 10%);
        }

        &[data-score='1'] {
          width: 40%;
          background-color: @error-color;
        }

        &[data-score='2'] {
          width: 60%;
          background-color: @warning-color;
        }

        &[data-score='3'] {
          width: 80%;
          background-color: fade(@success-color, 50%);
        }

        &[data-score='4'] {
          width: 100%;
          background-color: @success-color;
        }
      }
    }
  }
</style>
