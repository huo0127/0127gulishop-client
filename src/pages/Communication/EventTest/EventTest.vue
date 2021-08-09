<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- html標籤身上添加原生的dom事件 -->
    <button @click="test($event)">test</button>
    <!-- 
      組件標籤身上添加原生dom事件，那麼這個事件就不再是原生dom事件而是自定義事件，只不過是件類名和原生的事件類型名一樣罷了。

      如果在組件標籤身上添加原生dom事件， 而且就想讓他是原生的事件是變為自定義事件，需要加事件描述符.native。
      而且這個事件是添加給了組件的根元素，就形成了事件委派。
    -->
    <Event1 @click.native="test1"></Event1>

    <!-- 
      在html標籤身上添加自定義事件，那麼無意義，沒啥用。
      自定義事件只能在組件標籤身上添加有意義。
     -->
    <button @xxx="test2">test2</button>
    <!--
      組件標籤身上添加自定義

      組件標籤身上添加的都是自定義事件，哪怕你寫的事件名和原生dom事件名一樣
      也是自定義事件。
      如果事件添加給了html元素，那就是原生dom事件。
      如果事件添加給了組件標籤，那就是自定義事件。
        -->
    <Event2 @xxx="test3($event)" @click="test4">test3</Event2>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  components: {
    Event1,
    Event2,
  },

  methods: {
    test(event){
      console.log(event.target.innerText)
    },
    test1(event){
      console.log(event.target.innerText)
    },
    test2(event){
      console.log(event)
    },
    test3(event){
      console.log(event)
    },
    test4(event){
      console.log(event)
    },
  }
}
</script>
