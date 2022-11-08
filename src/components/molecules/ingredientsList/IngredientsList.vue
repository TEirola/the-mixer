<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import Text from "../../atoms/text/Text.vue";

type IngredientsList = Array<{ measurement: string; ingredient: string }>;

const listOfIngredients = ref<IngredientsList>([]);

const props = defineProps<{
  measurements: Array<string | null>;
  ingredients: Array<string | null>;
}>();

onMounted(() => {
  setTimeout(() => {
    const filteredIngredients = computed(() =>
      props.ingredients.filter((ingredient) => ingredient !== null)
    );
    const filteredMeasurements = computed(() =>
      props.measurements.filter((measurement) => measurement !== null)
    );

    filteredIngredients.value.forEach((ingredient, index) => {
      listOfIngredients.value.push({
        measurement: filteredMeasurements.value[index] as string,
        ingredient: ingredient as string,
      });
    });

    console.log({ listOfIngredients }, listOfIngredients.value);
  }, 100);
});

console.log({ listOfIngredients }, listOfIngredients.value);
</script>
<style src="./IngredientsList.scss" lang="scss"></style>

<template>
  <div>
    <div class="ingredients-list-header"><slot></slot></div>
    <div class="ingredients-list">
      <div
        v-for="({ measurement, ingredient }, index) in listOfIngredients"
        :key="index"
        class="ingredients-list-item"
      >
        <Text tag="span">{{ measurement }}</Text>
        <Text tag="span">{{ ingredient }}</Text>
      </div>
    </div>
  </div>
</template>
