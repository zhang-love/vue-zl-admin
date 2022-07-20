<!--
 * @Author: ZLun
 * @Description: svg-icon and iconify
-->
<template>
  <SvgIcon v-if="isSvgIcon" :name="getSvgIcon" :size="size" />
  <span v-else ref="elRef" class="app-iconify anticon" :style="getWrapStyle"></span>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, unref, watch } from 'vue';
  import Iconify from '@purge-icons/generated';
  import SvgIcon from './SvgIcon.vue';
  const SVG_END_WITH_FLAG = '|svg';

  const { icon, prefix, size, color } = defineProps({
    color: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 16,
    },
    prefix: {
      type: String,
      default: '',
    },
  });

  const isSvgIcon = computed(() => icon?.endsWith(SVG_END_WITH_FLAG));

  const getSvgIcon = computed(() => icon.replace(SVG_END_WITH_FLAG, ''));

  const getIconRef = computed(() => `${prefix ? prefix + ':' : ''}${icon}`);

  const getWrapStyle = computed(() => {
    return {
      fontSize: `${size}px`,
      color: color,
    };
  });

  const elRef = ref();

  const update = async () => {
    const el = unref(elRef);
    if (!el) return;

    await nextTick();
    const icon = unref(getIconRef);
    if (!icon) return;

    const svg = Iconify.renderSVG(icon, {});
    if (svg) {
      el.textContent = '';
      el.appendChild(svg);
    } else {
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      el.textContent = '';
      el.appendChild(span);
    }
  };

  watch(() => unref(icon), update, { flush: 'post' });

  onMounted(update);
</script>
<style lang="less" scoped>
  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    background-color: @iconify-bg-color;
    border-radius: 100%;
  }
  .app-iconify {
    display: flex;
    align-items: center;
  }
</style>
