import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../services/store/store";
import { TConstructorActions } from "../services/actions/constructor";
import { TOrderActions } from "../services/actions/order";
import { TAuthActions } from "../services/actions/auth";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TViewInModalActions } from "../services/actions/view-in-modal";
import { TPassRestorationActions } from "../services/actions/pass-restoration";
import {
    TOrdersActions,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_STOP,
} from "../services/actions/orders";

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

export type TRawIngredients = Array<Omit<TIngredient, "count">>;

export interface IIngredientsResponse extends IResponse {
    data: TRawIngredients;
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

export type TOpenModalFunc = (action: TAppActions, pathname: string) => void;

// Универсальный type экшена для открытия сокет-соединения
// Новые типы могут добавлятся через union
type TWsStartActionsType = typeof WS_ORDERS_CONNECTION_START;

// Универсальный type экшена для окончания сеанса сокет-соединения
// Новые типы могут добавлятся через union
type TWsStopActionsType = typeof WS_ORDERS_CONNECTION_STOP;

// Тип для сокет-экшена открытия соединения
interface IWsConnectionStart {
    readonly type: TWsStartActionsType;
    // эндпоинт для открываемого сокета
    readonly endpoint: string;
}

// Тип для сокет-экшена окончания сеанса
interface IWsConnectionStop {
    readonly type: TWsStopActionsType;
}

// Тип для объекта экшенов, передаваемого в сокет-мидлвар
export type TWsActions = {
    // Универсальный тип экшена для открытия сокет-соединения
    wsInit: TWsStartActionsType;
    // Экшен-креаторы для событий сокета
    wsOpen: () => TAppActions | TAppThunk;
    wsError: (error: string) => TAppActions | TAppThunk;
    wsMessage: (data: string) => TAppActions | TAppThunk;
    wsClose: () => TAppActions | TAppThunk;
    // Универсальный тип экшена для окончания сеанса сокет-соединения
    wsEnd: TWsStopActionsType;
};

export type TAppActions =
    | TAuthActions
    | TConstructorActions
    | TIngredientsActions
    | TOrderActions
    | TPassRestorationActions
    | TOrdersActions
    | TViewInModalActions
    | IWsConnectionStart
    | IWsConnectionStop;

export type TAppState = ReturnType<typeof store.getState>;

export type TAppThunk<TReturn = void> = ThunkAction<TReturn, TAppState, unknown, TAppActions>;

export type TAppDispatch = ThunkDispatch<TAppState, unknown, TAppActions>;
