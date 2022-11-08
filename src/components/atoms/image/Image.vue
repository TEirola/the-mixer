<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
}>();
</script>
<style src="./Image.scss" lang="scss"></style>

<template>
  <img :alt="alt" :src="src" class="image" />
</template>
