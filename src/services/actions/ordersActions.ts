import { IOrdersResponse } from "../../utils/types";

export const ORDERS_CONNECTION_SUCCESS: "ORDERS_CONNECTION_SUCCESS" = "ORDERS_CONNECTION_SUCCESS";
export const ORDERS_ERROR: "ORDERS_ERROR" = "ORDERS_ERROR";
export const ORDERS_CLEAR_ERROR: "ORDERS_CLEAR_ERROR" = "ORDERS_CLEAR_ERROR";
export const ORDERS_CONNECTION_CLOSED: "ORDERS_CONNECTION_CLOSED" = "ORDERS_CONNECTION_CLOSED";
export const ORDERS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";

export interface IOrdersConnectionSuccess {
    readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersError {
    readonly type: typeof ORDERS_ERROR;
    readonly data: string;
}

export interface IOrdersClearError {
    readonly type: typeof ORDERS_CLEAR_ERROR;
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
    | IOrdersClearError
    | IOrdersConnectionClosed
    | IOrdersGetMessage;
