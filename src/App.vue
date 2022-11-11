<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useCocktailsStore } from "./stores/cocktails";

const cocktailsStore = useCocktailsStore();

onMounted(() => {
  cocktailsStore.fetchCocktails();
});
</script>

<template>
  <RouterView />
</template>
