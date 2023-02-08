import { postOrderRequest } from "../../utils/api";
import { IResponseError, TAppThunk, TOrder } from "../../utils/types";

export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_ERROR: "POST_ORDER_ERROR" = "POST_ORDER_ERROR";
export const SET_ORDER_ERROR: "SET_ORDER_ERROR" = "SET_ORDER_ERROR";
export const CLEAR_ORDER_ERROR: "CLEAR_ORDER_ERROR" = "CLEAR_ORDER_ERROR";
export const CLEAR_ORDER_NUMBER: "CLEAR_ORDER_NUMBER" = "CLEAR_ORDER_NUMBER";

export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly data: number;
}

export interface IPostOrderError {
    readonly type: typeof POST_ORDER_ERROR;
    readonly data: string;
}

export interface ISetOrderError {
    readonly type: typeof SET_ORDER_ERROR;
    readonly data: string;
}

export interface IClearOrderError {
    readonly type: typeof CLEAR_ORDER_ERROR;
}

export interface IClearOrderNumber {
    readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TOrderActions =
    | IPostOrderRequest
    | IPostOrderSuccess
    | IPostOrderError
    | ISetOrderError
    | IClearOrderError
    | IClearOrderNumber;

export const postOrder = (data: TOrder): TAppThunk => {
    return (dispatch, getState) => {
        dispatch({ type: POST_ORDER_REQUEST });
        const auth = getState().auth;
        postOrderRequest(data, auth.accessToken, auth.refreshToken, dispatch)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        data: result.order.number,
                    });
                }
            })
            .catch((error: IResponseError) =>
                dispatch({
                    type: POST_ORDER_ERROR,
                    data: error.message,
                })
            );
    };
};
