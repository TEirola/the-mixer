<style src="./CocktailsList.scss" lang="scss"></style>
<script setup lang="ts">
import gsap from "gsap";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import { nextTick, onMounted, ref, watch } from "vue";
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

const parsedCocktails = ref(props.cocktails);

watch(
  () => route.query,
  (value) => {
    if (value.category === "") {
      parsedCocktails.value = props.cocktails;
    } else {
      parsedCocktails.value = props.cocktails.filter(
        (cocktail) => cocktail.category === value.category
      );
    }
  }
);

onMounted(() => {
  //   nextTick(() => {
  //   let sections = gsap.utils.toArray(".list-item") as any;
  //   listItem.value.forEach((item: HTMLElement) => {
  //     gsap.fromTo(
  //       item,
  //       {
  //         xPercent: -100,
  //       },
  //       {
  //         xPercent: 0,
  //         ease: "none", // <-- IMPORTANT!
  //         scrollTrigger: {
  //           trigger: item,
  //           start: "top 80%",
  //           markers: true,
  //           toggleActions: "restart pause reverse pause",
  //           pin: true,
  //           scrub: 0.1,
  //           // snap: directionalSnap(1 / (sections.length - 1)),
  //           // end: "+=3000",
  //           horizontal: false,
  //         },
  //         immediateRender: false,
  //         clearProps: "all",
  //       }
  //     );
  //   });
  //   });
});
</script>

<template>
  <div class="list" ref="listElement">
    <CocktailsListItem
      v-for="cocktail in parsedCocktails.sort()"
      :key="cocktail.id"
      :id="cocktail.id"
      :image="cocktail.image"
      :copy="cocktail.title"
      :category="cocktail.category"
      ref="listItem"
    />
  </div>
</template>
