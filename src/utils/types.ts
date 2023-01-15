type TLocation = {
    key?: string;
    pathname: string;
    search: string;
    hash: string;
    state: TLocationBackgState;
};

export type TLocationBackgState = {
    background: TLocation;
} | null;

export type TLocationPrevState = {
    prev: string;
} | null;

export type TOrder = {
    ingredients: Array<string>;
};

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

interface IResponse {
    success: boolean;
}

export interface IResponseMessage extends IResponse {
    message: string;
}

export interface IResponseError extends IResponseMessage {
    status: number;
}

export interface IIngredientsResponse extends IResponse {
    data: Array<Omit<TIngredient, "count">>;
}

export interface IOrderResponse extends IResponse {
    name: string;
    order: {
        number: number;
    };
}

export interface IUserDataResponse extends IResponse {
    user: {
        email: string;
        name: string;
    };
}

export interface IRefreshTokensResponse extends IResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ISetAuthResponse extends IResponse, IUserDataResponse, IRefreshTokensResponse {}

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
