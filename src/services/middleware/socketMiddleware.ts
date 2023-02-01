import type { Middleware, MiddlewareAPI } from "redux";
import { refreshTokensRequest } from "../../utils/api";
import { SOCKET_TOKEN_ERROR } from "../../utils/consts";
import type {
    TAppState,
    TAppActions,
    TAppDispatch,
    IOrdersResponse,
    IResponse,
    IResponseMessage,
    IResponseError,
} from "../../utils/types";
import { CLEAR_AUTH_SUCCESS, SET_TOKENS } from "../actions/authActions";
import {
    WS_CLEAR_ERROR,
    WS_CONNECTION_CLOSED,
    WS_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_STOP,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
} from "../actions/ordersActions";

export const socketMiddleware = (socketUrl: string): Middleware => {
    return ((
        store: MiddlewareAPI<TAppDispatch, TAppState>
    ): ((next: any) => (action: TAppActions) => void) => {
        let socket: WebSocket | null = null;
        // Флаг попытки обновления токенов
        let refreshTokensAttempt: boolean = false;
        const dispatch = store.dispatch;
        // Ф-ция обработки ошибки при получении неуспешного сообщения
        const errMessageFunc = (): void => {
            if (refreshTokensAttempt) refreshTokensAttempt = false;
            dispatch({
                type: WS_ERROR,
                data: "Ошибка получения данных с сервера",
            });
        };

        return (next: any): ((action: TAppActions) => void) =>
            (action: TAppActions): void => {
                const state = store.getState();

                if (action.type === WS_CONNECTION_START) {
                    // Если были обновлены токены сбрасываем флаг
                    if (refreshTokensAttempt) refreshTokensAttempt = false;
                    // Сокет для всех заказов
                    if (action.data === "all") socket = new WebSocket(`${socketUrl}/all`);
                    // Сокет для заказов авторизованного пользователя с токеном
                    else
                        socket = new WebSocket(
                            `${socketUrl}?token=${state.auth.accessToken.slice(7)}`
                        );

                    socket.onopen = () => {
                        dispatch({ type: WS_CONNECTION_SUCCESS });
                    };
                    socket.onerror = () => {
                        dispatch({
                            type: WS_ERROR,
                            data: "Ошибка соединения с сервером",
                        });
                    };
                    // Ф-ция обработчик получения сообщения
                    // с рефрешом токенов
                    socket.onmessage = (event: MessageEvent<string>) => {
                        const result = JSON.parse(event.data) as IResponse;
                        // Если сообщение успешно, диспатчим результат как данные о заказах
                        if (result.success) {
                            dispatch({
                                type: WS_GET_MESSAGE,
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
                                    // Снова диспатчим открытие соединения с обновленным токеном
                                    dispatch({ type: WS_CONNECTION_START, data: "user" });
                                    // Устанавливаем флаг попытки обновления
                                    refreshTokensAttempt = true;
                                })
                                .catch((error: IResponseError) => {
                                    // Если при обновлении токенов произошла ошибка авторизации разлогиниваем пользователя
                                    if (error.status === 401 || error.status === 403) {
                                        dispatch({ type: CLEAR_AUTH_SUCCESS });
                                        return;
                                    }
                                    errMessageFunc();
                                });
                            // Если невалидный токен и было обновление токенов
                            // то разлогиниваем пользователя
                        } else if (
                            (result as IResponseMessage).message === SOCKET_TOKEN_ERROR &&
                            refreshTokensAttempt
                        ) {
                            dispatch({ type: CLEAR_AUTH_SUCCESS });
                        } else errMessageFunc();
                    };
                    socket.onclose = () => {
                        dispatch({ type: WS_CONNECTION_CLOSED });
                    };
                } else if (action.type === WS_CONNECTION_STOP) {
                    socket?.close(1000, "CLOSE_NORMAL");
                    state.socket.socketError && dispatch({ type: WS_CLEAR_ERROR });
                } else next(action);
            };
    }) as Middleware;
};
