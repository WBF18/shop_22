<template>
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">猜你喜欢</h3>
        <a href="javascript:;" class="fr tip changeBnt">换一换</a>
      </div>
      <div class="bd">
        <ul class="favourate">
          <li>
            <img src="./images/1.jpg" alt="" />
            <div class="like-text">
              <p>Redmi K50 天玑8100 2K柔性直屏 OIS光学防抖 67W快充</p>
              <h3>￥2499.00</h3>
            </div>
          </li>
          <li>
            <img src="./images/2.jpg" alt="" />
            <div class="like-text">
              <p>三星 SAMSUNG Galaxy S22 超视觉夜拍系统超清夜景</p>
              <h3>￥3399.00</h3>
            </div>
          </li>
          <li>
            <img src="./images/3.jpg" alt="" />
            <div class="like-text">
              <p>一加Ace竞速版，定制版天玑8100-MAX，5000mAh超大电池</p>
              <h3>￥3799.00</h3>
            </div>
          </li>
          <li>
            <img src="./images/4.jpg" alt="" />
            <div class="like-text">
              <p>华为 H⁠UAWEI Mate 50E 直屏旗舰 超光变XMAGE影像</p>
              <h3>￥3999.00</h3>
            </div>
          </li>
          <li>
            <img src="./images/5.jpg" alt="" />
            <div class="like-text">
              <p>vivo iQOO Neo7 12GB 几何黑 天玑9000+ 独显芯片Pro+ </p>
              <h3>￥3299.00</h3>
            </div>
          </li>
          <li>
            <img src="./images/6.jpg" alt="" />
            <div class="like-text">
              <p>荣耀X40 GT 骁龙888旗舰芯 144Hz高刷电竞屏 66W超级快充 </p>
              <h3>￥2099.00</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.like {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      overflow: hidden;

      .fl {
        float: left;
        font-size: 20px;
        line-height: 30px;
      }

      .fr {
        float: right;
        background-image: url(./images/icons.png);
        width: 66px;
        height: 25px;
        background-position: 182px -104px;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        text-decoration: none;
      }
    }

    .bd {
      .favourate {
        border: 1px solid #e4e4e4;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;

        li {
          height: 250px;
          margin: 0 -1px;
          overflow: hidden;
          background: #fff;
          position: relative;
          width: 16.667%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          img {
            width: 142px;
            height: 142px;
            transition: all 400ms;

            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }

          .like-text {
            padding: 0;
            width: 142px;
            border-right: 1px solid #e4e4e4;

            p {
              margin: 5px 0;
            }

            h3 {
              color: #df3033;
              font-size: 20px;
              line-height: 30px;
              margin: 9px 0;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>