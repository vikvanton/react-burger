import { TOrderInfo } from "../../utils/types";
import {
    WS_CONNECTION_SUCCESS,
    WS_ERROR,
    WS_CLEAR_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TOrdersActions,
} from "../actions/ordersActions";

type TOrdersState = {
    orders: Array<TOrderInfo>;
    total: number;
    totalToday: number;
    socketConnected: boolean;
    socketError: string;
};

const initialState: TOrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    socketConnected: false,
    socketError: "",
};

export const ordersReducer = (state = initialState, action: TOrdersActions): TOrdersState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                socketConnected: true,
                socketError: "",
            };
        }
        case WS_ERROR: {
            return {
                ...state,
                socketConnected: false,
                socketError: action.data,
            };
        }
        case WS_CLEAR_ERROR: {
            return {
                ...state,
                socketError: "",
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                socketConnected: false,
            };
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.data.orders,
                total: action.data.total,
                totalToday: action.data.totalToday,
                socketError: "",
            };
        }
        default:
            return state;
    }
};
