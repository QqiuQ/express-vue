// 员工管理路由
import Layout from '@/layout'

const employeeRouter = {
  path: '/employee', // 路由路径
  component: Layout,
  redirect: '/employee/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/employee/index'), // 指向 views/user/index.vue这个页面
      meta: {
        title: '员工管理', // 侧边栏菜单名称
        icon: 'people', // 侧边栏菜单图标
        roles: ['ROLE_SUPER_ADMIN'] // 动态路由，这些角色可以显示该菜单
      }
    }
  ]
}

export default employeeRouter
