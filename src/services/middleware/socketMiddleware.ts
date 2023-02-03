import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import {
    TAppState,
    TAppActions,
    TAppDispatch,
    TWsActions,
    IWsConnectionStart,
} from "../../utils/types";

// Мидлвар получает url при своем создании, а эндроинт при создании сокет соединения
export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
    return ((
        store: MiddlewareAPI<TAppDispatch, TAppState>
    ): ((next: Dispatch) => (action: TAppActions) => void) => {
        let socket: WebSocket | null = null;
        const dispatch = store.dispatch;

        return (next: Dispatch): ((action: TAppActions) => void) =>
            (action: TAppActions): void => {
                if (action.type === wsActions.wsInit) {
                    socket = new WebSocket(`${wsUrl}${(action as IWsConnectionStart).endpoint}`);

                    socket.onopen = () => {
                        dispatch(wsActions.wsOpen());
                    };
                    socket.onerror = () => {
                        dispatch(wsActions.wsError("Ошибка соединения с сервером"));
                    };
                    socket.onmessage = (event: MessageEvent<string>) => {
                        dispatch(wsActions.wsMessage(event.data));
                    };
                    socket.onclose = () => {
                        dispatch(wsActions.wsClose());
                    };
                } else if (action.type === wsActions.wsEnd) {
                    socket?.close(1000, "CLOSE_NORMAL");
                } else next(action);
            };
    }) as Middleware;
};
