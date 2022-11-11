<style src="./CocktailsList.scss" lang="scss"></style>
<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CocktailsListItem from "../../molecules/cocktailListItem/CocktailsListItem.vue";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const props = defineProps<{
  cocktails: Array<{
    id: string;
    image: string;
    title: string;
    category: string;
  }>;
}>();

const parsedCocktails = ref();

watch(route, (value) => {
  value.query.category?.toString();

  setTimeout(() => {
    if (value.query.category?.toString() === "") {
      parsedCocktails.value = props.cocktails;
    } else {
      parsedCocktails.value = props.cocktails.filter(
        (cocktail) => cocktail.category === value.query.category?.toString()
      );
    }
  }, 200);
});

onMounted(() => {
  setTimeout(() => {
    if (!route.query.category || route.query.category?.toString() === "") {
      parsedCocktails.value = props.cocktails;
    } else {
      parsedCocktails.value = props.cocktails.filter(
        (cocktail) => cocktail.category === route.query.category?.toString()
      );
    }
  }, 200);
});
</script>

<template>
  <div class="list" ref="listElement">
    <CocktailsListItem
      v-for="cocktail in parsedCocktails"
      :key="cocktail.id"
      :id="cocktail.id"
      :image="cocktail.image"
      :copy="cocktail.title"
      :category="cocktail.category"
      ref="listItem"
    />
  </div>
</template>
