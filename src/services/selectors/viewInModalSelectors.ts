import { TAppState, TIngredient, TOrderDeatiledInfo } from "../../utils/types";

export const selectIngredientInModal = (state: TAppState): TIngredient | null =>
    state.viewInModal.ingredientInModal;

export const selectOrderInModal = (state: TAppState): TOrderDeatiledInfo | null =>
    state.viewInModal.orderInModal;
