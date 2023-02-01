import { rootReducer } from "../reducers/rootReducer";
import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { WS_URL } from "../../utils/consts";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL)));

export const store = createStore(rootReducer, enhancer);
