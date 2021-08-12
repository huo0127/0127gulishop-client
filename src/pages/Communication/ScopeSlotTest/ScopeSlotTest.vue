<template>
  <div>
    <!-- 默認插槽和具名插槽 -->
    <!-- 第一個組件 -->
    <Child>
      <template>
        <!-- 這裡面寫的就是父組件傳給子組件的html/css結構 -->
        <p>嘿嘿</p>
      </template>

      <template slot="xxx">
        <a href="">呵呵</a>
      </template>
    </Child>

    <!-- 第二個組件 -->
    <Child>
      <template>
        <!-- 這裡面寫的就是父組件傳給子組件的html/css結構 -->
        <button>按鈕</button>
      </template>
    </Child>

    <!-- 作用 域插槽的演示 -->

    <!-- 
      作用域插槽完成的事情

      父子之間通信

      1、數據是在父組件當中。
      2、數據傳遞給子組件進行展示v-for。
      3、子組件在展示數據的過程中，數據的結構是由父組件說的算。
     -->

    <!-- <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2> -->
    <List :todos="todos">
      <template slot-scope="scopeProps">
        -->
        <!-- scopeProps 最終是一個對象，接收子組件作用域插槽回傳給父組件
              的數據組成的對象。    
          {
            todo:todo
          }
         -->
        <span
          :style="{ color: scopeProps.todo.isComplete ? 'green' : 'black' }"
        >
          {{ scopeProps.todo.text }}
        </span>
      </template>
    </List>

    <hr />

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :todos="todos">
      <template slot-scope="{ todo, index }">
        <!-- 
        {
          todo:todo,
          index:index
        } 
        -->
        <h2 :style="{ color: index % 2 === 0 ? 'blue' : 'green' }">
          <span> {{ index + 1 }}</span>
          {{ todo.text }}
        </h2>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'

import Child from '@/pages/Communication/ScopeSlotTest/Child'

  export default {
    name: 'ScopeSlotTest',

    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List,
      Child
    }
  }
</script>
