<!--
 * @Author: ZLun
 * @Description: 
-->
<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd" v-if="showAdd"
    >Add</a-button
  >
  <a-table :dataSource="showData" :columns="columns" @change="handleTableChange" bordered>
    <template #headerCell="{ column }" v-if="headerCell">
      <template v-if="column.key === 'name'">
        <span>custom Name </span>
      </template>
    </template>
    <template #bodyCell="{ column, text, record }" v-if="showCustomCell">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell" v-if="showEdit">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <EditOutlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
        <a v-else> custom {{ record.name }} </a>
      </template>
      <template v-else-if="showDelete && column.dataIndex === 'operation'">
        <a-popconfirm v-if="count" title="Sure to delete?" @confirm="onDelete(record.key)">
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { ColumnProps } from 'ant-design-vue/lib/table';
  import { computed, PropType, reactive, Ref, ref, UnwrapRef, watch } from 'vue';
  import type { TableProps } from 'ant-design-vue';
  import { sortArr } from '@/utils';
  import { cloneDeep } from 'lodash';
  import { EditOutlined } from '@ant-design/icons-vue';

  interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
  }
  const props = defineProps({
    headerCell: {
      type: Boolean,
      default: false,
    },
    showAdd: {
      type: Boolean,
    },
    showEdit: {
      type: Boolean,
    },
    showCustomCell: {
      type: Boolean,
    },
    showDelete: {
      type: Boolean,
    },
    showSort: {
      type: Boolean,
    },
    showFilter: {
      type: Boolean,
    },
    bodyCell: {
      type: Boolean,
    },
    editBodyCell: {
      type: Boolean,
    },
    bordered: {
      type: Boolean,
    },
    dataSource: {
      type: Array as PropType<DataItem[]>,
    },
    columns: {
      type: Object as PropType<ColumnProps>,
    },
  });
  const showData: Ref<DataItem[]> = ref([]);
  watch(
    () => props.dataSource,
    (val) => {
      if (!val) {
        showData.value = [];
      } else {
        showData.value = val;
      }
    },
    {
      immediate: true,
    },
  );
  const handleTableChange: TableProps['onChange'] = (
    pagination: any,
    filters: any,
    sorter: any,
  ) => {
    console.log('xxx', pagination, filters, sorter);
    if (!props.dataSource) return;
    let datas = cloneDeep(props.dataSource);
    Object.keys(filters).forEach((item) => {
      if (filters[item]) {
        datas = datas.filter((i) => filters[item].includes(i[item]));
      }
    });
    showData.value = datas.sort((a, b) => sortArr(a, b, sorter.field, sorter.order));
  };
  const count = computed(() => showData.value?.length);
  const handleAdd = () => {
    const newData = {
      key: `${count.value}`,
      name: `Edward King ${count.value}`,
      age: 32,
      address: `London, Park Lane no. ${count.value}`,
    };
    showData.value.push(newData);
  };
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

  const edit = (key: string) => {
    editableData[key] = cloneDeep(showData.value.filter((item) => key === item.key)[0]);
  };
  const save = (key: string) => {
    Object.assign(showData.value.filter((item) => key === item.key)[0], editableData[key]);
    delete editableData[key];
  };
  const onDelete = (key: string) => {
    showData.value = showData.value.filter((item) => item.key !== key);
  };
</script>
<style lang="less">
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }

    .editable-add-btn {
      margin-bottom: 8px;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>
