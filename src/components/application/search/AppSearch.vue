<!--
 * @Author: ZLun
 * @Description: search
-->
<template>
  <div>
    <a-tooltip>
      <template #title>
        {{ t('common.searchText') }}
      </template>
      <SearchOutlined @click="showModal" />
    </a-tooltip>
    <a-modal
      v-model:visible="visible"
      width="600px"
      :wrap-class-name="`${prefixCls}`"
      :closable="false"
    >
      <a-input
        v-model:value="searchValue"
        :placeholder="t('common.searchText')"
        :class="`${prefixCls}-input`"
        size="large"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <template v-if="filterData?.length >= 0">
        <a-list :data-source="filterData" :class="`${prefixCls}-list`">
          <template #renderItem="{ item, index }">
            <a-list-item
              @mouseenter="currentIndex = index"
              :class="[
                `${prefixCls}-list-item`,
                { [`${prefixCls}-list-item-active`]: currentIndex === index },
              ]"
            >
              <Icon icon="ion:grid-outline" />
              <span class="ml-2 justify-start flex-1">
                {{ item.name }}
              </span>
              <Icon icon="ant-design:enter-outlined" :size="20" class="w-8 confirm" />
            </a-list-item>
          </template>
        </a-list>
      </template>
      <template #footer>
        <AppSearchFooter />
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { computed, ref, unref } from 'vue';
  import AppSearchFooter from './AppSearchFooter.vue';
  import Icon from '@/components/icon/Icon.vue';

  const { t } = useI18n();
  const { prefixCls } = useDesign('app-search');

  const visible = ref();
  const searchValue = ref('');
  const currentIndex = ref(0);
  const searchData = ref([
    {
      id: 1,
      name: 'test',
    },
    {
      id: 2,
      name: 'tf',
    },
  ]);

  const filterData = computed(() => {
    if (unref(searchValue).length === 0) {
      return searchData.value;
    } else {
      return searchData.value.filter((item) => item.name.indexOf(unref(searchValue)) >= 0);
    }
  });
  const showModal = () => {
    visible.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    visible.value = false;
  };
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-app-search';
  .@{prefix-cls} {
    .ant-modal {
      &-content {
        border-radius: 16px;
      }
      &-input {
        color: #1c1e21;
      }
    }
    &-list {
      max-height: 472px;
      margin-top: 14px;
      &-item {
        border-radius: 4px;
        padding-left: 14px;
        margin-top: 8px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        cursor: pointer;
        .confirm {
          display: none;
        }
        &:hover,
        &-active {
          background: @theme-color;
          color: @white;
          .confirm {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
