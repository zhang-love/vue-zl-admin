import { useAppProviderContext } from '@/components/application/useAppContext';
// import { computed } from 'vue';
// import { lowerFirst } from 'lodash-es';
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
