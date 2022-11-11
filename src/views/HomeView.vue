<style src="./HomeView.scss" lang="scss"></style>
<script setup lang="ts">
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "../components/atoms/button/Button.vue";
import Heading from "../components/atoms/heading/Heading.vue";
import CocktailsList from "../components/organisms/cocktailsList/CocktailsList.vue";
import { useCocktailsStore } from "../stores/cocktails";

gsap.registerPlugin(Draggable, InertiaPlugin);

const router = useRouter();
const route = useRoute();
const cocktailsStore = useCocktailsStore();
const navBackground = ref();
const routeCategory = ref(route.query.category?.toString());
const isOverflown = ref(false);

function setCategory(category: string | null) {
  if (category === null) return router.push({ query: { category: "" } });
  return router.push({ query: { category: category } });
}

async function animateNav() {
  const filteredValue = (await document.querySelector(
    ".nav-list-button.active"
  )) as HTMLElement;

  if (!filteredValue) return;

  gsap
    .timeline()
    .to(".nav-list-button", {
      color: "var(--vt-c-black)",
      duration: 0.2,
    })
    .to(navBackground.value, {
      x: filteredValue.offsetLeft,
      width: filteredValue.offsetWidth,
      duration: 0.2,
    })
    .to(
      filteredValue,
      {
        color: "var(--vt-c-white)",
        duration: 0.2,
      },
      "<"
    );
}

const isNavOverflown = () => {
  const navElement = document.querySelector(".nav-list-container");
  if (!navElement) return false;

  const { clientWidth, scrollWidth } = navElement;
  return scrollWidth > clientWidth;
};

function getDragPosition(this: {
  endX: number;
  bounds: string;
  type: "x";
  onDrag: () => void;
}) {
  const navElement = document.querySelector(".nav-list-container");
  if (-(navElement as any)?._gsMaxScrollX === this.endX)
    isOverflown.value = false;
  else {
    isOverflown.value = true;
  }
}

watch(route, (value) => {
  routeCategory.value = value.query.category?.toString();

  setTimeout(() => {
    animateNav();
  }, 500);
});

onMounted(() => {
  setTimeout(() => {
    animateNav();
    isOverflown.value = isNavOverflown();
  }, 500);

  Draggable.create(".nav-list", {
    bounds: ".homepage",
    type: "x",
    onDrag: getDragPosition,
  });
});

window.addEventListener("resize", () => {
  isOverflown.value = isNavOverflown();
});
</script>

<template>
  <main>
    <div class="homepage">
      <Heading tag="h1" :style="'heading-1'" class="title">The Mixer</Heading>

      <div
        :class="{
          ['nav-list-container']: true,
          ['overflow-x']: isOverflown,
        }"
      >
        <nav class="nav-list">
          <Button
            v-for="category, index in (cocktailsStore.categories as any).sort()"
            :key="index"
            type="button"
            @click="
              setCategory(route.query.category === category ? null : category)
            "
            :class="{
              ['nav-list-button']: true,
              ['active']: routeCategory === category,
            }"
          >
            {{ category }}
          </Button>
          <div ref="navBackground" class="nav-background"></div>
        </nav>
      </div>

      <CocktailsList :cocktails="(cocktailsStore.cocktails as any)" />
    </div>
  </main>
</template>
