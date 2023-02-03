import { SET_TOKENS, CLEAR_AUTH_SUCCESS } from "../services/actions/authActions";
import {
    ORDERS_CONNECTION_SUCCESS,
    ORDERS_ERROR,
    ORDERS_GET_MESSAGE,
    ORDERS_CONNECTION_CLOSED,
} from "../services/actions/ordersActions";
import { refreshTokensRequest } from "./api";
import {
    WS_ORDERS_CONNECTION_START,
    SOCKET_TOKEN_ERROR,
    WS_ORDERS_CONNECTION_STOP,
} from "./consts";
import {
    TAppActions,
    TAppThunk,
    IResponse,
    IOrdersResponse,
    IResponseMessage,
    IResponseError,
    TWsActions,
    TAppDispatch,
} from "./types";

// Ф-ция получения объекта экшенов сокет-мидлвара для orders
export function WsOrdersActions(): TWsActions {
    // Флаг попытки обновления токенов
    let refreshTokensAttempt: boolean = false;
    // Ф-ция обработки ошибки при получении неуспешного сообщения
    const errMessageFunc = (dispatch: TAppDispatch): void => {
        dispatch({
            type: ORDERS_ERROR,
            data: "Ошибка получения данных с сервера",
        });
    };

    return {
        wsInit: WS_ORDERS_CONNECTION_START,
        wsOpen: (): TAppActions => ({ type: ORDERS_CONNECTION_SUCCESS }),
        wsError: (error: string): TAppActions => ({ type: ORDERS_ERROR, data: error }),
        // thunk экшн для получения и обработки сокет-сообщения
        // с рефрешом токенов
        wsMessage: (data: string): TAppThunk => {
            return (dispatch, getState) => {
                const state = getState();
                const result = JSON.parse(data) as IResponse;
                if (result.success) {
                    if (refreshTokensAttempt) refreshTokensAttempt = false;
                    dispatch({
                        type: ORDERS_GET_MESSAGE,
                        data: result as IOrdersResponse,
                    });
                    // Если невалидный токен и не было попытки обновления токенов
                } else if (
                    (result as IResponseMessage).message === SOCKET_TOKEN_ERROR &&
                    !refreshTokensAttempt
                ) {
                    // запускаем обновление токенов
                    refreshTokensRequest({ token: state.auth.refreshToken })
                        .then((refreshTokens) => {
                            dispatch({
                                type: SET_TOKENS,
                                data: {
                                    accessToken: refreshTokens.accessToken,
                                    refreshToken: refreshTokens.refreshToken,
                                },
                            });
                            refreshTokensAttempt = true;
                        })
                        .catch((error: IResponseError) => {
                            // Если при обновлении токенов произошла ошибка авторизации разлогиниваем пользователя
                            if (error.status === 401 || error.status === 403) {
                                dispatch({ type: CLEAR_AUTH_SUCCESS });
                                return;
                            }
                            errMessageFunc(dispatch);
                        });
                    // Если невалидный токен и было обновление токенов
                    // то разлогиниваем пользователя
                } else if (
                    (result as IResponseMessage).message === SOCKET_TOKEN_ERROR &&
                    refreshTokensAttempt
                ) {
                    dispatch({ type: CLEAR_AUTH_SUCCESS });
                    refreshTokensAttempt = false;
                } else {
                    errMessageFunc(dispatch);
                }
            };
        },
        wsClose: (): TAppActions => ({ type: ORDERS_CONNECTION_CLOSED }),
        wsEnd: WS_ORDERS_CONNECTION_STOP,
    };
}
