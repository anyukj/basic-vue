import baseApi from './BaseApi';

const api = {
  metrics: '/actuator/metrics',
  prometheus: '/actuator/prometheus',
};

export default api;

export const getMetrics = (parameter) => baseApi.item(api.metrics, parameter);
export const getPrometheus = (parameter) => baseApi.get(api.prometheus, parameter);
