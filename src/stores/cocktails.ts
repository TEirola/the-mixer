import { defineStore } from "pinia";
import axios from "axios";

export const useCocktailsStore = defineStore("CocktailsStore", {
  state: () => ({
    cocktails: [],
    ingredients: [],
    categories: [],
  }),
  getters: {
    getCocktails(state) {
      return state.cocktails;
    },
    getIngredients(state) {
      return state.ingredients;
    },
  },
  actions: {
    async fetchCocktails() {
      try {
        const cocktailsCategoriesData = await (
          await axios.get(
            "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
          )
        ).data.drinks;

        if (!cocktailsCategoriesData) return;

        cocktailsCategoriesData.forEach(async (category: any) => {
          const cocktailsData = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
          );

          (this.categories as any).push(category.strCategory);

          cocktailsData.data.drinks &&
            cocktailsData.data.drinks.forEach(
              async ({ idDrink, strDrink, strDrinkThumb }: any) => {
                if (idDrink === "undefined") return;

                return (this.cocktails as any).push({
                  id: idDrink,
                  title: strDrink,
                  image: strDrinkThumb,
                  category: category.strCategory,
                });
              }
            );
        });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchIngredients(id: number) {
      try {
        const ingredientsData = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        this.ingredients = ingredientsData.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
