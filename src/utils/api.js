import request from './request'

const ApiRootUrl = 'http://web.lytxmd.com/weapp/'

const api = {
  // 使用util的request方法，字符串变量即可
  // 微信登录
  AuthLoginByWeixin: ApiRootUrl + 'wx/weapp/user/openid',
  // 获取微信统一下单prepay_id
  PayPrepayId: ApiRootUrl + 'pay/prepay',
  // （pay单独使用）获取微信统一下单prepay_id
  PayPrepayIdFunc: (paramObj) => request.get('pay/prepay', paramObj, {
    baseURL: ApiRootUrl
  }),
  // 统计商品总数
  getGoodsCount: (r) => request.get('goods/count', null, {
    baseURL: ApiRootUrl
  }),
  // 添加商品到购物车
  CartAdd: (paramObj) => request.post('cart/add', paramObj, {
    baseURL: ApiRootUrl
  })
}

export default api
