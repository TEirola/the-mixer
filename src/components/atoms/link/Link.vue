<script setup lang="ts">
const linkTarget = ["_self", "_blank"] as const;
type LinkTarget = typeof linkTarget[number];

type Props = {
  href: string | object;
  target: LinkTarget;
};

defineProps<Props>(),
  {
    href: "",
    target: "_self",
  };
</script>

<template>
  <router-link :to="href" rel="noreferrer noopener">
    <slot />
  </router-link>
</template>
