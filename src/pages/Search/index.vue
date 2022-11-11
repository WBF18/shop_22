<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread  面包屑  带有x结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌信息的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>

            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up-': isAsc, 'icon-down-': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTow }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTow"
                      class="iconfont"
                      :class="{ 'icon-up-': isAsc, 'icon-down-': isDesc }"
                    ></span
                  ></a>
                  <!-- 切换频繁用v-show -->
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list" v-if="goodsList">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候切记别忘记带id(params)参数 -->
                    <router-link :to="`/detail/${good.id}`">
                    <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong> 
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
          <!-- pageNo 当前页   pageSize一页有多少个    total 总共有多少个    countinues 连续页多少个-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState} from "vuex";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  //当组件挂载完毕之前执行一次   先与mounted之前
  beforeMount() {
    // this.searchParams.category1Id=this.$route.query.category1Id
    // this.searchParams.category2Id=this.$route.query.category2Id
    // this.searchParams.category3Id=this.$route.query.category3Id
    // this.searchParams.categoryName=this.$route.query.categoryName
    // this.searchParams.keyword=this.$route.query.keyword
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // 在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求前，把参数整理好，服务器就会返回查询的数据
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        // 产品相应的id
        category2Id: "",
        category3Id: "",
        // 产品名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 第几页
        pageNo: 1,
        // 每一页条数
        pageSize: 10,
        // 平台属性的操作
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  mounted() {
    // 先测试接口返回的数据格式
    this.getData();
  },
  computed: {
    // mapGetters里面的写法：传递的是数组，因为getters计算是没有划分模块【home,search]
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTow() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    // 获取search模块产品一共多少数据
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods: {
    // 向服务器发请求获取search模块数据
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要改，进行路由跳转
      // 严谨：本意是删除query，如果路径出来params参数，应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      // 再发请求
      this.getData();
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 自定义事件的回调
    trademarkInfo(trademark) {
      // 整理品牌字段的参数，ID:品牌名
      //  console.log(trademark)
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性地方回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      //  参数格式：整理
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) == -1) {
        // indexOf 遍历数组里有没有这个字符串有返回1，有，没有返回-1，没有
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    // 删除售买属性
    removeAttr(index) {
      console.log(index);
      this.searchParams.props.splice(index, 1);
      // 参数1：删那个   参数2：删几个
      this.getData();
    },
    // 排序的操作
    changeOrder(flag) {
      // flag形参，代表用户点击的是综合1  还是价格2
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder=""
      if(flag==originFlag){
        newOrder=`${originFlag}:${originSort=="desc"?"asc":"desc"}`
         this.searchParams.order=newOrder
        this.getData()
      }else{
        // 点击的是价格
        newOrder=`${flag}:${'desc'}`
        this.searchParams.order=newOrder
         this.getData()
      }
      // let order=this.searchParams.order
      // order==`${flag}:desc`?(order=`${flag}:asc`):(order=`${flag}:desc`)
    },
    // 这是自定义事件的回调函数---获取当前第几页
    getPageNo(pageNo){
      // 整理带给服务器的参数
      this.searchParams.pageNo=pageNo
      // 再次发请求
      this.getData()
    }
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 监听属性
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      //  每一次请求完毕，应该把相应的1，2，3级分类的id置空，让他接受下一次相应的1，2，3id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 设置为undefined不会提交给服务器，提高性能
    },
  },
};   
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>