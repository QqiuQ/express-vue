const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name,
  introduction: state => state.account.introduction,
  roles: state => state.account.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  accountType: state => state.account.accountType, // accountType 账户类型
  accountId: state => state.account.accountId //账户Id
}
export default getters

//  const getters = {
//   sidebar: state => state.app.sidebar,
//   size: state => state.app.size,
//   device: state => state.app.device,
//   visitedViews: state => state.tagsView.visitedViews,
//   cachedViews: state => state.tagsView.cachedViews,
//   token: state => state.user.token,
//   avatar: state => state.user.avatar,
//   name: state => state.user.name,
//   introduction: state => state.user.introduction,
//   roles: state => state.user.roles,
//   permission_routes: state => state.permission.routes,
//   errorLogs: state => state.errorLog.logs,
//   type: state => state.user.type
// }
// export default getters
