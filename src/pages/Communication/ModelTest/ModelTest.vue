<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>哇矮哩捏{{ msg }}</span>
    <br />

    <!-- v-model本質其實是單向數據綁定v-bind和input事件的組合 -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>哇矮哩捏{{ msg }}</span>

    <!-- 表單類元素: input select textarea -->

    <!-- 
      v-model在組件標籤身上的作用 
      :value="msg"在html標籤身上是單向數據綁定
      :value="msg"在組件標籤身上是props組件通信
      @input html標籤身上是原生dom事件
      @input 組件標籤身上是自定義事件
      -->
    <!-- 達到父子數據是同步的 -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <CustomInput v-model="msg"></CustomInput>

    <el-input v-model="msg"></el-input>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  components: {
    CustomInput
  },
  data(){
    return{
      msg:'徐瑋甯'
    }
  }
}
</script>
