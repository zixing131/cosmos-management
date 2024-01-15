export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/users', name: '用户管理', icon: 'table', component: './user/UserList' },
  {
    name: '质保单',
    icon: 'table',
    path: 'warranty',
    component: './warranty/WarrantyList'
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { path: '/admin/users', name: '用户管理', icon: 'users', component: './user/UserList' },
      { component: './404' },
    ],
  },
  {
    name: '案例',
    icon: 'table',
    path: 'cases',
    component: './cases/CasesList'
  },
  {
    name: '系统设置',
    icon: 'table',
    path: 'info',
    component: './info/InfoList'
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
