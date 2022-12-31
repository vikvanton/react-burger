export const selectIngredientsRequest = (state) =>
    state.ingredients.ingredientsRequest;

export const selectIngredientsError = (state) =>
    state.ingredients.ingredientsError;

export const selectBun = (state) => state.ingredients.categories.bun;

export const selectMain = (state) => state.ingredients.categories.main;

export const selectSauce = (state) => state.ingredients.categories.sauce;

export const selectIngredient = (id) => (state) => {
    let ingredient;
    for (let category in state.ingredients.categories) {
        ingredient = state.ingredients.categories[category].find(
            (item) => item._id === id
        );
        if (ingredient) break;
    }
    return ingredient;
};
