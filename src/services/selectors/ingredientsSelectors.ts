import { createSelector } from "reselect";
import { TAppState, TCategories, TIngredient } from "../../utils/types";

export const selectIngredientsRequest = (state: TAppState): boolean =>
    state.ingredients.ingredientsRequest;

export const selectIngredientsError = (state: TAppState): string =>
    state.ingredients.ingredientsError;

export const selectBun = (state: TAppState): ReadonlyArray<TIngredient> =>
    state.ingredients.categories.bun;

export const selectMain = (state: TAppState): ReadonlyArray<TIngredient> =>
    state.ingredients.categories.main;

export const selectSauce = (state: TAppState): ReadonlyArray<TIngredient> =>
    state.ingredients.categories.sauce;

export const selectCategories = (state: TAppState): TCategories => state.ingredients.categories;

export const selectIngredient = (id: string): ((state: TAppState) => TIngredient | undefined) =>
    createSelector(selectCategories, (categories) => {
        let ingredient: TIngredient | undefined;
        let category: keyof typeof categories;
        for (category in categories) {
            ingredient = categories[category].find((item) => item._id === id);
            if (ingredient) break;
        }
        return ingredient;
    });
