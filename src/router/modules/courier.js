import Layout from '@/layout'

const courierRouter = {
  path: '/couriers', // 路由路径
  component: Layout,
  redirect: '/couriers/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/couriers/index'), // 指向 views/user/index.vue这个页面
      name: '快递员管理',
      meta: {
        title: '快递员管理', // 侧边栏菜单名称
        icon: 'table', // 侧边栏菜单图标
        roles: ['ROLE_SUPER_ADMIN'] // 动态路由，这些角色可以显示该菜单
      }
    }
  ]
}

export default courierRouter
