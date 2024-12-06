<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { dayjs, XYButton } from 'xinyue-ui';
// console.log('isNumber',isNumber('1213'))
// console.log(dayjs().format('YYYY-MM-DD'))
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <XYButton>按钮</XYButton>
  <!-- <XYInput></XYInput> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
