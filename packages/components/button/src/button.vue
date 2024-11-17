<template>
    <button style="background-color: aquamarine; color: blue;" @click="test">这是个按钮</button>
</template>
<script lang="ts" setup>
defineOptions({
    name:  "XYButton"
})
function test() {
    console.log('test')
}
</script>