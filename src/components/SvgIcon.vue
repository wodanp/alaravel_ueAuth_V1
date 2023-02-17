<script setup lang="ts">
const props = withDefaults(defineProps<{
    svg: string,
    size?: number,
    fill?: string,
    class?: string
}>(), {
    size: 24,
    fill: 'currentColor',
    class: ''
})

// tabler default
// xmlns: 'http://www.w3.org/2000/svg',
//   width: 24,
//   height: 24,
//   viewBox: '0 0 24 24',
//   fill: 'none',
//   stroke: 'currentColor',
//   'stroke-width': 2,
//   'stroke-linecap': 'round',
//   'stroke-linejoin': 'round',
</script>



<template>
    <svg aria-hidden="true" :fill="props.fill" :width="size" :height="size" :class="class">
        <use :xlink:href="`#svg-${props.svg}`" />
    </svg>
</template>