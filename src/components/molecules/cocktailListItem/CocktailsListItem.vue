<script setup lang="ts">
import Heading from "../../atoms/heading/Heading.vue";
import Image from "../../atoms/image/Image.vue";
import Pill from "../../atoms/pill/Pill.vue";

defineProps<{
  id: string;
  copy: string;
  image: string;
  category: string;
}>();
</script>
<style src="./CocktailsListItem.scss" lang="scss"></style>

<template>
  <router-link :to="`/cocktail-detail/${id}`" class="list-item">
    <Image :src="image" />

    <div class="list-item-content">
      <Pill>{{ category }}</Pill>
      <Heading tag="h3" :style="'heading-3'" class="list-title">
        {{ copy }}
      </Heading>
    </div>
  </router-link>
</template>
