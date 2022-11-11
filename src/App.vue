<template>
  <div>
    <Header />
    <!-- 路由组件出口的地方  -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录，注册隐藏 -->

    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search'"/> -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action获取商品分类的三级列表数据 
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
