import {
    SET_VIEW_INGREDIENT,
    CLEAR_VIEW_INGREDIENT,
} from "../actions/viewIngredientActions";

const initialState = {
    ingredientInModal: null,
};
// Редьюсер просматриваемого ингредиента
export const viewIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW_INGREDIENT: {
            return {
                ingredientInModal: action.data,
            };
        }
        case CLEAR_VIEW_INGREDIENT: {
            return {
                ingredientInModal: null,
            };
        }
        default:
            return state;
    }
};
