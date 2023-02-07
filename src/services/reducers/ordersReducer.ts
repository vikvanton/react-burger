import { TOrderInfo } from "../../utils/types";
import {
    ORDERS_CONNECTION_SUCCESS,
    ORDERS_ERROR,
    ORDERS_CONNECTION_CLOSED,
    ORDERS_GET_MESSAGE,
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
        case ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                socketConnected: true,
                socketError: "",
            };
        }
        case ORDERS_ERROR: {
            return {
                ...state,
                socketConnected: false,
                socketError: action.data,
            };
        }
        case ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                socketConnected: false,
            };
        }
        case ORDERS_GET_MESSAGE: {
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
