<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <!-- <div class="swiper-container" ref="bannerSwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(banner, index) in bannerList"
              :key="banner.id"
            >
              <img :src="banner.imgUrl" />
            </div>
          </div> -->
        <!-- 如果需要分页器 -->
        <!-- <div class="swiper-pagination"></div> -->

        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> -->
        <SlideLoop :bannerList="bannerList"></SlideLoop>

        <!-- </div> -->
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Swiper from "swiper"; //引入swiper的js
// import "swiper/css/swiper.css"; //引入swiper的js, 一般直接在main裡面引入

export default {
  name: "ListContainer",
  mounted() {
    this.$store.dispatch("getBannerList"); //異步代碼

    /*
    掛載完成以後去實例化swiper
    這樣是不行的, 因為實例化的時候, 頁面顯示還不一定成功
    按道理來說掛載完成, 頁面的dom結構就算形成完成, 在此去實例化應該是可以的, 但我們要認清楚, 這個頁面當中結構中的swiper-slide, 是根據請求回來的數據, 動態創建生成的,所以我們必須得保證請求數據回來之後, 在去實例化,
    有了數據, slide的div才會動態創建ok
  */

    //同步代碼, 首先執行, 他是在最終結構形成之前就實例化了, 所以搞不定
    // new Swiper(".swiper-container", {
    //   // direction: "vertical", // 垂直切换选项 , 去掉就代表輪播是水平
    //   loop: true, // 循环模式选项    無縫的開關

    //   // 如果需要分页器   小圓點
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },

    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },

    //   // 如果需要滚动条
    //   // scrollbar: {
    //   //   el: ".swiper-scrollbar",
    //   // },
    // });

    //解決方法: 最簡單的辦法就是定時器, 但方法不完美
    // setTimeout(() => {
    //   new Swiper(this.$refs.bannerSwiper, {
    //     // direction: "vertical", // 垂直切换选项 , 去掉就代表輪播是水平
    //     loop: true, // 循环模式选项    無縫的開關

    //     // 如果需要分页器   小圓點
    //     pagination: {
    //       el: ".swiper-pagination",
    //     },

    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },

    //     // 如果需要滚动条
    //     // scrollbar: {
    //     //   el: ".swiper-scrollbar",
    //     // },
    //   });
    // }, 2000);
  },

  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
  // watch: {
  //   bannerList: {
  //     immediate: true, //這裡加它她沒甚麼用, 就是為了讓和floor的代碼一致
  //     handler(newVal, oldVal) {
  //       /*
  //       當數據一旦有變化, 那麼我們就去實例化swiper, 但是發現不行
  //       我們就得考慮是不是頁面還沒有形成呢? 答案是肯定的, 也就是說有了數據
  //       上面頁面才開始v-for形成結構
  //       得等結構完全形成之後再來實例化

  //       在最近的一次更新完成之後, 執行nextTick當中傳遞的回調函數
  //       nextTick是頁面最近的一次更新完成之後才會執行
  //       updated是只要頁面有數據更新, 那麼就執行, 執行不關心是不是最近一次更新
  //     */
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.bannerSwiper, {
  //           // direction: "vertical", // 垂直切换选项 , 去掉就代表輪播是水平
  //           loop: true, // 循环模式选项    無縫的開關

  //           // 如果需要分页器   小圓點
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },

  //           // 如果需要滚动条
  //           // scrollbar: {
  //           //   el: ".swiper-scrollbar",
  //           // },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(~@/assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
