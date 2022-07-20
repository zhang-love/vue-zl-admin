<!--
 * @Author: ZLun
 * @Description: icon-selector
-->
<template>
  <div>
    <span @click="showModal" class="cursor-pointer">{{ t('component.input.select') }}</span>
    <a-modal v-model:visible="visible">
      <div class="flex flex-wrap">
        <a-input v-model:value="filterValue" class="!w-1/2" />
        <template v-for="item in items" :key="item">
          <div
            class="icon-s flex flex-col items-center justify-center w-8 h-8"
            @click="selectIcon(item)"
          >
            <component :is="AntdIcons[item]" style="font-size: 22px" />
          </div>
        </template>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { computed, ref, unref } from 'vue';
  import * as AntdIcons from '@ant-design/icons-vue';
  const visible = ref<boolean>(false);
  const filterValue = ref<string>('');
  const { t } = useI18n();
  const emit = defineEmits(['select-icon']);
  const showModal = () => {
    visible.value = true;
  };

  const items = computed(() => {
    const icons = Object.keys(AntdIcons);
    icons.length = icons.length - 4;
    if (!unref(filterValue)) return icons;
    return icons.filter(
      (item) => item.toLocaleLowerCase().indexOf(unref(filterValue).toLocaleLowerCase()) >= 0,
    );
  });

  const handleOk = (e: MouseEvent) => {
    visible.value = false;
  };

  const selectIcon = (item: string) => {
    // const icon = `<${item}/>`;
    // copy(icon);
    emit('select-icon', item);
    visible.value = false;

    // message.success(`${item} ${t('component.icon.copy')}`);
  };
</script>
<style lang="less" scoped>
  .icon-s {
    &:hover {
      background: @iconify-bg-color;
      cursor: pointer;
    }
  }
</style>
