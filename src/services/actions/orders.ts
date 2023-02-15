import { IOrdersResponse } from "../../utils/types";

export const ORDERS_CONNECTION_SUCCESS: "ORDERS_CONNECTION_SUCCESS" = "ORDERS_CONNECTION_SUCCESS";
export const ORDERS_ERROR: "ORDERS_ERROR" = "ORDERS_ERROR";
export const ORDERS_CONNECTION_CLOSED: "ORDERS_CONNECTION_CLOSED" = "ORDERS_CONNECTION_CLOSED";
export const ORDERS_GET_MESSAGE: "ORDERS_GET_MESSAGE" = "ORDERS_GET_MESSAGE";
// Литеральный тип экшена открытия сокет-соединения для orders
export const WS_ORDERS_CONNECTION_START: "WS_ORDERS_CONNECTION_START" =
    "WS_ORDERS_CONNECTION_START";
// Литеральный тип экшена окончания сеанса сокет-соединения для orders
export const WS_ORDERS_CONNECTION_STOP: "WS_ORDERS_CONNECTION_STOP" = "WS_ORDERS_CONNECTION_STOP";

export interface IOrdersConnectionSuccess {
    readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersError {
    readonly type: typeof ORDERS_ERROR;
    readonly data: string;
}

export interface IOrdersConnectionClosed {
    readonly type: typeof ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersGetMessage {
    readonly type: typeof ORDERS_GET_MESSAGE;
    readonly data: IOrdersResponse;
}

export type TOrdersActions =
    | IOrdersConnectionSuccess
    | IOrdersError
    | IOrdersConnectionClosed
    | IOrdersGetMessage;
