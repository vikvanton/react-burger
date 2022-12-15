import { postOrderRequest } from "../../utils/api";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_ERROR = "POST_ORDER_ERROR";

export const SET_ORDER_ERROR = "SET_ORDER_ERROR";
export const CLEAR_ORDER_ERROR = "CLEAR_ORDER_ERROR";
export const CLEAR_ORDER_NUMBER = "CLEAR_ORDER_NUMBER";

export const postOrder = (data) => {
    return (dispatch) => {
        dispatch({ type: POST_ORDER_REQUEST });
        postOrderRequest(data)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        data: result.order.number,
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: POST_ORDER_ERROR,
                    data: "Ошибка соединения с сервером",
                })
            );
    };
};
