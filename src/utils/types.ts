import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../services/store/store";
import { TConstructorActions } from "../services/actions/constructorActions";
import { TOrderActions } from "../services/actions/orderActions";
import { TAuthActions } from "../services/actions/authActions";
import { TIngredientsActions } from "../services/actions/ingredientsActions";
import { TViewInModalActions } from "../services/actions/viewInModalActions";
import { TPassRestorationActions } from "../services/actions/passRestorationActions";
import { TOrdersActions } from "../services/actions/ordersActions";

type TLocation = {
    key?: string;
    pathname: string;
    search: string;
    hash: string;
    state: TLocationBackgState;
};

export enum OrderStatus {
    "created" = "Создан",
    "pending" = "Готовится",
    "done" = "Выполнен",
}

export type TLocationBackgState = {
    background: TLocation;
} | null;

export type TLocationPrevState = {
    prev: string;
} | null;

export type TOrder = {
    ingredients: Array<string>;
};

export type TCountOperation = "+" | "-";

export type TIngredientType = "top" | "bottom";

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    count: number;
};

export type TConstructorIngredient = Omit<
    TIngredient,
    "proteins" | "fat" | "carbohydrates" | "calories" | "image" | "image_large" | "__v" | "count"
> & { uuid: string };

export type TOrderIngredient = Omit<
    TIngredient,
    "type" | "proteins" | "fat" | "carbohydrates" | "calories" | "image" | "image_large" | "__v"
>;

export type TCategories = {
    bun: ReadonlyArray<TIngredient>;
    main: ReadonlyArray<TIngredient>;
    sauce: ReadonlyArray<TIngredient>;
};

export type TAuthType = "login" | "register";

export type TAuth = {
    email: string;
    password: string;
    name?: string;
};

export type TToken = {
    token: string;
};

export type TEmail = {
    email: string;
};

export type TRestorePass = {
    password: string;
    token: string;
};

export interface ICustomResponse<T> extends Response {
    json(): Promise<T>;
}

export interface IResponse {
    success: boolean;
}

export interface IResponseMessage extends IResponse {
    message: string;
}

export interface IResponseError extends IResponseMessage {
    status: number;
}

export type TIngredientCounter = {
    type: string;
    id: string;
    count?: number;
};

export type IRawIngredients = Array<Omit<TIngredient, "count">>;

export interface IIngredientsResponse extends IResponse {
    data: IRawIngredients;
}

export interface IOrderResponse extends IResponse {
    name: string;
    order: {
        number: number;
    };
}

export type TOrderInfo = {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};

export type TOrderDeatiledInfo = Omit<TOrderInfo, "ingredients"> & {
    ingredients: Array<TOrderIngredient>;
    orderSum: number;
};

export type TOrderNumber = Omit<
    TOrderInfo,
    "ingredients" | "status" | "name" | "createdAt" | "updatedAt"
>;

export interface IOrdersResponse extends IResponse {
    orders: Array<TOrderInfo>;
    total: number;
    totalToday: number;
}

export interface IUser {
    email: string;
    name: string;
}

interface IUserData {
    user: IUser;
}

export interface IUserDataResponse extends IResponse, IUserData {}

export interface IRefreshTokens {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshTokensResponse extends IResponse, IRefreshTokens {}

export interface ISetAuth extends IUserData, IRefreshTokens {}

export interface ISetAuthResponse extends IResponse, ISetAuth {}

export type TResetPassForm<T> = {
    password: T;
    token: T;
};

export interface ILoginForm<T> {
    email: T;
    password: T;
}

export interface IRegisterForm<T> extends ILoginForm<T> {
    name: T;
}

export type TOpenModalFunc = (action: TAppActions, pathname: string) => void;

export type TSocketType = "all" | "user";

export type TAppActions =
    | TAuthActions
    | TConstructorActions
    | TIngredientsActions
    | TOrderActions
    | TPassRestorationActions
    | TOrdersActions
    | TViewInModalActions;

export type TAppState = ReturnType<typeof store.getState>;

export type TAppThunk<TReturn = void> = ThunkAction<TReturn, TAppState, unknown, TAppActions>;

export type TAppDispatch = ThunkDispatch<TAppState, unknown, TAppActions>;
