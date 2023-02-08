import { TIngredient, TOrderDeatiledInfo } from "../../utils/types";
import { SET_VIEW_INGREDIENT, SET_VIEW_ORDER, TViewInModalActions } from "../actions/view-in-modal";

type TViewInModalState = {
    ingredientInModal: TIngredient | null;
    orderInModal: TOrderDeatiledInfo | null;
};

const initialState: TViewInModalState = {
    ingredientInModal: null,
    orderInModal: null,
};

// Редьюсер просматриваемого ингредиента
export const viewInModalReduser = (
    state = initialState,
    action: TViewInModalActions
): TViewInModalState => {
    switch (action.type) {
        case SET_VIEW_INGREDIENT: {
            return {
                ...initialState,
                ingredientInModal: action.data,
            };
        }
        case SET_VIEW_ORDER: {
            return {
                ...initialState,
                orderInModal: action.data,
            };
        }
        default:
            return state;
    }
};
