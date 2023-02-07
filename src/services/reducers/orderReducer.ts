import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR,
    SET_ORDER_ERROR,
    CLEAR_ORDER_ERROR,
    CLEAR_ORDER_NUMBER,
    TOrderActions,
} from "../actions/orderActions";

type TOrderState = {
    orderNumber: number;
    orderRequest: boolean;
    orderError: string;
};

const initialState: TOrderState = {
    // Номер заказа
    orderNumber: 0,
    orderRequest: false,
    orderError: "",
};

// Редьюсер заказа
export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderError: "",
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
                orderError: "",
            };
        }
        case CLEAR_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: 0,
            };
        }
        default:
            return state;
    }
};
