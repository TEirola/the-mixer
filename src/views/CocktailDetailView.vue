<style src="./CocktailDetailView.scss" lang="scss"></style>
<script setup lang="ts">
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Heading from "../components/atoms/heading/Heading.vue";
import Image from "../components/atoms/image/Image.vue";
import Text from "../components/atoms/text/Text.vue";
import Pill from "../components/atoms/pill/Pill.vue";
import IngredientsList from "../components/molecules/ingredientsList/IngredientsList.vue";
import { useCocktailsStore } from "../stores/cocktails";
import IconBack from "../components/atoms/icons/IconBack.vue";

gsap.registerPlugin(ScrollToPlugin);

const cocktailsStore = useCocktailsStore();
const title = ref("");
const imageSrc = ref("");
const ingredients = ref([]);
const measurements = ref([]);
const instructions = ref("");
const glass = ref("");
const categories = ref<Array<string>>([]);
const route = useRoute();
const router = useRouter();

function goBack() {
  router.go(-1);
}

onMounted(async () => {
  gsap.to(window, { duration: 0.4, scrollTo: 0 });
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
  categories.value.push(data.strCategory, data.strAlcoholic);
});
</script>

<template>
  <div class="detail-page">
    <button type="button" class="go-back-button" @click="goBack">
      <IconBack class="icon-back" />Back
    </button>
    <Heading tag="h1" :style="'heading-1'">{{ title }}</Heading>
    <div class="categories">
      <Pill v-for="category in categories" :key="category">
        <Text tag="p" class="category">{{ category }}</Text>
      </Pill>
    </div>
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
