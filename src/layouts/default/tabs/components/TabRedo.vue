<!--
 * @Author: ZLun
 * @Description: 
-->
<template>
  <span @click="handleRedo" :class="`${prefixCls}__extra-redo`">
    <RedoOutlined :spin="loading" />
  </span>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { useTabsTore } from '@/store/modules/tabs';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const tabStore = useTabsTore();
  const { prefixCls } = useDesign('layout-tabs');

  const loading = ref(false);

  const handleRedo = () => {
    loading.value = true;
    tabStore.refreshPage(router);
    setTimeout(() => {
      loading.value = false;
      // Animation execution time
    }, 1200);
  };
</script>
<style lang="less"></style>
