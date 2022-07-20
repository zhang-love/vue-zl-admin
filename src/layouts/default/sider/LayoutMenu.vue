<!--
 * @Author: ZLun
 * @Description: menu
-->

<script lang="tsx">
  import AppLogo from '@/components/application/AppLogo.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import SimpleMenu from '@/components/menu/SimpleMenu.vue';
  import { getMenus } from '@/router/menus';
  import { useMenuSetting } from '@/settings/useMenuSetting';

  export default defineComponent({
    setup() {
      const { getShowLogo } = useRootSetting();

      const { getMenuTheme } = useMenuSetting();

      const { getIsMobile } = useAppInject();

      const { prefixCls } = useDesign('layout-menu');

      const menus = ref();

      onMounted(async () => {
        menus.value = await getMenus();
      });

      function renderHeader() {
        if (!unref(getShowLogo) && !unref(getIsMobile)) return null;

        return <AppLogo theme={unref(getMenuTheme)}></AppLogo>;
      }

      function renderMenu() {
        return <SimpleMenu items={unref(menus)} theme={unref(getMenuTheme)} />;
      }
      return () => {
        return (
          <>
            <div class={prefixCls}>
              {renderHeader()}
              {renderMenu()}
            </div>
          </>
        );
      };
    },
  });
</script>
<style lang="less"></style>
