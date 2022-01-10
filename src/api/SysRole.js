import baseApi, { allRequest } from './BaseApi';

// 提供角色信息接口
const api = {
  base: '/sysRole',
  assignUsers: '/sysRole/assignUsers',
  getRelationUsers: '/sysRole/getRelationUsers',
  assignMenus: '/sysRole/assignMenus',
  getRelationMenus: '/sysRole/getRelationMenus',
};

const assignUsers = (parameter) => baseApi.post(api.assignUsers, parameter);
const getRelationUsers = (parameter) => baseApi.get(api.getRelationUsers, parameter);

const assignMenus = (parameter) => baseApi.post(api.assignMenus, parameter);
const getRelationMenus = (parameter) => baseApi.get(api.getRelationMenus, parameter);

export default { ...allRequest(api.base), assignUsers, getRelationUsers, assignMenus, getRelationMenus };
