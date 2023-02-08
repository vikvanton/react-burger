import { rootReducer } from "../reducers";
import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { WsOrdersActions } from "../../utils/ws";
import { WS_URL } from "../../utils/consts";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, socketMiddleware(WS_URL, WsOrdersActions()))
);

export const store = createStore(rootReducer, enhancer);
