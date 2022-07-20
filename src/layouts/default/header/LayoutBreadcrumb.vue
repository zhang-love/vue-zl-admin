<!--
 * @Author: ZLun
 * @Description: breadcrumb
-->
<template>
  <div :class="[prefixCls, `${getThemeSetting}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ t(route.title) }}
        </span>
        <router-link v-else :to="`${route.path}`">
          {{ t(route.title) }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { listenerRouteChange } from '@/logics/mitt/routeChange';
  import { getAllParentPath } from '@/router/helper/menuHelper';
  import { getMenus } from '@/router/menus';
  import { Menu } from '@/router/types';
  import { ref } from 'vue';
  const routes = ref<Menu[]>([]);
  const { prefixCls } = useDesign('layout-breadcrumb');
  const { getThemeSetting } = useRootSetting();
  const { t } = useI18n();

  listenerRouteChange(async (route) => {
    if (!route) return;
    const menus = await getMenus();
    const parent = getAllParentPath(menus, route.path);
    const filterMenus = menus.filter((item) => item.path === parent[0]);
    const matched = getMatched(filterMenus, parent) as any;
    if (!matched || matched.length === 0) return;
    routes.value = matched;
  });

  function getMatched(menus: Menu[], parent: string[]) {
    const metched: Menu[] = [];
    menus.forEach((item) => {
      if (parent.includes(item.path)) {
        metched.push({
          ...item,
          name: item.name,
        });
      }
      if (item.children?.length) {
        metched.push(...getMatched(item.children, parent));
      }
    });
    return metched;
  }
</script>
<style lang="less">
  // @breadcrumb-prefix-cls: ~'@{namespace}-layout-breadcrumb';
  // .@{breadcrumb-prefix-cls} {
  //   padding: 0 8px;
  //   .ant-breadcrumb-link {
  //     color: #999;
  //   }
  //   &.light {
  //     .ant-breadcrumb-link {
  //       color: @breadcrumb-item-normal-color;
  //       a {
  //         color: rgb(0 0 0 / 65%);
  //         &:hover {
  //           color: @theme-color;
  //         }
  //       }
  //     }
  //   }
  //   &.dark {
  //     .ant-breadcrumb-link {
  //       color: rgb(255 255 255 / 60%);
  //       a {
  //         color: rgb(255 255 255 / 80%);
  //         &:hover {
  //           color: @theme-color;
  //         }
  //       }
  //     }
  //   }
  // }
</style>
