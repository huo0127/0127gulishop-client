<template>
  <a href="javascript:;" :title="title" style="margin-right:10px">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: "",
  props: ["title"],
  mounted() {
    // this.$attr就是父組件傳遞過來的所有屬性(除了props接收的以及style和class)組成的對象
    // this.$listeners 就是父組件給子組件綁定的所有事件監聽組成的對象
    // 通常使用他們就是為了對一個組件進行二次封裝
    console.log(this.$attr, this.$listeners);
  },
};
</script>
