import { request } from '@umijs/max';
import { IDemo } from './model';

/**
 * 获取 demo 数据
 * @param params - 请求参数
 * @returns 获取到的 demo 数据
 */
export const getDemo = (params: { id: string }) => {
  return request<API.BaseResponse<IDemo>>('/api/demo', {
    method: 'GET',
    params,
  });
};
