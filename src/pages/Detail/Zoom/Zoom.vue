<template>
  <div class="spec-preview">
    <!-- "TypeError: Cannot read property '0' of undefined"
          會報這個錯，頁面又沒問題 -->
    <!-- <img :src="imgList[0].imgUrl" /> -->
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imgList"],
  mounted() {
    this.$bus.$on("changeDefaultIndex", this.changeDefaultIndex);
  },
  data() {
    return {
      defaultIndex: 0,
    };
  },
  computed: {
    defaultImg() {
      return this.imgList[this.defaultIndex] || {};
    },
  },
  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index;
    },
    move(event) {
      //鼠標動，蒙版動，想辦法去讓蒙版跟著動
      //轉化為根據鼠標的位置，求蒙版的位置
      //event.client  相對視口左上角，視口是不變的
      //event.pageX   相對頁面左上角
      //event.offsetX 相對元素本身左上角
      let mask = this.$refs.mask;
      let bigImg = this.$refs.bigImg;

      //獲取鼠標位置
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;

      //根據鼠標位置和蒙版的寬度計算蒙版的位置
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;

      //設置蒙版位置之前，把邊界限定一下
      if (maskX < 0) {
        maskX = 0;
      } else if (maskX > mask.offsetWidth) {
        maskX = mask.offsetWidth;
      }

      if (maskY < 0) {
        maskY = 0;
      } else if (maskY > mask.offsetHeight) {
        maskY = mask.offsetHeight;
      }

      //設置蒙版的位置讓蒙版動
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";

      //蒙版動，大圖動，大圖剛好移動蒙版的兩倍
      bigImg.style.left = -2 * maskX + "px";
      bigImg.style.top = -2 * maskY + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
