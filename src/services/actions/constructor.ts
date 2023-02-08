import { v4 } from "uuid";
import { TConstructorIngredient, TIngredient } from "../../utils/types";

export const ADD_TO_CONSTRUCTOR: "ADD_TO_CONSTRUCTOR" = "ADD_TO_CONSTRUCTOR";
export const REMOVE_FROM_CONSTRUCTOR: "REMOVE_FROM_CONSTRUCTOR" = "REMOVE_FROM_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const EXCHANGE_INGREDIENTS: "EXCHANGE_INGREDIENTS" = "EXCHANGE_INGREDIENTS";

export interface IAddToConstructor {
    readonly type: typeof ADD_TO_CONSTRUCTOR;
    readonly data: TConstructorIngredient;
}

export interface IRemoveFromConstructor {
    readonly type: typeof REMOVE_FROM_CONSTRUCTOR;
    readonly data: string;
}

export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IExchangeIngredients {
    readonly type: typeof EXCHANGE_INGREDIENTS;
    readonly data: { dragItemId: string; dropItemId: string };
}

export type TConstructorActions =
    | IAddToConstructor
    | IRemoveFromConstructor
    | IClearConstructor
    | IExchangeIngredients;

export const addToConstructor = (ingredient: TIngredient): IAddToConstructor => {
    return {
        type: ADD_TO_CONSTRUCTOR,
        data: {
            _id: ingredient._id,
            name: ingredient.name,
            type: ingredient.type,
            price: ingredient.price,
            image_mobile: ingredient.image_mobile,
            uuid: v4(),
        },
    };
};
