import baseApi, { allRequest } from './BaseApi';

// 提供用户信息接口
const api = {
  base: '/sysUser',
  login: '/sysUser/login',
  currentUser: '/sysUser/currentUser',
  updatePassword: '/sysUser/password',
  resetPassword: '/sysUser/resetPassword',
  refreshToken: '/sysUser/refreshToken',
};

const login = (parameter) => baseApi.post(api.login, parameter);
const currentUser = (parameter) => baseApi.get(api.currentUser, parameter);
const updatePassword = (parameter) => baseApi.put(api.updatePassword, parameter);
const resetPassword = (parameter) => baseApi.put(api.resetPassword, parameter);
const refreshToken = (parameter) => baseApi.get(api.refreshToken, parameter);

export default { ...allRequest(api.base), login, currentUser, updatePassword, resetPassword, refreshToken };
