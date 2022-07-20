<!--
 * @Author: ZLun
 * @Description: ant-index
-->
<template>
  <Test />
  <div class="p-4" :class="prefixCls">
    <a-card :class="`${prefixCls}-list`" :bodyStyle="{ flex: 1, overflow: 'auto' }">
      <a-space :size="12" direction="horizontal" id="drag">
        <div
          v-for="(item, index) in inputComponents"
          :key="index"
          :data-id="item.id"
          @click="addComponent(item)"
        >
          <a-button type="dashed">
            {{ item.__config__.label }}
          </a-button>
        </div>
      </a-space>
    </a-card>
    <a-card title="演示" :class="`${prefixCls}-view`">
      <a-form id="show-list" v-bind="form" :label-col="{ span: 4 }" :key="renderKey">
        <div @click="setActive(index)" v-for="(item, index) in showList" :key="index">
          <Render :comp="item" :active="activeIndex === index" />
        </div>
        <div
          v-show="!showList || showList.length === 0"
          class="empty-info flex justify-center items-center"
        >
          从上方拖入或点选组件进行表单设计
        </div>
      </a-form>
    </a-card>
    <a-card
      :tab-list="tabList"
      :activeTabKey="activeTabKey"
      :class="`${prefixCls}-config flex flex-col`"
      @tab-change="(key:string) => (activeTabKey = key)"
    >
      <Config
        :active-data="showList[activeIndex]"
        :formId="activeTabKey"
        :form="form"
        @tag-change="(tag) => tagChange(tag)"
      />
    </a-card>
    <a-card
      title="代码生成"
      :class="`${prefixCls}-code flex flex-col`"
      :bodyStyle="{ flex: 1, overflow: 'auto', display: 'flex', 'flex-direction': 'col' }"
    >
      <template #extra>
        <a @click="copyCode">复制</a>
      </template>
      <div ref="monacoRef" class="flex-1 overflow-auto"></div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import {
    computed,
    nextTick,
    onMounted,
    reactive,
    Ref,
    ref,
    unref,
    watch,
    watchEffect,
  } from 'vue';
  import Test from './Test.vue';
  import { inputComponents, Comp, makeTemplate, formCfg } from './data';
  import { useDrag } from '@/hooks/web/useDrag';
  import { cloneDeep, isUndefined } from 'lodash';
  import Render from './Render.vue';
  import Config from './Config.vue';
  import { useMonaco } from './useMonaco';
  import { copy } from 'clipboard';
  import { message } from 'ant-design-vue';
  import { t } from '@/hooks/web/useI18n';

  const { prefixCls } = useDesign('generator');

  const drag = ref();
  const showEmpty = ref(true);

  const activeIndex = ref(0);
  const activeData = ref();
  const activeTabKey = ref('comp');
  const form = reactive(cloneDeep(formCfg));

  const tabList = [
    {
      key: 'comp',
      tab: '组件配置',
    },
    {
      key: 'form',
      tab: '表单配置',
    },
  ];
  const showList: Ref<Comp[]> = ref([]);
  const renderKey = ref(0);

  const addComponent = (item: Comp) => {
    showList.value.push(cloneDeep(item));
    activeData.value = item;
  };
  onMounted(() => {
    const el = document.querySelector('#drag') as HTMLElement;
    if (!el) return;
    const s = useDrag(el, {
      group: {
        name: 'ant-comp',
        pull: 'clone',
        put: false,
      },
      onMove(e) {},
      onEnd(e) {
        if (!e.pullMode) return;
        if (isUndefined(e.oldIndex) || isUndefined(e.newIndex)) return;
        activeData.value = cloneDeep(inputComponents[e.oldIndex]);
        showList.value.splice(e.newIndex, 0, inputComponents[e.oldIndex]);
        e.item.style.display = 'none';
      },
    });
    initDrag();
  });
  watch(
    () => renderKey.value,
    () => {
      nextTick(() => {
        initDrag();
      });
    },
  );
  function initDrag() {
    const elList = document.querySelector('#show-list') as HTMLElement;
    useDrag(elList, {
      group: {
        name: 'ant-comp',
      },
      onEnd(e) {
        renderKey.value = Date.now();
        if (isUndefined(e.oldIndex) || isUndefined(e.newIndex)) return;
        const item = showList.value[e.oldIndex];
        showList.value.splice(e.oldIndex, 1);
        showList.value.splice(e.newIndex, 0, item);
        activeIndex.value = e.newIndex;
      },
    });
  }
  function tagChange(comp: Comp) {
    showList.value.splice(activeIndex.value, 1, comp);
  }
  function setActive(index: number) {
    activeIndex.value = index;
    activeData.value = showList[index];
  }

  const monacoRef = ref();

  const { setVal, getVal } = useMonaco(monacoRef);
  function copyCode() {
    const val = getVal();
    if (!val) return;
    copy(val);
    message.success('复制成功');
    return false;
  }
  // watchEffect(() => {
  //   if (!monacoHtml) return;
  //   setVal(monacoHtml);
  // });
  watch(
    [() => showList.value, () => form],
    ([val, fm]) => {
      const html = makeTemplate(val, fm);
      setVal(html);
    },
    {
      deep: true,
    },
  );
</script>
<style lang="less">
  @prefixCls:~'@{namespace}-generator';
  .@{prefixCls}{
    display: grid;
    min-height: 100%;
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto auto 1fr;
    grid-auto-flow: column dense;
    grid-gap: 16px 16px;
    &-list{
      grid-column-start: span 2;
    }
    &-view{
      #show-list>div{
        &:hover{
          .ant-form-item-label > label{
            color: @theme-color;
            cursor: pointer;
          }
        }
      }
      .active-cls {
        .ant-form-item .ant-form-item-label > label {
          color: @theme-color;
          cursor: pointer;
        }
      }
      // grid-column-start: span 2;
    }
    &-config{
      grid-row-start: span 2;
    }
    &-code{

    }
  }
</style>
