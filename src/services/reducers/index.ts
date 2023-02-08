import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { viewInModalReduser } from "./view-in-modal";
import { authReducer } from "./auth";
import { passRestorationReducer } from "./pass-restoration";
import { ordersReducer } from "./orders";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    viewInModal: viewInModalReduser,
    auth: authReducer,
    passRestoration: passRestorationReducer,
    socket: ordersReducer,
});
