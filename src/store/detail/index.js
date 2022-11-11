import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
// 封装游客身份模块-->生成一个随机字符串（不能在变了）
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()

}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, sKuId) {
        let result = await reqGoodsInfo(sKuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
 
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的解构
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 加上asyc，返回是一个Pr omise ,要么成功，要么失败
        // 当前这个函数如果执行返回Promise
        if(result.code==200){
            // 加入成功
        return "ok"
        }else{
            // 失败
            Promise.reject(new Error('faile'))
        }
        // 返回非空字符串  为成功
        // Promise.reject(new Error('faile'))  返回这个为失败
    }
}
// 简化数据而生
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        // 当前计算出的
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖的属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}