import axios from 'axios';
import router from '@/router';
import { message } from 'ant-design-vue';
import { getToken } from '@/utils/storageUtil';
import qs from 'qs';

// 创建 axios 实例
const service = axios.create({
  timeout: 60000, // 请求超时时间
  baseURL: '/api',
});

// request请求拦截器
service.interceptors.request.use(
  (config) => {
    // 请求get的数组统一使用repeat
    config.paramsSerializer = (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
    // 设置token
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// response响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.success && response.data.success === false) {
      return Promise.reject(response.data);
    } else if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      message.error(response.data.message || '未知错误');
      return Promise.reject(response.data);
    }
  },
  (error) => {
    if (error.response.status === 401) {
      router.push(`/user/login?redirect=${router.app.$route.path}`);
      message.error('用户未登录或登录超时');
    } else if (error.response.status === 403) {
      router.push('/exception/403');
      message.error('没有权限访问');
    } else {
      message.error(error.response.data.message || '未知错误');
    }
    return Promise.reject(error.response);
  },
);

export default service;
