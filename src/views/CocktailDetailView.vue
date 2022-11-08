<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Heading from "../components/atoms/heading/Heading.vue";
import Image from "../components/atoms/image/Image.vue";
import Text from "../components/atoms/text/Text.vue";
import IngredientsList from "../components/molecules/ingredientsList/IngredientsList.vue";
import { useCocktailsStore } from "../stores/cocktails";

const cocktailsStore = useCocktailsStore();
const title = ref("");
const imageSrc = ref("");
const ingredients = ref([]);
const measurements = ref([]);
const instructions = ref("");
const glass = ref("");
const route = useRoute();

onMounted(async () => {
  await cocktailsStore.fetchIngredients(Number(route.params.id));
  const data = (cocktailsStore.ingredients as any).drinks[0];
  for (const key in data) {
    if (key.startsWith("strIngredient"))
      (ingredients.value as any).push(data[key]);
    if (key.startsWith("strMeasure"))
      (measurements.value as any).push(data[key]);
  }

  title.value = data.strDrink;
  imageSrc.value = data.strDrinkThumb;
  instructions.value = data.strInstructions;
  glass.value = data.strGlass;
});
</script>

<template>
  <div class="detail-page">
    <Heading tag="h1" :style="'heading-1'">{{ title }}</Heading>
    <div class="detail-container">
      <Image :src="imageSrc" class="product-image" />
      <aside class="product-content">
        <IngredientsList :ingredients="ingredients" :measurements="measurements"
          >Ingredients:</IngredientsList
        >
        <Text tag="p" class="instructions">{{ instructions }}</Text>
        <Text tag="p" class="instructions">Served in {{ glass }}</Text>
      </aside>
    </div>
  </div>
</template>

<style>
.detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  margin-block-start: 4rem;
}

.detail-container {
  display: flex;
  align-items: top;
  justify-items: space-evenly;
  gap: 2rem;
}

.product-image {
  max-width: 50%;
}

.product-content {
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
