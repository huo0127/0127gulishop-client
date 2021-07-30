<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img
          :src="img.imgUrl"
          :class="{ active: index === defaultIndex }"
          @click="changeDefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0,
    };
  },
  methods: {
    changeDefaultIndex(index) {
      //讓框框跟著跑
      this.defaultIndex = index;
      //把當前這個index傳遞給zoom
      this.$bus.$emit("changeDefaultIndex", index);
    },
  },
  watch: {
    ImageList: {
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
          new Swiper(this.$refs.imgSwiper, {
            slidesPerView: 4, //一個視圖放幾張
            slidesPerGroup: 4, //切換一組，幾張圖片

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
