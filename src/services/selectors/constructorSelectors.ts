import { createSelector } from "reselect";
import { TAppState, TConstructorIngredient } from "../../utils/types";

export const selectConstructorBun = (state: TAppState): TConstructorIngredient | null =>
    state.burgerConstructor.bun;

export const selectConstructorList = (state: TAppState): ReadonlyArray<TConstructorIngredient> =>
    state.burgerConstructor.list;

export const selectTotalSum: (state: TAppState) => number = createSelector(
    selectConstructorBun,
    selectConstructorList,
    (bun, list) => {
        return list.reduce((sum, current) => sum + current.price, 0) + (bun ? bun.price * 2 : 0);
    }
);
