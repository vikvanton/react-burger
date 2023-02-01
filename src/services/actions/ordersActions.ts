import { IOrdersResponse, TSocketType } from "../../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_ERROR: "WS_ERROR" = "WS_ERROR";
export const WS_CLEAR_ERROR: "WS_CLEAR_ERROR" = "WS_CLEAR_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_STOP: "WS_CONNECTION_STOP" = "WS_CONNECTION_STOP";

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly data: TSocketType;
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsError {
    readonly type: typeof WS_ERROR;
    readonly data: string;
}

export interface IWsClearError {
    readonly type: typeof WS_CLEAR_ERROR;
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly data: IOrdersResponse;
}

export interface IWsConnectionStop {
    readonly type: typeof WS_CONNECTION_STOP;
}

export type TOrdersActions =
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsError
    | IWsClearError
    | IWsConnectionClosed
    | IWsGetMessage
    | IWsConnectionStop;
