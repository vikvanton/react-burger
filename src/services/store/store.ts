import { rootReducer } from "../reducers";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { WsOrdersActions } from "../../utils/ws";
import { WS_URL } from "../../utils/consts";

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, socketMiddleware(WS_URL, WsOrdersActions()))
);
