import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  },

  {
    path: '/event',
    component: Layout,
    redirect: '/event/statistics',
    name: 'Event',
    meta: { title: '事件管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '事件统计', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '图表分析', icon: 'el-icon-s-data' }
      }
    ]
  },

  {
    path: '/personnel',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Personnel',
        component: () => import('@/views/personnel/index'),
        meta: { title: '人员管理', icon: 'el-icon-s-custom' }
      }
    ]
  },

  {
    path: '/task',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Task',
        component: () => import('@/views/task/index'),
        meta: { title: '任务中心', icon: 'nested' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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
