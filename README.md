Express-前端

前端模板：[介绍 | vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

# 新增页面

[如何新增页面](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/new-page.html)

1. 添加路由

2. 新增视图

## 以新增“用户管理”为例

### 1. 添加路由 （src/router/module/user.js）

在 src/router/index.js 的 asyncRouter 里添加新的动态路由。其中路由可以写成一个单独的模块(  /** when your routing map is too long, you can split it into small modules **/)，这里以单独的模块为例。
在 src/router/module内新建user.js 作为用户管理的路由模块。内容为：

```javascript

import Layout from '@/layout'

const userRouter = {
    path: '/user',  // 路由路径
    component: Layout,
    redirect: '/user/index',
    children: [
    {
        path: 'index',
        component: () => import('@/views/user/index'),  // 指向 views/user/index.vue这个页面
        meta: {
        title: '用户管理',  // 侧边栏菜单名称
        icon: 'table',  // 侧边栏菜单图标
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_USER']  // 动态路由，这些角色可以显示该菜单
        }
    }
    ]
}

export default userRouter

```

### 2. 添加视图 (src/views/user/index.vue)

在 src/views/ 内新建 user 文件夹，在user内新建index.vue，编写具体的前端页面

### 3. 添加API (src/api/user2.js)

在 src/api 内新建用户管理请求的api。如 user2.js

```javascript
import request from '@/utils/request'

export function queryList(user) {
  return request({
    url: '/user',
    method: 'post',
    jsonData: true, // request请求发出之前做了一个处理
    data: user
  })
}
```

request请求发出之前，做了一个处理(src/util/request.js)：

```javascript
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = getToken()
    }
    // 对 post 请求更改起请求的 content-type
    // 便于后端接受json对象
    // 因此当 jsonData 为 true，且 method 为 post 时
    // 表明后端使用了 @RequestBody
    // 前端传递给后端的是一个 json 对象
    if (config.method.toLocaleLowerCase() === 'post') {
      console.log('config.jsonData: ' + config.jsonData)
      if (config.jsonData) {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        // config.params = JSON.stringify(config.params)
        // config.data = JSON.stringify(config.data)
        // console.log(config.data)
      } else {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        config.data = qs.stringify(config.data)
      }
    }

```

## 其他管理页面，可仿照"用户管理"
