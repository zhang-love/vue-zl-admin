<script lang="tsx">
  import { computed, defineComponent, h, PropType, watchEffect } from 'vue';
  import { Comp, SlotVNode } from './data';
  import RenderContent from './components/index';
  import * as Antd from 'ant-design-vue';

  import * as AntdIcons from '@ant-design/icons-vue';
  import { merge, omit } from 'lodash';
  export default defineComponent({
    inheritAttrs: false,
    props: {
      comp: {
        type: Object as PropType<Comp>,
      },
      active: {
        type: Boolean,
      },
    },
    render() {
      const { comp, active } = this;

      function renderRow() {
        if (!comp) return;
        const { __config__: config, __slot__: slot } = comp;
        const colon = computed(() => config.colon);
        const activeCls = computed(() => (active ? 'active-cls' : null));
        const slots = computed(() => {
          const obj: SlotVNode = {};
          if (slot?.addonAfter) {
            const icon = AntdIcons[slot.addonAfter];
            if (icon) {
              obj.addonAfter = h(icon);
              comp.addonAfter = undefined;
            } else {
              comp.addonAfter = slot.addonAfter;
              obj.addonAfter = undefined;
            }
          }
          if (slot?.addonBefore) {
            const icon = AntdIcons[slot.addonBefore];
            if (icon) {
              obj.addonBefore = h(icon);
              comp.addonBefore = undefined;
            } else {
              comp.addonBefore = slot.addonBefore;
              obj.addonBefore = undefined;
            }
          }
          if (slot?.prefix) {
            const icon = AntdIcons[slot.prefix];
            if (icon) {
              obj.prefix = h(icon);
              comp.prefix = undefined;
            } else {
              comp.prefix = slot.prefix;
              obj.prefix = undefined;
            }
          }
          if (slot?.suffix) {
            const icon = AntdIcons[slot.suffix];
            if (icon) {
              obj.suffix = h(icon);
              comp.suffix = undefined;
            } else {
              comp.suffix = slot.suffix;
              obj.suffix = undefined;
            }
          }
          return obj;
        });
        const tag = computed(() => {
          if (config.tagIcon !== config.tag) {
            return RenderContent[config.tag][config.tagIcon];
          } else return RenderContent[config.tag];
        });
        return (
          <a-col span={config.span} class={[activeCls.value, 'render-wrap']}>
            <a-form-item label={config.label} colon={colon} required={config.required}>
              {h(
                tag.value,
                merge(
                  omit(comp, ['__config__', '__slot__', '__vModelValue__', '__defaultVal__']),
                  comp.__defaultVal__,
                  {
                    // value: comp.__vModelValue__,
                    [`${comp.__config__.__vModelName || 'value'}`]: comp.__vModelValue__,
                    modelModifiers: {
                      modifier: true,
                    },
                    [`onUpdate:${comp.__config__.__vModelName || 'value'}`]: ($event: string) =>
                      (comp.__vModelValue__ = $event),
                  },
                ),
                slots.value,
              )}
            </a-form-item>
          </a-col>
        );
      }
      if (!this.comp) return;
      return renderRow();
      // return h(Antd[this.comp.__config__.tag]);
    },
  });
</script>
<style lang="less" scoped></style>
