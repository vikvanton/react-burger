import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { TAppState, TAppActions, TAppDispatch, TWsActions } from "../../utils/types";

// Мидлвар получает url при своем создании, а эндпоинт при создании сокет соединения
export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
    return ((
        store: MiddlewareAPI<TAppDispatch, TAppState>
    ): ((next: Dispatch) => (action: TAppActions) => void) => {
        let socket: WebSocket | null = null;
        const dispatch = store.dispatch;

        return (next: Dispatch): ((action: TAppActions) => void) =>
            (action: TAppActions): void => {
                if (action.type === wsActions.wsInit.type) {
                    socket = new WebSocket(`${wsUrl}${action.endpoint}`);
                    socket.onopen = wsActions.wsOpen
                        ? () => {
                              wsActions.wsOpen && dispatch(wsActions.wsOpen());
                          }
                        : null;
                    socket.onerror = wsActions.wsError
                        ? () => {
                              wsActions.wsError &&
                                  dispatch(wsActions.wsError("Ошибка соединения с сервером"));
                          }
                        : null;
                    socket.onmessage = wsActions.wsMessage
                        ? (event: MessageEvent<string>) => {
                              wsActions.wsMessage && dispatch(wsActions.wsMessage(event.data));
                          }
                        : null;
                    socket.onclose = wsActions.wsEnd.callback
                        ? // Если есть экшн-креатор закрытия сокета, устанавливаем его на событие onClose
                          () => {
                              wsActions.wsEnd.callback && dispatch(wsActions.wsEnd.callback());
                          }
                        : wsActions.wsClose
                        ? // Если есть экшн-креатор на событие onClose, устанавливаем его
                          () => {
                              wsActions.wsClose && dispatch(wsActions.wsClose());
                          }
                        : null;
                } else if (action.type === wsActions.wsSend.type) {
                    socket?.send(action.message);
                } else if (action.type === wsActions.wsEnd.type) {
                    // Проверяем, открыто ли еще соединение
                    if (socket && socket.readyState === socket.OPEN) {
                        socket.close(1000, "CLOSE_NORMAL");
                        // Если есть экшн-креатор закрытия сокета, вызываем его
                        // и убираем его с события onClose
                        if (wsActions.wsEnd.callback) {
                            dispatch(wsActions.wsEnd.callback());
                            socket.onclose = null;
                        }
                    }
                } else next(action);
            };
    }) as Middleware;
};
