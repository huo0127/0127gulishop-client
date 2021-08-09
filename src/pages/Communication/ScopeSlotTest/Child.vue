<template>
  <div>
    <h2>我愛你徐瑋甯</h2>
    <!-- 插槽，就是給父組件到時候使用子組件，留地坑，需要父組件傳遞東西填這個坑 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="xxx"></slot>

    <!-- 當一個組件中插槽有很多個，默認插槽一般只能有一個，其餘都得是具名插
          槽 -->
  </div>
</template>

<script>
export default {};
</script>

<style></style>
