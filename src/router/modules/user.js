import Layout from '@/layout'

const userRouter = {
  path: '/user', // 路由路径
  component: Layout,
  redirect: '/user/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'), // 指向 views/user/index.vue这个页面
      meta: {
        title: '用户管理', // 侧边栏菜单名称
        icon: 'table', // 侧边栏菜单图标
        roles: ['ROLE_SUPER_ADMIN'] // 动态路由，这些角色可以显示该菜单
      }
    }
  ]
}

export default userRouter
