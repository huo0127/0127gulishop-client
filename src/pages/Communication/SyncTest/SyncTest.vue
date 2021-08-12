<template>
  <div>
    小明的爸爸现在有{{ money }}元

    <h2>不使用sync修改符</h2>
    <Child :money="money" @update:money="money = $event"></Child>

    <h2>使用sync修改符</h2>
    <Child :money.sync="money"></Child>

    <h2>使用v-model修改符</h2>
    <!-- <Child2 :value="money" @input="money = $event"></Child2> -->
    <Child2 v-model="money"></Child2>

    <!-- 
      .sync和v-model用在組件標籤上，都可以達到父子組件數據同步。
      區別：
        .sync達到數據同步：子組件內部不是表單類元素
        v-model達到數據同步：子組件內部一定是表單內元素
     -->
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
  name: 'SyncTest',
  data(){
    return{
      money:1000
    }
  },
  components: {
    Child,
    Child2
  }
}
</script>
