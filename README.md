## Vite + Vue3 + Vue-router + Pinia 后台管理系统框架【参考vue-vben-admin】
[github项目地址](https://github.com/zhang-love/vue-zl-admin)
核心功能：

 - 实现了vben里面的核心功能，包括登录注册、日夜间模式切换、后台主题色菜单背景色切换、国际化、状态管理、请求管理、路由管理、缓存持久化，响应式布局
 - 去掉了vben里面多余的业务部分，只留下了基础的登录功能和后台框架
 - 去掉了自定义封装的组件，比如menu组件等，换成了简单的antdv实现，组件统一，学习成本低
 
代码结构：
 |-src
 |----api 定义后端接口
 	

```typescript
export enum Api {
  LOGOUT = '/logout',
  LOGIN = '/login',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}
```
|----assets 
|-------- icons 存放svg图片，通过vite-plugin-svg-icons生成svg雪碧图 ，参考[vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons)
|--------images 存放图片
|--------svg 存放svg图片
|---- components 存放公共子组件
|--------application 存放app级别的公共子组件
|--------icon 封装svg的子组件在这里实现
|--------menu 封装了andv的菜单组件
|--------qr 封装二维码登录的组件
|--- design vben里面定义的一些样式
|---- enums 存放枚举类型，里面分有app、menu等按文件存放相关的枚举类型
|---- hooks 存放逻辑复用的函数
|--------web web相关的逻辑复用
|------------ useDrag 用于实现拖拽功能
|---- layouts 管理系统的布局组件
|-------- header 顶部栏子组件
|-------- sider 侧边栏子组件
|-------- tabs 标签页子组件
|---- locales 国际化配置
|---- logics/theme 主题切换
|---- router 路由的创建和路由拦截
|---- store pinia的创建和各个模块的创建
|----utils
|----views 页面组件
|-------- dashboard 
|-------- sys
|---- App.vue
|---- main.ts 入口
| index.html
| vite.config.ts
| windi.config.ts



![登录页](https://img-blog.csdnimg.cn/de1e56a270d7449c92b141dbb32edbca.png)

![后台框架部分](https://img-blog.csdnimg.cn/8751c425bdb54e27bbf96e53088db248.png)
