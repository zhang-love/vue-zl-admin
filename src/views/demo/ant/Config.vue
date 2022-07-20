<!--
 * @Author: ZLun
 * @Description: config
-->
<template>
  <a-form v-if="activeData && formId === 'comp'" :labelCol="{ span: 10 }">
    <a-form-item label="组件类型" v-if="activeData.__config__.changeTag">
      <a-select v-model:value="activeData.__config__.tagIcon" @change="tagChange">
        <a-select-opt-group v-for="tag in tagList" :key="tag" :label="tag.label">
          <a-select-option
            v-for="(item, index) in tag.options"
            :key="index"
            :value="item.__config__.tagIcon"
          >
            {{ item.__config__.label }}
          </a-select-option>
        </a-select-opt-group>
      </a-select>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.__config__.label)" label="标题">
      <a-input v-model:value="activeData.__config__.label" />
    </a-form-item>
    <!-- <a-form-item v-if="isDef(activeData.__config__.__vModel__)" label="字段名">
      <a-input v-model:value="activeData.__config__.__vModel__" />
    </a-form-item> -->
    <a-form-item v-if="isDef(activeData.__config__.span)" label="组件栅格">
      <a-input v-model:value="activeData.__config__.span" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.checkedChildren)" label="选中时显示">
      <a-input v-model:value="activeData.checkedChildren" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.unCheckedChildren)" label="未选中显示">
      <a-input v-model:value="activeData.unCheckedChildren" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.checkedValue)" label="选中时的值">
      <a-input v-model:value="activeData.checkedValue" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.unCheckedValue)" label="未选时的值">
      <a-input v-model:value="activeData.unCheckedValue" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.placeholder)" label="占位提示">
      <a-input v-model:value="activeData.placeholder" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.dropdownClassName)" label="菜单class">
      <a-input v-model:value="activeData.dropdownClassName" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.notFoundContent)" label="为空时内容">
      <a-input v-model:value="activeData.notFoundContent" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.format)" label="输出格式">
      <a-input v-model:value="activeData.format" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.maxlength)" label="最大长度">
      <a-input-number v-model:value="activeData.maxlength" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.maxTagTextLength)" label="text最大长度">
      <a-input-number v-model:value="activeData.maxTagTextLength" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.maxTagCount)" label="tag最大数量">
      <a-input-number v-model:value="activeData.maxTagCount" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.listHeight)" label="弹窗滚动高度">
      <a-input-number v-model:value="activeData.listHeight" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.step)" label="步长">
      <a-input-number v-model:value="activeData.step" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.count)" label="总数">
      <a-input-number v-model:value="activeData.count" />
    </a-form-item>
    <a-form-item v-if="isDef(activeData.size)" label="大小尺寸">
      <a-radio-group v-model:value="activeData.size" button-style="solid">
        <a-radio-button v-for="item in sizeList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.mode)" label="select模式">
      <a-radio-group v-model:value="activeData.mode" button-style="solid">
        <a-radio-button v-for="item in modeList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.placement)" label="浮层位置">
      <a-radio-group v-model:value="activeData.placement" button-style="solid">
        <a-radio-button v-for="item in placementList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.expandTrigger)" label="次级菜单展开">
      <a-radio-group v-model:value="activeData.expandTrigger" button-style="solid">
        <a-radio-button v-for="item in expandTriggerList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.buttonStyle)" label="button样式">
      <a-radio-group v-model:value="activeData.buttonStyle" button-style="solid">
        <a-radio-button v-for="item in buttonStyleList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.optionType)" label="options 类型">
      <a-radio-group v-model:value="activeData.optionType" button-style="solid">
        <a-radio-button v-for="item in optionTypeList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.__slot__?.addonBefore)" label="前置标签">
      <a-input v-model:value="activeData.__slot__.addonBefore" allowClear>
        <template #addonAfter>
          <IconSelector @select-icon="(val) => setIcon('addonBefore', val)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.__slot__?.addonAfter)" label="后置标签">
      <a-input v-model:value="activeData.__slot__.addonAfter" allowClear>
        <template #addonAfter>
          <IconSelector @select-icon="(val) => setIcon('addonAfter', val)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.__slot__?.prefix)" label="前缀图标">
      <a-input v-model:value="activeData.__slot__.prefix" allowClear>
        <template #addonAfter>
          <IconSelector @select-icon="(val) => setIcon('prefix', val)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-if="isDef(activeData.__slot__?.suffix)" label="后缀图标">
      <a-input v-model:value="activeData.__slot__.suffix" allowClear>
        <template #addonAfter>
          <IconSelector @select-icon="(val) => setIcon('suffix', val)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item label="显示清空" v-if="isDef(activeData.allowClear)">
      <a-switch v-model:checked="activeData.allowClear" />
    </a-form-item>
    <a-form-item label="显示边框" v-if="isDef(activeData.bordered)">
      <a-switch v-model:checked="activeData.bordered" />
    </a-form-item>
    <a-form-item label="禁用" v-if="isDef(activeData.disabled)">
      <a-switch v-model:checked="activeData.disabled" />
    </a-form-item>
    <a-form-item label="显示字数" v-if="isDef(activeData.showCount)">
      <a-switch v-model:checked="activeData.showCount" />
    </a-form-item>
    <a-form-item label="切换按钮" v-if="isDef(activeData.visibilityToggle)">
      <a-switch v-model:checked="activeData.visibilityToggle" />
    </a-form-item>
    <a-form-item label="默认选中第一项" v-if="isDef(activeData.defaultActiveFirstOption)">
      <a-switch v-model:checked="activeData.defaultActiveFirstOption" />
    </a-form-item>
    <a-form-item label="返回value对象" v-if="isDef(activeData.labelInValue)">
      <a-switch v-model:checked="activeData.labelInValue" />
    </a-form-item>
    <a-form-item label="多选" v-if="isDef(activeData.multiple)">
      <a-switch v-model:checked="activeData.multiple" />
    </a-form-item>
    <a-form-item label="选中时改变" v-if="isDef(activeData.changeOnSelect)">
      <a-switch v-model:checked="activeData.changeOnSelect" />
    </a-form-item>
    <a-form-item label="点状" v-if="isDef(activeData.dots)">
      <a-switch v-model:checked="activeData.dots" />
    </a-form-item>
    <a-form-item label="双滑块模式" v-if="isDef(activeData.range)">
      <a-switch v-model:checked="activeData.range" />
    </a-form-item>
    <a-form-item label="是否反向" v-if="isDef(activeData.reverse)">
      <a-switch v-model:checked="activeData.reverse" />
    </a-form-item>
    <a-form-item label="是否垂直" v-if="isDef(activeData.vertical)">
      <a-switch v-model:checked="activeData.vertical" />
    </a-form-item>
    <a-form-item label="输入限制" v-if="isDef(activeData.inputReadOnly)">
      <a-switch v-model:checked="activeData.inputReadOnly" />
    </a-form-item>
    <a-form-item label="显示此刻" v-if="isDef(activeData.showNow)">
      <a-switch v-model:checked="activeData.showNow" />
    </a-form-item>
    <a-form-item label="显示时间" v-if="isDef(activeData.showTime)">
      <a-switch v-model:checked="activeData.showTime" />
    </a-form-item>
    <a-form-item label="显示今天" v-if="isDef(activeData.showToday)">
      <a-switch v-model:checked="activeData.showToday" />
    </a-form-item>
    <a-form-item label="允许半选" v-if="isDef(activeData.allowHalf)">
      <a-switch v-model:checked="activeData.allowHalf" />
    </a-form-item>
    <a-form-item label="自定义单元格" v-if="isDef(activeData.showCustomCell)">
      <a-switch v-model:checked="activeData.showCustomCell" />
    </a-form-item>
    <a-form-item label="显示添加" v-if="isDef(activeData.showAdd)">
      <a-switch v-model:checked="activeData.showAdd" />
    </a-form-item>
    <a-form-item label="显示修改" v-if="isDef(activeData.showEdit)">
      <a-switch v-model:checked="activeData.showEdit" />
    </a-form-item>
    <a-form-item label="显示删除" v-if="isDef(activeData.showDelete)">
      <a-switch v-model:checked="activeData.showDelete" />
    </a-form-item>
    <a-form-item label="显示排序" v-if="isDef(activeData.showSort)">
      <a-switch v-model:checked="activeData.showSort" />
    </a-form-item>
    <a-form-item label="显示过滤" v-if="isDef(activeData.showFilter)">
      <a-switch v-model:checked="activeData.showFilter" />
    </a-form-item>
  </a-form>
  <a-form v-if="formId === 'form' && form" :labelCol="{ span: 7 }">
    <a-form-item label="显示冒号">
      <a-switch v-model:checked="form.colon" />
    </a-form-item>
    <a-form-item label="标签对齐">
      <a-radio-group v-model:value="form.labelAlign" buttonStyle="solid">
        <a-radio-button v-for="item in labelAlignList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="表单布局">
      <a-radio-group v-model:value="form.layout" buttonStyle="solid">
        <a-radio-button v-for="item in layoutList" :key="item" :value="item">
          {{ item }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watchEffect } from 'vue';
  import {
    Comp,
    inputComponents,
    sizeList,
    modeList,
    labelAlignList,
    layoutList,
    FormCfg,
    placementList,
    optionTypeList,
    buttonStyleList,
    expandTriggerList,
  } from './data';
  import { isDef } from '@/utils/is';
  import IconSelector from './components/IconSelector.vue';
  import { cloneDeep } from 'lodash';
  import { formCfg } from './data';

  const props = defineProps({
    activeData: {
      type: Object as PropType<Comp>,
    },
    formId: {
      type: String,
      default: 'comp',
    },
    form: {
      type: Object as PropType<FormCfg>,
    },
  });
  const emit = defineEmits(['tag-change']);
  const tagList = computed(() => {
    return [
      {
        label: '输入型组件',
        options: cloneDeep(inputComponents),
      },
    ];
  });

  const setIcon = (key: string, val: string) => {
    if (!props.activeData || !props.activeData.__slot__) return;
    props.activeData.__slot__[key] = val;
  };

  const tagChange = (value: string) => {
    const comp = inputComponents.find((item) => item.__config__.tagIcon === value);
    emit('tag-change', cloneDeep(comp));
  };
</script>
<style lang="less"></style>
