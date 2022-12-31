import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { constructorReducer } from "./constructorReducer";
import { orderReducer } from "./orderReducer";
import { viewIngredientReducer } from "./viewIngredientReduser";
import { authReducer } from "./authReducer";
import { passRestorationReducer } from "./passRestorationReducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    viewIngredient: viewIngredientReducer,
    auth: authReducer,
    passRestoration: passRestorationReducer,
});
