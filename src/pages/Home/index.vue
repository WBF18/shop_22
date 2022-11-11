<template>
  <!-- 三级联动全局组件 已经注岫为全局组件 -->
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 非路由组件在使用的时候分为三大步：定义、注册、使用
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import {mapGetters} from 'vuex'
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
    //获取用户信息在首页展示
    this.$store.dispatch("getUserInfo");
  },
  computed: {
      ...mapGetters(['floorList'])
  },
};
</script>

<style>
</style>