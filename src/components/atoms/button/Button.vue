<script setup lang="ts">
const buttonType = ["button", "reset", "submit"] as const;
type ButtonType = typeof buttonType[number];

defineProps<{
  type?: ButtonType;
}>();
</script>
<style src="./Button.scss" lang="scss"></style>

<template>
  <button :type="type" class="button">
    <slot />
  </button>
</template>
