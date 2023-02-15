import { setAuthRequest, clearAuthRequest, patchUserRequest } from "../../utils/api";
import {
    IRefreshTokens,
    IResponseError,
    ISetAuth,
    IUser,
    TAppThunk,
    TAuth,
    TAuthType,
    TToken,
} from "../../utils/types";

export const AUTH_REQUEST: "AUTH_REQUEST" = "AUTH_REQUEST";
export const SET_AUTH_SUCCESS: "SET_AUTH_SUCCESS" = "SET_AUTH_SUCCESS";
export const CLEAR_AUTH_SUCCESS: "CLEAR_AUTH_SUCCESS" = "CLEAR_AUTH_SUCCESS";
export const AUTH_ERROR: "AUTH_ERROR" = "AUTH_ERROR";
export const CLEAR_AUTH_ERROR: "CLEAR_AUTH_ERROR" = "CLEAR_AUTH_ERROR";
export const SET_USER_DATA: "SET_USER_DATA" = "SET_USER_DATA";
export const SET_TOKENS: "SET_TOKENS" = "SET_TOKENS";
export const PATCH_USER_SUCCESS: "PATCH_USER_SUCCESS" = "PATCH_USER_SUCCESS";

export interface IAuthRequest {
    readonly type: typeof AUTH_REQUEST;
}

export interface ISetAuthSuccess {
    readonly type: typeof SET_AUTH_SUCCESS;
    readonly data: ISetAuth;
}

export interface IClearAuthSuccess {
    readonly type: typeof CLEAR_AUTH_SUCCESS;
}

export interface IAuthError {
    readonly type: typeof AUTH_ERROR;
    readonly data: string;
}

export interface IClearAuthError {
    readonly type: typeof CLEAR_AUTH_ERROR;
}

export interface ISetUserData {
    readonly type: typeof SET_USER_DATA;
    readonly data: IUser;
}

export interface ISetTokens {
    readonly type: typeof SET_TOKENS;
    readonly data: IRefreshTokens;
}

export interface IPatchUserSuccess {
    readonly type: typeof PATCH_USER_SUCCESS;
    readonly data: IUser;
}

export type TAuthActions =
    | IAuthRequest
    | ISetAuthSuccess
    | IClearAuthSuccess
    | IAuthError
    | IClearAuthError
    | ISetUserData
    | ISetTokens
    | IPatchUserSuccess;

export const setAuth = (data: TAuth, type: TAuthType): TAppThunk => {
    return (dispatch) => {
        dispatch({ type: AUTH_REQUEST });
        setAuthRequest(data, type)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: SET_AUTH_SUCCESS,
                        data: {
                            accessToken: result.accessToken,
                            refreshToken: result.refreshToken,
                            user: result.user,
                        },
                    });
                }
            })
            .catch((error: IResponseError) =>
                dispatch({
                    type: AUTH_ERROR,
                    data:
                        error.message === "User already exists"
                            ? "Пользователь с таким e-mail уже существует"
                            : error.message === "email or password are incorrect"
                            ? "Некорректные e-mail и (или) пароль"
                            : error.message,
                })
            );
    };
};

export const clearAuth = (data: TToken): TAppThunk => {
    return (dispatch) => {
        dispatch({ type: AUTH_REQUEST });
        clearAuthRequest(data)
            .then((result) => {
                if (result.success) {
                    dispatch({ type: CLEAR_AUTH_SUCCESS });
                }
            })
            .catch((error: IResponseError) =>
                dispatch({
                    type: AUTH_ERROR,
                    data: error.message,
                })
            );
    };
};

export const patchUser = (data: TAuth): TAppThunk => {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_REQUEST });
        const auth = getState().auth;
        patchUserRequest(data, auth.accessToken, auth.refreshToken, dispatch)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: PATCH_USER_SUCCESS,
                        data: result.user,
                    });
                }
            })
            .catch((error: IResponseError) =>
                dispatch({
                    type: AUTH_ERROR,
                    data: error.message,
                })
            );
    };
};
