//配置路由
import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './router'

// 使用插件
Vue.use(VueRouter)

// 引入store
import store from "@/store"


// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originPeplace = VueRouter.prototype.replace;


// 重写push | replace
// 1.告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 2.成功回调
// 3.失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call || apply区别：相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resole, reject) {
    if (resole && reject) {
        originPeplace.call(this, location, resole, reject)
    } else {
        originPeplace.call(this, location, () => { }, () => { })
    }
}



let Router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0，代表的滚动条在最上方
        return { x: 0, y: 0 }
    }
})




// 全局守卫 ：前置守卫（在路由跳转之前进行判断
Router.beforeEach(async (to, from, next) => {
    // next()
    //    用户登录了，才会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login'||to.path=='/register') {
            next('/home')
        } else {
            // 登录了，去的不是login
            if (name) {
                next()
            } else {
                // 没有用户信息,派发action让仓库存储用户信息在跳转
                try {
                    await store.dispatch('getUserInfo')
                    // 放行
                    next()
                } catch (error) {
                    //   token失效了,获取不到用户信息重新登录
                    // 1.清除token
                   await store.dispatch('userLogout')
                   next('/login')
                }
             }

        }
    } else {
        // 未登录,你不能去交易相关，不能去支付相关pay\paysuccess,不能去个人中心        next()
        console.log()
        // 未登录去上面这些路由，---跳转到登录
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把未登录的时候想去而没有去成的信息，存储于地址栏中（路由）
            next('/login?redirect='+toPath)
        }else{
            // 去的不是上面这些路由（home\search\shopCart)--放行
            next()
        }
    }
})

export default Router;
