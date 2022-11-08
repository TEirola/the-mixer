<style src="./HomePage.scss" lang="scss"></style>
<script setup lang="ts">
import gsap from "gsap";
import { ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCocktailsStore } from "../../../stores/cocktails";
import Button from "../../atoms/button/Button.vue";
import Heading from "../../atoms/heading/Heading.vue";
import Text from "../../atoms/text/Text.vue";
import CocktailsList from "../../organisms/cocktailsList/CocktailsList.vue";

const router = useRouter();
const route = useRoute();
const cocktailsStore = useCocktailsStore();
const navBackground = ref();
const navListButton = ref<Ref[]>([]);

function setCategory(category: string | null) {
  if (category === null) return router.push({ query: { category: "" } });
  return router.push({ query: { category: category } });
}
console.log(
  navListButton.value,
  (navListButton.value as any).filter((button: any) =>
    button.classList.includes(route.query.category)
  )
);
gsap.to(navBackground.value, {
  x: (navListButton.value as any).filter((button: any) =>
    button.classList.includes(route.query.category)
  ).offsetLeft,
});
</script>

<template>
  <div class="homepage">
    <Heading tag="h1" :style="'heading-1'" class="title">The Mixer</Heading>

    <nav class="nav-list">
      <Button
        v-for="category, index in (cocktailsStore.categories as any).sort()"
        :key="index"
        type="button"
        @click="
          setCategory(route.query.category === category ? null : category)
        "
        :active="route.query.category === category"
        :class="category"
        ref="navListButton"
      >
        {{ category }}
      </Button>
    </nav>

    <CocktailsList :cocktails="(cocktailsStore.cocktails as any)" />
  </div>
</template>
