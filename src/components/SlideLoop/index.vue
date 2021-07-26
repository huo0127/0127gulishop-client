<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(banner, index) in bannerList"
        :key="banner.id"
      >
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "",
  props: ["bannerList"],
  watch: {
    bannerList: {
      immediate: true, //這裡加它她沒甚麼用, 就是為了讓和floor的代碼一致
      handler(newVal, oldVal) {
        /*
        當數據一旦有變化, 那麼我們就去實例化swiper, 但是發現不行
        我們就得考慮是不是頁面還沒有形成呢? 答案是肯定的, 也就是說有了數據
        上面頁面才開始v-for形成結構
        得等結構完全形成之後再來實例化

        在最近的一次更新完成之後, 執行nextTick當中傳遞的回調函數
        nextTick是頁面最近的一次更新完成之後才會執行
        updated是只要頁面有數據更新, 那麼就執行, 執行不關心是不是最近一次更新
      */
        this.$nextTick(() => {
          new Swiper(this.$refs.bannerSwiper, {
            // direction: "vertical", // 垂直切换选项 , 去掉就代表輪播是水平
            loop: true, // 循环模式选项    無縫的開關

            // 如果需要分页器   小圓點
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
    },
  },
};
</script>

<style></style>
