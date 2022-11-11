// 配置路由
// 路由的配置信息
// 路由懒加载的好处是高效，访问对应路由的时候才加载对应组件
export default [
    // 路由路径是小写
    {
        path: "/center",
        component:()=>import('@/pages/Center'),
        meta: {
            show: true
        },
        //    二级路由组件
        children: [{
            path: 'myorder',
            component:()=>import('@/pages/Center/myOrder')
        },
        {
            path: 'grouporder',
            component:()=>import('@/pages/Center/groupOrder')
        },
        {
            path: '/center',
            //重定向
            redirect: '/center/myorder'
        }
        ]
    },
    {
        path: "/iflashbuy",
        component:()=>import('@/pages/Iflashbuy'),
        meta: {
            show: true
        }
    },
    {
        path: "/clothing",
        component:()=>import('@/pages/Clothing'),
        meta: {
            show: true
        }
    },
    {
        path: "/paysuccess",
        component:()=>import('@/pages/PaySuccess'),
        meta: {
            show: true
        }
    },
    {
        path: "/shopcart",
        component:()=>import('@/pages/ShopCart'),
        meta: {
            show: true
        }
    },
    {
        path: "/pay",
        component:()=>import('@/pages/Pay'),
        meta: {
            show: true
        },
        beforeEnter:(to,from,next)=>{
            if(from.path=="/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component:()=>import('@/pages/Trade'),
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if (from.path == "/shopcart") {
                next()
            } else {
                // 其他的路由组件而来，停留在当前
                next(false)
            }
        }
    },
    {
        path: "/detail/:sKuId",
        component:()=>import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: "/addcartsuccess",
        component:()=>import('@/pages/AddCartSuccess'),
        meta: { show: true },
        name: 'addcartsuccess'

    },
    {
        path: "/home",
        component:()=>import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        path: "/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta: {
            show: true
        },
        name: "search",
        // 路由组件能不能传props数据？
        // 布尔值写法：params
        // props:true,
        // 对象写法,额外给路由传递一些props
        // props:{a:1,b:2}
        // 函数写法：可以params参数，query参数，通过props传递给路由组件
        // props: ($route) => {
        //     return { keyword: $route.params.keyword, k: $route.query.k }
        // }
    },
    {
        path: "/login",
        component:()=>import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component:()=>import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    // 重定向，在项目跑起来的时候，放问/立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]
