import { getIngredientsRequest } from "../../utils/api";
import { TRawIngredients, IResponseError, TAppThunk, TIngredientCounter } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: "GET_INGREDIENTS_ERROR" = "GET_INGREDIENTS_ERROR";
export const INC_INGREDIENT_COUNTER: "INC_INGREDIENT_COUNTER" = "INC_INGREDIENT_COUNTER";
export const DEC_INGREDIENT_COUNTER: "DEC_INGREDIENT_COUNTER" = "DEC_INGREDIENT_COUNTER";
export const CLEAR_INGREDIENTS_COUNTERS: "CLEAR_INGREDIENTS_COUNTERS" =
    "CLEAR_INGREDIENTS_COUNTERS";

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: TRawIngredients;
}

export interface IGetIngredientsError {
    readonly type: typeof GET_INGREDIENTS_ERROR;
    readonly data: string;
}

export interface IIncIngredientCounter {
    readonly type: typeof INC_INGREDIENT_COUNTER;
    readonly data: TIngredientCounter;
}

export interface IDecIngredientCounter {
    readonly type: typeof DEC_INGREDIENT_COUNTER;
    readonly data: TIngredientCounter;
}

export interface IClearIngredientsCounters {
    readonly type: typeof CLEAR_INGREDIENTS_COUNTERS;
}

export type TIngredientsActions =
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsError
    | IIncIngredientCounter
    | IDecIngredientCounter
    | IClearIngredientsCounters;

export const getIngredients = (): TAppThunk => {
    return (dispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        getIngredientsRequest()
            .then((result) => {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, data: result.data });
            })
            .catch((error: IResponseError) =>
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                    data: error.message,
                })
            );
    };
};
