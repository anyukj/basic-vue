import baseApi, { allRequest } from './BaseApi';

// 提供菜单信息接口
const api = {
  base: '/sysMenu',
  allMenu: '/sysMenu/allMenu',
  currentUserMenu: '/sysMenu/currentUserMenu',
};

const allMenu = (parameter) => baseApi.get(api.allMenu, parameter);
const currentUserMenu = (parameter) => baseApi.get(api.currentUserMenu, parameter);

export default { ...allRequest(api.base), allMenu, currentUserMenu };
