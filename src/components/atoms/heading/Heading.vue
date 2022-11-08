<script setup lang="ts">
const headingTag = ["h1", "h2", "h3", "h4", "h5"] as const;
const headingStyle = [
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
] as const;
type HeadingTag = typeof headingTag[number];
type HeadingStyle = typeof headingStyle[number];

defineProps<{
  tag: HeadingTag;
  style: HeadingStyle;
}>();
</script>
<style src="./Heading.scss" lang="scss"></style>

<template>
  <component
    :is="tag"
    :class="{
      ['heading']: true,
      [style]: true,
    }"
  >
    <slot />
  </component>
</template>
