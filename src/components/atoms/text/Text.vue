<script setup lang="ts">
const textTag = ["p", "span"] as const;
type TextTag = typeof textTag[number];

defineProps<{
  tag: TextTag;
}>();
</script>
<style src="./Text.scss" lang="scss"></style>

<template>
  <component :is="tag" class="text">
    <slot />
  </component>
</template>
