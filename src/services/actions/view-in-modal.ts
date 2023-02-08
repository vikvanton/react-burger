import { TIngredient, TOrderDeatiledInfo } from "../../utils/types";

export const SET_VIEW_INGREDIENT: "SET_VIEW_INGREDIENT" = "SET_VIEW_INGREDIENT";
export const SET_VIEW_ORDER: "SET_VIEW_ORDER" = "SET_VIEW_ORDER";

export interface ISetViewIngredient {
    readonly type: typeof SET_VIEW_INGREDIENT;
    readonly data: TIngredient;
}

export interface ISetViewOrder {
    readonly type: typeof SET_VIEW_ORDER;
    readonly data: TOrderDeatiledInfo;
}

export type TViewInModalActions = ISetViewIngredient | ISetViewOrder;
