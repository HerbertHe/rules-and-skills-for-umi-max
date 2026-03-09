/**
 * 本地转发代理配置
 * 根据不同的环境，配置不同的代理目标地址
 * 用于解决不同环境的跨域问题
 */
export default {
  /**
   * 开发环境代理配置
   */
  dev: {
    '/api/': {
      target: '<dev_api_url>',
      ws: true,
      changeOrigin: true,
    },
  },
  /**
   * 测试环境代理配置
   */
  test: {
    '/api/': {
      target: '<test_api_url>',
      ws: true,
      changeOrigin: true,
    },
  },
  /**
   * 生产环境代理配置
   */
  prd: {
    '/api/': {
      target: '<prd_api_url>',
      ws: true,
      changeOrigin: true,
    },
  },
};
