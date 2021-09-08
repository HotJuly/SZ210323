import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

/*
路由分为三种,常量路由,异步路由,任意路由
常量路由:该类路由无论帐号权限如何都一定能看到
异步路由:该类路由并不是所有帐号都能看到,需要根据账号权限来实现动态展示
*/
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes=[
  {
    path: '/product',
    component: Layout,
    name:"Product",
    redirect: 'trademark/list',
    children: [
      {
        path: 'trademark/list',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/list'),
        meta: { title: '品牌管理'}
      },
      {
        path: 'attr/list',
        name: 'Attr',
        component: () => import('@/views/product/attr/list'),
        meta: { title: '属性管理'}
      },
      {
        path: 'spu/list',
        name: 'Spu',
        component: () => import('@/views/product/spu/list'),
        meta: { title: 'SPU管理'}
      },
      {
        path: 'sku/list',
        name: 'Sku',
        component: () => import('@/views/product/sku/list'),
        meta: { title: 'SKU管理'}
      }
    ],
    meta: { title: '商品管理', icon: 'el-icon-s-shop' }
  }]

export const anyRoutes=[
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
