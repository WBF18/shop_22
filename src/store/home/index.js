import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
// home模块的小仓库
const state = {
    // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组{根据接口返回值初始化的}
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floorList的数据
    floorList:[]
}
const actions = {
    // 通过API里面的接口函数调用向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result)
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            // 提交mutation
            commit('GETFLOORLIST',result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}

// 计算属性
const getters = {
    floorList(){
        return state.floorList
    }
}

export default {

    state,
    mutations,
    actions,
    getters
}