import { cloneDeep, isBoolean, isNull, isObject, omit } from 'lodash';
import { Ref, ref, VNode } from 'vue';

export type Slot = {
  addonBefore?: string;
  addonAfter?: string;
  prefix?: string;
  suffix?: string;
  headerCell?: boolean;
};
export type Option = {
  label: string;
  value: string | number;
  children?: Option[];
};
export type SlotVNode = {
  addonBefore?: VNode;
  addonAfter?: VNode;
  prefix?: VNode;
  suffix?: VNode;
  headerCell?: any;
  scopedSlots?: VNode;
  customHeaderCell?: any;
};
export type Config = {
  tag: string;
  tagName: string;
  label: string;
  span: number;
  labelWidth?: number;
  colon?: boolean;
  tagIcon?: string;
  changeTag?: boolean;
  required?: boolean;
  __vModel__: string;
  __vModelName?: string;
  id: number;
};
export type Comp = {
  __config__: Config;
  __vModelValue__?: any;
  __slot__?: Slot;
  __defaultVal__?: any;
  options?: Option[] | string[];
  id: number;
  placeholder?: string;
  addonAfter?: string;
  addonBefore?: string;
  prefix?: string;
  suffix?: string;
  maxlength?: number;
  size?: string;
  allowClear?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  visibilityToggle?: boolean;
  showCount?: boolean;
  controls?: boolean;
  max?: number;
  min?: number;
  // select
  defaultActiveFirstOption?: boolean;
  labelInValue?: boolean;
  dropdownClassName?: string | null;
  maxTagTextLength?: number | null;
  maxTagCount?: number | null;
  listHeight?: number;
  mode?: string;
  notFoundContent?: string;
  tokenSeparators?: string[];
  // cascader
  changeOnSelect?: boolean;
  expandTrigger?: string;
  multiple?: boolean;
  placement?: string;
  // radio
  buttonStyle?: string;
  name?: string | null;
  optionType?: string;
  // switch
  checkedChildren?: string | null;
  unCheckedChildren?: string | null;
  checkedValue?: string | null;
  unCheckedValue?: string | null;
  // slide
  dots?: boolean;
  range?: boolean;
  reverse?: boolean;
  step?: number;
  vertical?: boolean;
  // time-picker
  inputReadOnly?: boolean;
  showNow?: boolean;
  popupClassName?: string;
  popupStyle?: string;
  clearText?: string;
  format?: string;
  // date-picker
  showTime?: boolean;
  showToday?: boolean;
  disabledTime?: Fn | null;
  disabledDate?: Fn | null;
  // rate
  count?: number;
  allowHalf?: boolean;
  // table
  headerCell?: boolean;
  bodyCell?: boolean;
  editBodyCell?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showCustomCell?: boolean;
  showSort?: boolean;
  showFilter?: boolean;
  showAdd?: boolean;
};
export type FormCfg = {
  colon: boolean; // 是否显示冒号
  labelAlign: string; // 文本标签对齐方式
  layout: string; // 表单布局方式
};
export const placementList = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];
export const expandTriggerList = ['click', 'hover'];
export const buttonStyleList = ['outline', 'solid'];
export const optionTypeList = ['default', 'button'];
export const modeList = ['multiple', 'tags', 'combobox'];
export const sizeList = ['large', 'default', 'small'];
export const layoutList = ['horizontal', 'vertical', 'inline'];
export const labelAlignList = ['left', 'right'];
export const formCfg: FormCfg = {
  colon: true,
  labelAlign: 'right',
  layout: 'horizontal',
};
// 输入型组件
export const inputComponents: Comp[] = [
  {
    __config__: {
      tag: 'Input',
      tagIcon: 'Input',
      tagName: 'a-input',
      label: '单行文本',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 1,
    },
    __slot__: {
      addonAfter: '',
      addonBefore: '',
      prefix: '',
      suffix: '',
    },
    id: 1,
    maxlength: undefined,
    size: 'default',
    placeholder: '请输入',
    allowClear: true,
    bordered: true,
    disabled: false,
    showCount: false,
  },
  {
    __config__: {
      tag: 'Input',
      tagName: 'a-textarea',
      label: '多行文本',
      tagIcon: 'TextArea',
      span: 24,
      changeTag: true,
      __vModel__: 'fieldName',
      id: 2,
    },
    id: 2,
    placeholder: '请输入',
    allowClear: true,
    bordered: true,
    disabled: false,
    showCount: false,
  },
  {
    __config__: {
      tag: 'Input',
      tagIcon: 'Password',
      tagName: 'a-input-password',
      label: '密码框',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 3,
    },
    __slot__: {
      addonAfter: '',
      addonBefore: '',
      prefix: '',
    },
    id: 3,
    maxlength: undefined,
    size: 'default',
    placeholder: '请输入',
    allowClear: true,
    bordered: true,
    visibilityToggle: true,
    disabled: false,
    showCount: false,
  },
  {
    __config__: {
      tag: 'Input',
      tagIcon: 'Search',
      tagName: 'a-input-search',
      label: '搜索框',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 4,
    },
    __slot__: {
      addonBefore: '',
      prefix: '',
    },
    id: 4,
    maxlength: undefined,
    size: 'default',
    placeholder: '请输入',
    allowClear: true,
    bordered: true,
    disabled: false,
    showCount: false,
  },
  {
    __config__: {
      tag: 'InputNumber',
      tagIcon: 'InputNumber',
      tagName: 'a-input-number',
      label: '计数器',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 5,
    },
    __slot__: {
      addonAfter: '',
      addonBefore: '',
      prefix: '',
    },
    id: 5,
    size: 'default',
    allowClear: true,
    bordered: true,
    disabled: false,
    showCount: false,
    controls: true,
    max: 10,
    min: 1,
  },
  {
    __config__: {
      tag: 'Select',
      tagIcon: 'Select',
      tagName: 'a-select',
      label: '下拉选择',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 6,
    },
    options: [
      {
        label: '选项一',
        value: 1,
      },
      {
        label: '选项二',
        value: 2,
      },
    ],
    id: 6,
    size: 'default',
    placeholder: '请选择',
    allowClear: true,
    bordered: true,
    disabled: false,
    defaultActiveFirstOption: true,
    labelInValue: false,
    dropdownClassName: null,
    maxTagTextLength: null,
    maxTagCount: null,
    listHeight: 256,
    mode: 'multiple',
    notFoundContent: 'Not Found',
  },
  {
    __config__: {
      tag: 'Cascader',
      tagIcon: 'Cascader',
      tagName: 'a-cascader',
      label: '级联选择',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 7,
    },
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
    ],
    id: 7,
    size: 'default',
    placeholder: '请选择',
    allowClear: true,
    bordered: true,
    disabled: false,
    dropdownClassName: null,
    maxTagCount: null,
    notFoundContent: 'Not Found',
    changeOnSelect: false,
    expandTrigger: 'click',
    multiple: false,
    placement: 'bottomLeft',
  },
  {
    __config__: {
      tag: 'Radio',
      tagIcon: 'Group',
      tagName: 'a-radio-group',
      label: '单选框组',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 8,
    },
    options: ['Apple', 'Pear', 'Orange'],
    id: 8,
    size: 'default',
    disabled: false,
    buttonStyle: 'outline',
    name: null,
    optionType: 'default',
  },
  {
    __config__: {
      tag: 'Checkbox',
      tagIcon: 'Group',
      tagName: 'a-checkbox-group',
      label: '多选框组',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 9,
    },
    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
    id: 9,
    disabled: false,
    name: null,
  },
  {
    __config__: {
      tag: 'Switch',
      tagIcon: 'Switch',
      tagName: 'a-switch',
      label: '开关',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      __vModelName: 'checked',
      required: true,
      changeTag: true,
      id: 10,
    },
    options: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
    id: 10,
    checkedChildren: null,
    unCheckedChildren: null,
    checkedValue: null,
    unCheckedValue: null,
    size: 'default',
    disabled: false,
  },
  {
    __config__: {
      tag: 'Slider',
      tagIcon: 'Slider',
      tagName: 'a-slider',
      label: '滑块',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      __vModelName: 'checked',
      required: true,
      changeTag: true,
      id: 11,
    },
    id: 11,
    disabled: false,
    dots: false,
    range: false,
    max: 100,
    min: 0,
    reverse: false,
    vertical: false,
    step: 1,
  },
  {
    __config__: {
      tag: 'TimePicker',
      tagIcon: 'TimePicker',
      tagName: 'a-time-picker',
      label: '时间选择器',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 12,
    },
    id: 12,
    disabled: false,
    allowClear: true,
    bordered: true,
    inputReadOnly: true,
    showNow: false,
    placeholder: '请选择时间',
    popupClassName: 'popupClassName',
    popupStyle: '{}',
    clearText: 'clear',
    format: 'HH:mm:ss',
  },
  {
    __config__: {
      tag: 'TimeRangePicker',
      tagIcon: 'TimeRangePicker',
      tagName: 'a-time-range-picker',
      label: '时间范围选择器',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 12,
    },
    id: 12,
    disabled: false,
    allowClear: true,
    bordered: true,
    inputReadOnly: true,
    showNow: false,
    popupClassName: 'popupClassName',
    popupStyle: '{}',
    clearText: 'clear',
    format: 'HH:mm:ss',
  },
  {
    __config__: {
      tag: 'DatePicker',
      tagIcon: 'DatePicker',
      tagName: 'a-date-picker',
      label: '日期选择器',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 13,
    },
    id: 13,
    disabled: false,
    showTime: false,
    size: 'default',
    disabledTime: () => {},
    disabledDate: () => {},
    allowClear: true,
    showToday: true,
    bordered: true,
    inputReadOnly: true,
    showNow: false,
    popupClassName: 'popupClassName',
    popupStyle: 'popupStyle',
    format: 'YYYY-MM-DD',
  },
  {
    __config__: {
      tag: 'RangePicker',
      tagIcon: 'RangePicker',
      tagName: 'a-range-picker',
      label: '范围选择器',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 14,
    },
    id: 14,
    disabled: false,
    showTime: false,
    size: 'default',
    allowClear: true,
    showToday: true,
    bordered: true,
    inputReadOnly: true,
    showNow: false,
    popupClassName: 'popupClassName',
    popupStyle: 'popupStyle',
    format: 'YYYY-MM-DD',
  },
  {
    __config__: {
      tag: 'Rate',
      tagIcon: 'Rate',
      tagName: 'a-rate',
      label: '评分',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 15,
    },
    id: 15,
    count: 5,
    allowHalf: false,
  },
  {
    __config__: {
      tag: 'ZTable',
      tagIcon: 'ZTable',
      tagName: 'ZTable',
      label: '表格',
      span: 24,
      labelWidth: 300,
      __vModel__: 'fieldName',
      required: true,
      changeTag: true,
      id: 16,
    },
    __slot__: {
      headerCell: true,
    },
    __defaultVal__: {
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park',
            },
          ],
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '3',
          name: '胡彦祖',
          age: 52,
          address: '西湖区湖底公园1号',
        },
      ],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          sorter: true,
          filters: [
            { text: '32', value: 32 },
            { text: '42', value: 42 },
          ],
        },
        {
          title: '住xxxxxxxxxxxxxxxxffffffffffffffffffffffffffffffffffff址',
          dataIndex: 'address',
          key: 'address',
          ellipsis: true,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          fixed: 'right',
          width: '100px',
        },
      ],
    },
    id: 16,
    showDelete: true,
    showEdit: true,
    showCustomCell: true,
    showSort: true,
    showFilter: true,
    showAdd: true,
    headerCell: true,
    bodyCell: true,
    editBodyCell: true,
    bordered: true,
  },
];

function formToStr(obj: FormCfg) {
  let str = '';
  if (!obj) return '';
  Object.keys(obj).forEach((item) => {
    if (formCfg[item] !== obj[item]) {
      if (isBoolean(obj[item])) {
        str = `${str} :${item}="${obj[item]}"`;
      } else {
        str = `${str} ${item}="${obj[item]}"`;
      }
    }
  });
  return str;
}
export function makeTemplate(comps: Comp[], form: FormCfg) {
  return `<template>
  <a-form
    :model="form"
    :label-col="{ span: 4 }"
    ${formToStr(form)}
  >
  ${arrayToStr(comps, (item: Comp, index: number) => {
    return `<a-col :col="${item.__config__.span}">
      <a-form-item
      label=${item.__config__.label}
      name="${item.__config__.__vModel__}${index}"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >

      <${item.__config__.tagName} v-model:${item.__config__.__vModelName || 'value'}=
      "form.${item.__config__.__vModel__}${index}"
       ${objToStr(omit(item, ['__slot__', '__vModelValue__']))}>
        ${slotStr(item)}
       </${item.__config__.tagName}>
    </a-form-item>
      </a-col>
      `;
  })}
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  const form = reactive({
    ${forAttributes(comps)}
  });
</script>
`;
}

function forAttributes(comps: Comp[]) {
  let str = '';
  comps.forEach((item, index) => {
    str = `${str} ${item.__config__.__vModel__}${index}:'',`;
  });
  return str;
}
function arrayToStr<T>(arr: T[], callbackFn: (arg0: T, arg1: number) => string) {
  let str = '';
  arr.forEach((item: T, index) => {
    str = `${str}${callbackFn(item, index)}`;
  });
  return str;
}
function objToStr(obj: Comp, split = ' ') {
  let str = '';
  const preObj = inputComponents.find((item) => {
    return item.__config__.id === obj.__config__.id;
  });
  Object.keys(obj).forEach((item) => {
    if (item !== '__config__' && preObj && preObj[item] !== obj[item] && !isNull(obj[item])) {
      if (isBoolean(obj[item])) {
        str = `${str}${split}:${item}="${obj[item]}"`;
      } else if (isObject(obj[item])) {
        str = `${str}${split}:${item}='${JSON.stringify(obj[item])}'`;
      } else {
        str = `${str}${split}${item}="${obj[item]}"`;
      }
    }
  });
  return str;
}

function slotStr(comp: Comp) {
  const { __slot__: obj } = comp;
  if (!obj) return '';
  let str = '';
  Object.keys(obj).forEach((item) => {
    if (obj[item] && !comp[item]) {
      str = `${str}<template #${item}>
        <${obj[item]}/>
    </template>`;
    }
  });
  return str;
}

export function makeDataObject() {
  return {
    class: {},
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {},
    // 普通的 HTML attribute
    attrs: {},
    // 组件 prop
    props: {},
    // DOM property
    domProps: {},
    // 事件监听器在 `on` 内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {},
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {},
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {},
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: null,
    // 其它特殊顶层 property
    key: null,
    ref: null,
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: null,
  };
}
