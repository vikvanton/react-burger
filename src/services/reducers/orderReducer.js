import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR,
    SET_ORDER_ERROR,
    CLEAR_ORDER_ERROR,
    CLEAR_ORDER_NUMBER,
} from "../actions/orderActions";

const initialState = {
    // Номер заказа
    orderNumber: null,
    orderRequest: false,
    orderError: undefined,
};
// Редьюсер заказа
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderError: undefined,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.data,
                orderRequest: false,
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: action.data,
            };
        }
        case SET_ORDER_ERROR: {
            return {
                ...state,
                orderError: action.data,
            };
        }
        case CLEAR_ORDER_ERROR: {
            return {
                ...state,
                orderError: undefined,
            };
        }
        case CLEAR_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: null,
            };
        }
        default:
            return state;
    }
};
