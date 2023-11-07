import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      meta: {
        title: '用户管理',
        icon: 'table',
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_USER']
      }
    }
  ]
}

export default userRouter
