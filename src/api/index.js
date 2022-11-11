// 当前这个模块：API进行统一管理
import request from "./request";
import mockRequests from './mockAjax'
// 三级联动接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
// get 无参数
// 发请求:axios发请求返回结果Promise对象
export const reqCategoryList = () =>mockRequests.get('/list')
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner')

// 获取Floor
export const reqFloorList = () => mockRequests.get('/floor')
// 
// 获取搜索模块数据  地址：api/list  请求方式：post  参数：需要带参数
// 当前这个函数需要外部传递参数
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口  URL:/api/item/{sKuId} 请求方式：get
export const reqGoodsInfo = (sKuId) => request({ url: `/item/${sKuId}`, method: 'get' })

// 将产品添加到购物车中(获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

// 获取购物车列表数据接口
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' })

// 删除购物产品的接口
// URL:/api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品的选中状态
// URL:/api/cart/checkCart/{skuId}/{isChecked} methods:get
export const reqUpdateCheckedByid = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册
// URL:/api/user/passport/register   method:post  phone  code  password
export const reqUserRegister = (data) =>request({ url: '/user/passport/register', data, method: 'post' })

// 登录
// URL:/api/user/passport/login    method:post  phone   pasword
export const reqUserLogin=(data)=>request({url:'/user/passport/login',data,method:'post'})


// 获取用户信息（需要带着用户的token向服务器要用户信息
// URL:/api/user/passport/auth/getUserInfo    method:get
export const reqUserInfo=()=>request({url:`/user/passport/auth/getUserInfo`,method:'get'})

// 退出登录
// URL:/api/user/passport/logout get
export const reqLogout=()=>request({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
export const reqAddressInfo=()=>request({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取商品清单
// URL:/api/order/auth/trade   method:get
export const reqOrderInfo=()=>request({url:'/order/auth/trade'})


// 提交订单的接口
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo}   method:post
export const reqSubmitOrder=(tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})


// 获取支付信息
// URL:/api/payment/weixin/createNative/{orderId}   GET
export const reqPayInfo=(orderId)=>request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})


// 获取支付订单状态
export const reqPayStatus=(orderId)=>request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单列表
// URL:/api/order/auth/{page}/{limit}   get
export const reqMyOrderList=(page,limit)=>request({url:`/order/auth/${page}/${limit}`,method:"get"})