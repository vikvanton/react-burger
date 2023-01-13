import { v4 } from "uuid";

export const ADD_TO_CONSTRUCTOR = "ADD_TO_CONSTRUCTOR";
export const REMOVE_FROM_CONSTRUCTOR = "REMOVE_FROM_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const EXCHANGE_INGREDIENTS = "EXCHANGE_INGREDIENTS";

export const addToConstructor = (ingredient) => {
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
