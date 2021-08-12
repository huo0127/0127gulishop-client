<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <!-- :todo="todo" 不是props組件通信，是作用域插槽通信  -->
      <!--  {{ todo.text }} 裡面啥也沒有，結構由父組件說的算 -->
      <slot :todo="todo" :index="index"> {{ todo.text }}</slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    todos: Array,
  },
};
</script>
