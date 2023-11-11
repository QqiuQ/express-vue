import Layout from '@/layout'

const roleRouter = {
  path: '/role', // 路由路径
  component: Layout,
  redirect: '/role/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/role/index'), // 指向 views/user/index.vue这个页面
      meta: {
        title: '角色管理', // 侧边栏菜单名称
        icon: 'peoples', // 侧边栏菜单图标
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_USER'] // 动态路由，这些角色可以显示该菜单
      }
    }
  ]
}

export default roleRouter
