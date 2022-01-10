import { UserLayout, BasicLayout, BlankLayout } from '@/components/layouts';

export const routerMap = [
  {
    path: '/user',
    hidden: true,
    redirect: '/user/login',
    component: UserLayout,
    children: [
      {
        path: '/user/login',
        name: 'UserLogin',
        meta: { title: '用户登录' },
        component: () => import('@/views/user/Login'),
      },
    ],
  },
  {
    path: '/',
    name: '/',
    hidden: false,
    redirect: '/home',
    meta: { title: '首页' },
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页', icon: 'home' },
        component: () => import('@/views/home/HomeIndex'),
      },
      {
        path: '/system',
        name: 'System',
        meta: { title: '系统管理', icon: 'setting' },
        component: BlankLayout,
        children: [
          {
            path: '/system/user',
            name: 'SystemUser',
            meta: { title: '用户管理' },
            component: () => import('@/views/user/UserList'),
          },
          {
            path: '/system/role',
            name: 'SystemRole',
            meta: { title: '角色管理' },
            component: () => import('@/views/role/RoleList'),
          },
          {
            path: '/system/resource',
            name: 'SystemResource',
            meta: { title: '资源管理' },
            component: () => import('@/views/home/HomeIndex'),
          },
          {
            path: '/system/menu',
            name: 'SystemMenu',
            meta: { title: '菜单管理' },
            component: () => import('@/views/menu/MenuIndex'),
          },
          {
            path: '/system/dictionary',
            name: 'SystemDictionary',
            meta: { title: '字典管理' },
            component: () => import('@/views/dictionary/DictionaryList'),
          },
          {
            path: '/system/love',
            name: 'SystemLove',
            meta: { title: 'Love' },
            component: () => import('@/views/home/HomeIndex'),
          },
        ],
      },
      {
        path: '/notification',
        name: 'Notification',
        hidden: true,
        redirect: '/notification/notice',
        meta: { title: '消息通知' },
        component: () => import('@/views/notification/Index.vue'),
        children: [
          {
            path: '/notification/notice',
            name: 'NotificationNotice',
            meta: { title: '消息通知' },
            component: () => import('@/views/notification/Notice.vue'),
          },
          {
            path: '/notification/message',
            name: 'NotificationMessage',
            meta: { title: '个人消息' },
            component: () => import('@/views/notification/Message.vue'),
          },
        ],
      },
      {
        path: '/user/Personal',
        name: 'UpdatePersonal',
        hidden: true,
        meta: { title: '个人中心', icon: 'user' },
        component: () => import('@/views/user/Personal.vue'),
      },
      {
        path: '/exception/403',
        name: 'Exception403',
        meta: { title: '403' },
        component: () => import('@/views/exception/403.vue'),
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        meta: { title: '404' },
        component: () => import('@/views/exception/404.vue'),
      },
    ],
  },
];
