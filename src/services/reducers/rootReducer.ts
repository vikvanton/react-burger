import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { constructorReducer } from "./constructorReducer";
import { orderReducer } from "./orderReducer";
import { viewInModalReduser } from "./viewInModalReduser";
import { authReducer } from "./authReducer";
import { passRestorationReducer } from "./passRestorationReducer";
import { ordersReducer } from "./ordersReducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    viewInModal: viewInModalReduser,
    auth: authReducer,
    passRestoration: passRestorationReducer,
    socket: ordersReducer,
});
