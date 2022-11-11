import Vue from 'vue'
import App from './App.vue'

// 三级联动组件+全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import { Button, MessageBox } from 'element-ui';
// 注册全局组件
Vue.component(Button.name, Button)
// 1.全局组件的名字，2.哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入路由 
import router from '@/router'
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false


import axios from 'axios'
// 引入mock文件
import '@/mock/mockServe'
axios.defaults.baseURL="http://locahost:6103"


// 引入Swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面的全部请求函数
// 统一引入 
import * as API from '@/api'

// 引入插件
import VueLazyload from 'vue-lazyload'
import Psyduck from '@/assets/load.gif'
// 安装1.3.3版本
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:Psyduck
})

//引入表单校验插件 
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由，底下的写法kv一致省略【router】小写的
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store

}).$mount('#app')
