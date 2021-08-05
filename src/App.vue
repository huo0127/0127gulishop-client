<template>
  <div>
    <!-- <el-button type="danger" icon="el-icon-delete"></el-button> -->
    <Header></Header>
    <router-view></router-view>
    <!-- 這樣寫是可以的, 但後期頁面多, 就會寫得很長 -->
    <!-- <Footer
      v-show="$route.path !== '/login' && $route.path !== '/register'"
    ></Footer> -->
    <Footer v-show="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    //在這發請求獲取三級分類的數據, 那麼就只會發一次, 而且一次就夠了, 因為數據不變
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style></style>
