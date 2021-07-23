<template>
  <div>
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
};
</script>

<style></style>
