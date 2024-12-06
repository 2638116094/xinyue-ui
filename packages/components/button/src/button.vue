<template>
    <component 
        :is="tag" 
        ref="_ref"
        v-bind="_props"
        :class="buttonKls"
        :style="buttonStyle"
        @click="handleClick">
        <template v-if="loading">
            <slot v-if="$slots.loading" name="loading" />
        </template>
        <span  :class="{}">
            <slot />
        </span>
    </component>
    <!-- <button style="background-color: aquamarine; color: blue;" @click="test">这是个按钮</button> -->
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { buildProps } from './button'
defineOptions({
    name:  "XYButton"
})
const props = defineOptions(buildProps)
function test() {
    console.log('test')
}
</script>