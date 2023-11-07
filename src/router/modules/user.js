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
        title: 'UserManager',
        icon: 'table',
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_USER']
      }
    }
  ]
}

export default userRouter
