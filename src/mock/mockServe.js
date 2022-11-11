// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来
// webpack默认对外暴露的：图片，JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
import list from './list.json'
// mock数据:1.请示地址，2.请求数据
Mock.mock("/mock/banner",{code:200,data:banner})  
// 模拟轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})

// 模拟列表数据
Mock.mock("/mock/list",{code:200,data:list})