import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from "./detail"
import shopcart from './shopcart'
import user from "./user"
import trade from "./trade"
// 对外暴露Store类的一个实例
export default new Vuex.Store({
     modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
     }
})