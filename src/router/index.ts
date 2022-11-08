import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CocktailDetailView from "../views/CocktailDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cocktail-detail/:id",
      name: "cocktail detail",
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: CocktailDetailView,
    },
  ],
});

export default router;
