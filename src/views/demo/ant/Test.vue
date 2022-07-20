<template>
  <div id="t"></div>
</template>
<script lang="ts" setup>
  import { h, onMounted, reactive } from 'vue';
  onMounted(() => {
    const text = `
    <a-input v-model:value="xx">hello</a-input>
    `;
    const x = h(text);
    const t = document.querySelector('#t');
    let iframe = document.createElement('iframe');
    iframe.src = './index.vue';
    iframe.height = '500px';
    iframe.width = '100%';
    iframe.id = 'doc_iframe';
  });
  const form = reactive({
    fieldName: '',
  });
</script>
