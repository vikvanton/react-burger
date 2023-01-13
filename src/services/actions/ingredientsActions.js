import { getIngredientsRequest } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const INC_INGREDIENT_COUNTER = "INC_INGREDIENT_COUNTER";
export const DEC_INGREDIENT_COUNTER = "DEC_INGREDIENT_COUNTER";
export const CLEAR_INGREDIENTS_COUNTERS = "CLEAR_INGREDIENTS_COUNTERS";

export const getIngredients = () => {
    return (dispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        getIngredientsRequest()
            .then((result) => {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, data: result.data });
            })
            .catch((error) =>
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                    data: error.message,
                })
            );
    };
};
